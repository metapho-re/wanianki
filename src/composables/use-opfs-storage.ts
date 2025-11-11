import type { ReportOrCollection } from "../types";

import { useNotifications } from "./use-notifications";

interface ReturnValue<T, U> {
  getValue: () => Promise<ReportOrCollection<T, U> | null>;
  setValue: (value: ReportOrCollection<T, U> | null) => Promise<void>;
}

export const useOpfsStorage = <T, U>(key: string): ReturnValue<T, U> => {
  const { addNotification } = useNotifications();

  const getFileHandle = async () => {
    const root = await navigator.storage.getDirectory();

    return await root.getFileHandle(key, { create: true });
  };

  const getValue = async () => {
    const handle = await getFileHandle();
    const file = await handle.getFile();
    const serializedValue = await file.text();

    if (serializedValue === "") {
      return null;
    }

    let value: ReportOrCollection<T, U> | null = null;

    try {
      value = JSON.parse(serializedValue);
    } catch {
      addNotification("Failed to parse data in OPFS storage", "error");
    }

    return value;
  };

  const setValue = async (value: ReportOrCollection<T, U> | null) => {
    const handle = await getFileHandle();
    const writable = await handle.createWritable();

    if (value === null) {
      await writable.write("");
    } else {
      await writable.write(JSON.stringify(value));
    }

    await writable.close();
  };

  return {
    getValue,
    setValue,
  };
};
