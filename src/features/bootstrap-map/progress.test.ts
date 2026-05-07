import { describe, expect, it } from 'vitest';
import { bootstrapPhases } from './bootstrapData';
import { countCompleted, countTotal, getPhaseCompletion, toggleProgress } from './progress';

describe('progress helpers', () => {
  it('counts total and completed checklist items', () => {
    const firstItemId = bootstrapPhases.at(0)?.items.at(0)?.id;

    if (!firstItemId) {
      throw new Error('Expected at least one bootstrap item.');
    }

    expect(countTotal(bootstrapPhases)).toBeGreaterThan(20);
    expect(countCompleted(bootstrapPhases, { [firstItemId]: true })).toBe(1);
  });

  it('calculates phase completion percentage', () => {
    const firstPhase = bootstrapPhases.at(0);
    const firstItemId = firstPhase?.items.at(0)?.id;

    if (!firstPhase || !firstItemId) {
      throw new Error('Expected a first phase with at least one item.');
    }

    expect(getPhaseCompletion(firstPhase, { [firstItemId]: true })).toBe(33);
  });

  it('toggles item progress immutably', () => {
    const current = { alpha: true };
    const next = toggleProgress(current, 'beta');

    expect(next).toEqual({ alpha: true, beta: true });
    expect(current).toEqual({ alpha: true });
    expect(toggleProgress(next, 'beta')).toEqual({ alpha: true, beta: false });
  });
});
