import type { CachedData, ReportOrCollection } from "../types";

import { useNotifications } from "./use-notifications";

const { addNotification } = useNotifications();

const getFileHandle = async (key: string) => {
  const root = await navigator.storage.getDirectory();

  return await root.getFileHandle(key, { create: true });
};

const getValue = async <T, U>(key: string) => {
  const handle = await getFileHandle(key);
  const file = await handle.getFile();
  const serializedValue = await file.text();

  if (serializedValue === "") {
    return null;
  }

  let value: CachedData<T, U> | null = null;

  try {
    value = JSON.parse(serializedValue);
  } catch {
    addNotification("Failed to parse data in OPFS storage", "error");
  } finally {
    return value;
  }
};

const setValue = async <T, U>(
  key: string,
  value: ReportOrCollection<T, U> | null,
) => {
  const handle = await getFileHandle(key);
  const writable = await handle.createWritable();

  if (value === null) {
    await writable.write("");
  } else {
    const cachedValue: CachedData<T, U> = {
      data: value,
      cachedAt: Date.now(),
    };

    await writable.write(JSON.stringify(cachedValue));
  }

  await writable.close();
};

interface ReturnValue<T, U> {
  getValue: () => Promise<CachedData<T, U> | null>;
  setValue: (value: ReportOrCollection<T, U> | null) => Promise<void>;
}

export const useOpfsStorage = <T, U>(key: string): ReturnValue<T, U> => ({
  getValue: () => getValue<T, U>(key),
  setValue: (value) => setValue<T, U>(key, value),
});
