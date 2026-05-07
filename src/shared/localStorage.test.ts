import { describe, expect, it } from 'vitest';
import { readJson, removeItem, writeJson } from './localStorage';

describe('localStorage helpers', () => {
  it('reads and writes JSON values', () => {
    const storage = window.localStorage;
    storage.clear();

    const writeResult = writeJson(storage, 'sample', { ok: true });
    const readResult = readJson<{ ok: boolean }>(storage, 'sample');

    expect(writeResult).toEqual({ ok: true, value: { ok: true } });
    expect(readResult).toEqual({ ok: true, value: { ok: true } });
  });

  it('reports corrupted JSON without throwing', () => {
    const storage = window.localStorage;
    storage.clear();
    storage.setItem('sample', '{broken');

    expect(readJson(storage, 'sample')).toEqual({
      ok: false,
      message: 'Could not read saved progress for sample.'
    });
  });

  it('removes stored values', () => {
    const storage = window.localStorage;
    storage.setItem('sample', 'true');

    expect(removeItem(storage, 'sample')).toEqual({ ok: true, value: null });
    expect(storage.getItem('sample')).toBeNull();
  });
});
