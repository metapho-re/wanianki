import { ref, type Ref } from "vue";

import {
  KANJI_KEY,
  RADICAL_KEY,
  USER_KEY,
  VOCABULARY_KEY,
} from "../storage-keys";
import type { Kanji, Radical, User, Vocabulary } from "../types";

import { user } from "./use-login";
import { useNotifications } from "./use-notifications";
import { useOpfsStorage } from "./use-opfs-storage";

type ReturnValue = {
  isLoading: Ref<boolean>;
  cleanUpData: ({
    onSuccess,
    onComplete,
  }: {
    onSuccess?: () => void;
    onComplete?: () => void;
  }) => Promise<void>;
};

export const useDataCleanup = (): ReturnValue => {
  const isLoading = ref<boolean>(false);

  const { addNotification } = useNotifications();

  const [
    { setValue: setUser },
    { setValue: setKanji },
    { setValue: setRadical },
    { setValue: setVocabulary },
  ] = [
    useOpfsStorage<User, "report">(USER_KEY),
    useOpfsStorage<Kanji, "collection">(KANJI_KEY),
    useOpfsStorage<Radical, "collection">(RADICAL_KEY),
    useOpfsStorage<Vocabulary, "collection">(VOCABULARY_KEY),
  ];

  const cleanUpData = async ({
    onSuccess,
    onComplete,
  }: {
    onSuccess?: () => void;
    onComplete?: () => void;
  }) => {
    isLoading.value = true;

    try {
      await Promise.all([
        setUser(null),
        setKanji(null),
        setRadical(null),
        setVocabulary(null),
      ]);

      user.value = null;

      onSuccess?.();
    } catch (error) {
      addNotification((error as Error).message, "error");
    } finally {
      isLoading.value = false;

      onComplete?.();
    }
  };

  return {
    isLoading,
    cleanUpData,
  };
};
