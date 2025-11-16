import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";

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
  cleanUpData: () => Promise<void>;
};

export const useDataCleanup = (): ReturnValue => {
  const router = useRouter();

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

  const cleanUpData = async () => {
    isLoading.value = true;

    try {
      await Promise.all([
        setUser(null),
        setKanji(null),
        setRadical(null),
        setVocabulary(null),
      ]);

      user.value = null;

      addNotification("In-browser data successfully deleted", "success");
    } catch (error) {
      addNotification((error as Error).message, "error");
    } finally {
      isLoading.value = false;

      router.push("/login");
    }
  };

  return {
    isLoading,
    cleanUpData,
  };
};
