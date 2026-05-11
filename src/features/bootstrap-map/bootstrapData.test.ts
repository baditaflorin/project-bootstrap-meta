import { describe, expect, it } from 'vitest';
import { bootstrapPhases } from './bootstrapData';

describe('bootstrapPhases', () => {
  it('keeps every checklist id globally unique', () => {
    const ids = bootstrapPhases.flatMap((phase) => phase.items.map((item) => item.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('attaches at least one canonical reference or snippet to most items', () => {
    const items = bootstrapPhases.flatMap((phase) => phase.items);
    const enriched = items.filter((item) => item.references ?? item.snippet);
    // The point of a "bootstrap map" is to be more useful than a checklist.
    // Allow a few items (small, self-evident ones) to ship without extras,
    // but require the bulk of the map to carry concrete material.
    expect(enriched.length / items.length).toBeGreaterThan(0.7);
  });

  it('routes every reference link through https://', () => {
    const refs = bootstrapPhases
      .flatMap((phase) => phase.items)
      .flatMap((item) => item.references ?? []);
    for (const reference of refs) {
      expect(reference.url, `${reference.label} url`).toMatch(/^https:\/\//);
      expect(reference.label, 'reference label').not.toBe('');
    }
  });

  it('snippets carry a non-empty language and a non-trivial body', () => {
    const snippets = bootstrapPhases
      .flatMap((phase) => phase.items)
      .map((item) => item.snippet)
      .filter((snippet): snippet is NonNullable<typeof snippet> => snippet !== undefined);

    expect(snippets.length).toBeGreaterThanOrEqual(8);
    for (const snippet of snippets) {
      expect(snippet.language.length, 'snippet language').toBeGreaterThan(0);
      expect(snippet.code.trim().length, 'snippet body').toBeGreaterThan(20);
    }
  });
});
