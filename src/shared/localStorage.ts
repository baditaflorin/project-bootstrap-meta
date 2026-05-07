export type StorageReadResult<T> =
  | {
      ok: true;
      value: T | null;
    }
  | {
      ok: false;
      message: string;
    };

export function readJson<T>(storage: Storage, key: string): StorageReadResult<T> {
  try {
    const rawValue = storage.getItem(key);
    if (rawValue === null) {
      return { ok: true, value: null };
    }

    return { ok: true, value: JSON.parse(rawValue) as T };
  } catch {
    return { ok: false, message: `Could not read saved progress for ${key}.` };
  }
}

export function writeJson<T>(storage: Storage, key: string, value: T): StorageReadResult<T> {
  try {
    storage.setItem(key, JSON.stringify(value));
    return { ok: true, value };
  } catch {
    return { ok: false, message: `Could not save progress for ${key}.` };
  }
}

export function removeItem(storage: Storage, key: string): StorageReadResult<null> {
  try {
    storage.removeItem(key);
    return { ok: true, value: null };
  } catch {
    return { ok: false, message: `Could not reset progress for ${key}.` };
  }
}
