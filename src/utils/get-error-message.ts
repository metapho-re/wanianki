import { isAxiosError } from "axios";

import type { Error } from "../types";

export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (isAxiosError(error)) {
    const { response } = error;

    return (response?.data as Error)?.error || fallbackMessage;
  }

  return fallbackMessage;
};
