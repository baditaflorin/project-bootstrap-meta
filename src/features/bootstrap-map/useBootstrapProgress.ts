import { useCallback, useState } from 'react';
import { readJson, removeItem, writeJson } from '../../shared/localStorage';
import { bootstrapPhases } from './bootstrapData';
import {
  countCompleted,
  countTotal,
  getAllItemIds,
  toggleProgress,
  type ProgressState
} from './progress';

const STORAGE_KEY = 'project-bootstrap-meta:v1:progress';

interface BootstrapProgress {
  progress: ProgressState;
  completed: number;
  total: number;
  percentComplete: number;
  errorMessage: string | null;
  toggleItem: (itemId: string) => void;
  markAll: () => void;
  reset: () => void;
}

function loadInitialProgress(): { progress: ProgressState; errorMessage: string | null } {
  if (typeof window === 'undefined') {
    return { progress: {}, errorMessage: null };
  }

  const result = readJson<ProgressState>(window.localStorage, STORAGE_KEY);
  if (!result.ok) {
    return { progress: {}, errorMessage: result.message };
  }

  return { progress: result.value ?? {}, errorMessage: null };
}

export function useBootstrapProgress(): BootstrapProgress {
  const [initialState] = useState(loadInitialProgress);
  const [progress, setProgress] = useState<ProgressState>(initialState.progress);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialState.errorMessage);

  const persist = useCallback((nextProgress: ProgressState) => {
    const result = writeJson(window.localStorage, STORAGE_KEY, nextProgress);
    if (!result.ok) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage(null);
    }
  }, []);

  const toggleItem = useCallback(
    (itemId: string) => {
      setProgress((current) => {
        const nextProgress = toggleProgress(current, itemId);
        persist(nextProgress);
        return nextProgress;
      });
    },
    [persist]
  );

  const markAll = useCallback(() => {
    const nextProgress = Object.fromEntries(getAllItemIds(bootstrapPhases).map((id) => [id, true]));
    setProgress(nextProgress);
    persist(nextProgress);
  }, [persist]);

  const reset = useCallback(() => {
    const result = removeItem(window.localStorage, STORAGE_KEY);
    setProgress({});
    setErrorMessage(result.ok ? null : result.message);
  }, []);

  const completed = countCompleted(bootstrapPhases, progress);
  const total = countTotal(bootstrapPhases);
  const percentComplete = Math.round((completed / total) * 100);

  return {
    progress,
    completed,
    total,
    percentComplete,
    errorMessage,
    toggleItem,
    markAll,
    reset
  };
}
