import { describe, expect, it } from 'vitest';
import { bootstrapPhases } from './bootstrapData';
import { countItems, filterPhases, tokenize } from './filter';

describe('tokenize', () => {
  it('lowercases and splits on whitespace', () => {
    expect(tokenize('Security TESTS')).toEqual(['security', 'tests']);
  });

  it('returns empty for an empty / whitespace-only query', () => {
    expect(tokenize('')).toEqual([]);
    expect(tokenize('   ')).toEqual([]);
  });
});

describe('filterPhases', () => {
  it('returns the full list when the query is empty', () => {
    const out = filterPhases(bootstrapPhases, '');
    expect(out).toHaveLength(bootstrapPhases.length);
    expect(countItems(out)).toBe(countItems(bootstrapPhases));
  });

  it('keeps every item inside a phase whose title matches', () => {
    const out = filterPhases(bootstrapPhases, 'security');
    const securityPhase = out.find((p) => p.id === 'security');
    const originalSecurityPhase = bootstrapPhases.find((p) => p.id === 'security');
    expect(securityPhase).toBeDefined();
    expect(originalSecurityPhase).toBeDefined();
    if (securityPhase && originalSecurityPhase) {
      expect(securityPhase.items).toHaveLength(originalSecurityPhase.items.length);
    }
  });

  it('also surfaces non-phase items that mention the same term (e.g. repo phase SECURITY.md)', () => {
    const out = filterPhases(bootstrapPhases, 'security');
    expect(out.length).toBeGreaterThanOrEqual(1);
    expect(out.flatMap((p) => p.items.map((i) => i.id))).toEqual(
      expect.arrayContaining(['security-gitleaks'])
    );
  });

  it('matches a unique item label across phases', () => {
    const out = filterPhases(bootstrapPhases, 'gitleaks');
    expect(out).toHaveLength(1);
    expect(out[0]?.items.map((i) => i.id)).toContain('security-gitleaks');
  });

  it('finds references — searching for "conventional commits" hits the repo phase item', () => {
    const out = filterPhases(bootstrapPhases, 'conventional commits');
    expect(out.flatMap((p) => p.items.map((i) => i.id))).toContain('repo-commits');
  });

  it('finds snippet content — searching for "200 * 1024" hits the bundle-budget item', () => {
    const out = filterPhases(bootstrapPhases, '200 * 1024');
    expect(out.flatMap((p) => p.items.map((i) => i.id))).toContain('frontend-budget');
  });

  it('drops phases with zero surviving items', () => {
    const out = filterPhases(bootstrapPhases, 'gitleaks');
    expect(out.every((p) => p.items.length > 0)).toBe(true);
  });

  it('uses AND semantics across whitespace-separated tokens', () => {
    const release = filterPhases(bootstrapPhases, 'release postmortem');
    expect(release.flatMap((p) => p.items.map((i) => i.id))).toContain('release-postmortem');
    // "release auth" should narrow to nothing since no item carries both.
    const empty = filterPhases(bootstrapPhases, 'release totally-not-a-real-term');
    expect(empty).toHaveLength(0);
  });

  it('is case-insensitive', () => {
    const lower = filterPhases(bootstrapPhases, 'security');
    const upper = filterPhases(bootstrapPhases, 'SECURITY');
    expect(upper.map((p) => p.id)).toEqual(lower.map((p) => p.id));
  });
});
