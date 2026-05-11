import type { BootstrapPhase } from './bootstrapData';

/**
 * Tokenise a free-text query into lowercased terms. Whitespace splits the
 * query; an empty result means "no filter, show everything".
 */
export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Filter phases so only items whose label / detail / phase title / phase
 * description / reference labels / snippet body contain EVERY query token
 * survive. Phases with zero surviving items are dropped entirely so the
 * grid doesn't keep empty cards.
 *
 * Matching is plain substring, case-insensitive — strangers searching
 * "security" or "test" should find the obvious hits without learning a
 * query language.
 */
export function filterPhases(phases: readonly BootstrapPhase[], query: string): BootstrapPhase[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return phases.slice();
  }
  const out: BootstrapPhase[] = [];
  for (const phase of phases) {
    // A phase-level hit ("security", "release") keeps every item in
    // the phase so the user sees the full bucket they searched for.
    const phaseHaystack = `${phase.title} ${phase.description} ${phase.eyebrow}`.toLowerCase();
    const phaseMatchesAll = tokens.every((t) => phaseHaystack.includes(t));

    const survivors = phase.items.filter((item) => {
      if (phaseMatchesAll) return true;
      const itemText = [
        item.label,
        item.detail,
        ...(item.references?.map((r) => r.label) ?? []),
        item.snippet?.code ?? '',
        item.snippet?.filename ?? '',
        item.snippet?.language ?? ''
      ]
        .join(' ')
        .toLowerCase();
      return tokens.every((t) => itemText.includes(t));
    });

    if (survivors.length > 0) {
      out.push({ ...phase, items: survivors });
    }
  }
  return out;
}

/** Total item count across phases — used to surface "x of y items". */
export function countItems(phases: readonly BootstrapPhase[]): number {
  return phases.reduce((sum, phase) => sum + phase.items.length, 0);
}
