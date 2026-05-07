import type { BootstrapPhase } from './bootstrapData';

export type ProgressState = Record<string, boolean>;

export function getAllItemIds(phases: BootstrapPhase[]): string[] {
  return phases.flatMap((phase) => phase.items.map((item) => item.id));
}

export function countCompleted(phases: BootstrapPhase[], progress: ProgressState): number {
  return getAllItemIds(phases).filter((id) => progress[id]).length;
}

export function countTotal(phases: BootstrapPhase[]): number {
  return getAllItemIds(phases).length;
}

export function getPhaseCompletion(phase: BootstrapPhase, progress: ProgressState): number {
  const completed = phase.items.filter((item) => progress[item.id]).length;
  return Math.round((completed / phase.items.length) * 100);
}

export function toggleProgress(progress: ProgressState, itemId: string): ProgressState {
  return {
    ...progress,
    [itemId]: !progress[itemId]
  };
}
