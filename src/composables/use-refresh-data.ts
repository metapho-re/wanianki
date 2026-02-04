import { isAxiosError } from "axios";
import { ref, type Ref } from "vue";

import {
  type Fetcher,
  getKanjiCollection,
  getRadicalCollection,
  getUserReport,
  getVocabularyCollection,
} from "../api";
import {
  KANJI_KEY,
  RADICAL_KEY,
  USER_KEY,
  VOCABULARY_KEY,
} from "../storage-keys";
import type {
  Error,
  Kanji,
  Pagination,
  Radical,
  SubjectResponse,
  User,
  Vocabulary,
} from "../types";
import { sortByIdAndLevel } from "../utils";

import { subjectCollection } from "./use-learning-material";
import { apiToken, user } from "./use-login";
import { useNotifications } from "./use-notifications";
import { useOpfsStorage } from "./use-opfs-storage";

const fetchSubjectsForLevelRange = async <T>(fetcher: Fetcher<T>) => {
  const results: T[] = [];

  let pages: Pagination = { next_url: null };

  do {
    const { data: responseData } = await fetcher(pages.next_url);

    if (responseData.object === "collection") {
      pages = responseData.pages;
      results.push(...responseData.data);
    }
  } while (pages.next_url);

  return results;
};

interface ReturnValue {
  isRefreshing: Ref<boolean>;
  refresh: (inputApiKey: string) => Promise<void>;
}

export const useRefreshData = (): ReturnValue => {
  const { addNotification } = useNotifications();

  const { setValue: setUser } = useOpfsStorage<User, "report">(USER_KEY);
  const { setValue: setKanji } = useOpfsStorage<
    SubjectResponse<Kanji>,
    "collection"
  >(KANJI_KEY);
  const { setValue: setRadical } = useOpfsStorage<
    SubjectResponse<Radical>,
    "collection"
  >(RADICAL_KEY);
  const { setValue: setVocabulary } = useOpfsStorage<
    SubjectResponse<Vocabulary>,
    "collection"
  >(VOCABULARY_KEY);

  const isRefreshing = ref<boolean>(false);

  const refresh = async (inputApiKey: string) => {
    if (!user.value) {
      addNotification("No user data available", "error");

      return;
    }

    apiToken.value = inputApiKey;
    isRefreshing.value = true;

    try {
      const oldLevel = user.value.level;

      const { data: userResponse } = await getUserReport();
      const newUserData = userResponse.data;
      const newLevel = newUserData.level;

      if (newLevel > oldLevel) {
        const startLevel = oldLevel + 1;
        const endLevel = newLevel;

        const [
          newKanjiCollection,
          newRadicalCollection,
          newVocabularyCollection,
        ] = await Promise.all([
          fetchSubjectsForLevelRange<SubjectResponse<Kanji>>(
            getKanjiCollection(startLevel, endLevel),
          ),
          fetchSubjectsForLevelRange<SubjectResponse<Radical>>(
            getRadicalCollection(startLevel, endLevel),
          ),
          fetchSubjectsForLevelRange<SubjectResponse<Vocabulary>>(
            getVocabularyCollection(startLevel, endLevel),
          ),
        ]);

        const updatedKanjiCollection = sortByIdAndLevel([
          ...subjectCollection.kanji.value,
          ...newKanjiCollection,
        ]);
        const updatedRadicalCollection = sortByIdAndLevel([
          ...subjectCollection.radical.value,
          ...newRadicalCollection,
        ]);
        const updatedVocabularyCollection = sortByIdAndLevel([
          ...subjectCollection.vocabulary.value,
          ...newVocabularyCollection,
        ]);

        subjectCollection.kanji.value = updatedKanjiCollection;
        subjectCollection.radical.value = updatedRadicalCollection;
        subjectCollection.vocabulary.value = updatedVocabularyCollection;

        user.value = newUserData;

        await Promise.all([
          setUser(newUserData),
          setKanji(updatedKanjiCollection),
          setRadical(updatedRadicalCollection),
          setVocabulary(updatedVocabularyCollection),
        ]);

        addNotification(
          `Leveled up to ${newLevel}! New subjects loaded.`,
          "success",
        );
      } else {
        addNotification("Your level hasn't changed.", "info");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;

        addNotification(
          (response?.data as Error).error || "Failed to refresh data",
          "error",
        );
      } else {
        addNotification("Failed to refresh data", "error");
      }
    } finally {
      apiToken.value = null;
      isRefreshing.value = false;
    }
  };

  return { isRefreshing, refresh };
};
