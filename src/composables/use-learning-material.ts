import { computed, type ComputedRef } from "vue";

import {
  getKanjiCollection,
  getRadicalCollection,
  getVocabularyCollection,
} from "../api";
import { KANJI_KEY, RADICAL_KEY, VOCABULARY_KEY } from "../storage-keys";
import type {
  Kanji,
  Radical,
  Store,
  SubjectResponse,
  Vocabulary,
} from "../types";

import { useFetch } from "./use-fetch";

const FIRST_LEVEL = 1;

type SubjectResponseStore<T> = Store<SubjectResponse<T>, "collection">;

const kanjiCollection: SubjectResponseStore<Kanji> = {
  value: [],
};
const radicalCollection: SubjectResponseStore<Radical> = {
  value: [],
};
const vocabularyCollection: SubjectResponseStore<Vocabulary> = {
  value: [],
};

export const subjectCollection = {
  kanji: kanjiCollection,
  radical: radicalCollection,
  vocabulary: vocabularyCollection,
};

const onCompleteFactory =
  <T>(collectionStore: Store<SubjectResponse<T>, "collection">) =>
  (data: SubjectResponse<T>[] | null) => {
    if (data) {
      collectionStore.value = data;
    }
  };

export const useLearningMaterial = (
  userLevel: number,
): ComputedRef<boolean> => {
  const { isLoading: isKanjiCollectionLoading } = useFetch<
    SubjectResponse<Kanji>,
    "collection"
  >({
    storageKey: KANJI_KEY,
    errorMessage: "Failed to load kanji",
    successMessage: "Kanjis successfully loaded",
    shouldFetchOnMounted: true,
    fetcher: getKanjiCollection(FIRST_LEVEL, userLevel),
    onComplete: onCompleteFactory(kanjiCollection),
  });

  const { isLoading: isRadicalCollectionLoading } = useFetch<
    SubjectResponse<Radical>,
    "collection"
  >({
    storageKey: RADICAL_KEY,
    errorMessage: "Failed to load radicals",
    successMessage: "Radicals successfully loaded",
    shouldFetchOnMounted: true,
    fetcher: getRadicalCollection(FIRST_LEVEL, userLevel),
    onComplete: onCompleteFactory(radicalCollection),
  });

  const { isLoading: isVocabularyCollectionLoading } = useFetch<
    SubjectResponse<Vocabulary>,
    "collection"
  >({
    storageKey: VOCABULARY_KEY,
    errorMessage: "Failed to load vocabulary",
    successMessage: "Vocabulary successfully loaded",
    shouldFetchOnMounted: true,
    fetcher: getVocabularyCollection(FIRST_LEVEL, userLevel),
    onComplete: onCompleteFactory(vocabularyCollection),
  });

  const isLoading = computed<boolean>(
    () =>
      isKanjiCollectionLoading.value ||
      isRadicalCollectionLoading.value ||
      isVocabularyCollectionLoading.value,
  );

  return isLoading;
};
