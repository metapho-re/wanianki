import { isAxiosError } from "axios";
import { onMounted, ref, type Ref } from "vue";

import type { Fetcher } from "../api";
import type { Error, Pagination, ReportOrCollection, Store } from "../types";
import { sortByIdAndLevel } from "../utils";

import { useNotifications } from "./use-notifications";
import { useOpfsStorage } from "./use-opfs-storage";

interface Params<T, U> {
  storageKey: string;
  errorMessage: string;
  successMessage: string;
  shouldFetchOnMounted: boolean;
  fetcher: Fetcher<T>;
  onComplete?: (data: ReportOrCollection<T, U> | null) => void;
}

type ReturnValue<T, U> = {
  isLoading: Ref<boolean>;
  refresh: () => Promise<ReportOrCollection<T, U> | null>;
};

export const useFetch = <T, U>({
  storageKey,
  errorMessage,
  successMessage,
  shouldFetchOnMounted,
  fetcher,
  onComplete,
}: Params<T, U>): ReturnValue<T, U> => {
  const { addNotification } = useNotifications();
  const { getValue, setValue } = useOpfsStorage<T, U>(storageKey);

  const isLoading = ref<boolean>(false);
  const data: Store<T, U, true> = {
    value: null,
  };

  onMounted(async () => {
    isLoading.value = true;
    data.value = (await getValue())?.data ?? null;

    if (shouldFetchOnMounted && data.value === null) {
      await refresh();
    }

    if (onComplete) {
      onComplete(data.value);
    }

    isLoading.value = false;
  });

  const refresh = async () => {
    try {
      data.value = null;

      let pages: Pagination | undefined = {
        next_url: null,
      };

      do {
        const { data: responseData } = await fetcher(pages.next_url);

        if (responseData.object === "report") {
          (data as Store<T, "report", true>).value = responseData.data;
        } else {
          pages = responseData.pages;

          (data as Store<T, "collection", true>).value =
            data.value === null
              ? responseData.data
              : [
                  ...(data as Store<T, "collection", true>).value!,
                  ...responseData.data,
                ];
        }
      } while (pages?.next_url);

      if (Array.isArray(data.value)) {
        sortByIdAndLevel(data.value);
      }

      await setValue(data.value);
      addNotification(successMessage, "success");
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;

        addNotification(
          (response?.data as Error).error || errorMessage,
          "error",
        );
      } else {
        addNotification(errorMessage, "error");
      }
    }

    return data.value;
  };

  return { isLoading, refresh };
};
