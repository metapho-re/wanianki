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

export const useLearningMaterial = async (
  level: number,
): Promise<ComputedRef<boolean>> => {
  const [
    { isLoading: isKanjiCollectionLoading },
    { isLoading: isRadicalCollectionLoading },
    { isLoading: isVocabularyCollectionLoading },
  ] = await Promise.all([
    useFetch<SubjectResponse<Kanji>, "collection">({
      storageKey: KANJI_KEY,
      errorMessage: "Failed to load kanji",
      successMessage: "Kanjis successfully loaded",
      shouldFetchOnMounted: true,
      fetcher: getKanjiCollection(level),
      onComplete: onCompleteFactory(kanjiCollection),
    }),
    useFetch<SubjectResponse<Radical>, "collection">({
      storageKey: RADICAL_KEY,
      errorMessage: "Failed to load radicals",
      successMessage: "Radicals successfully loaded",
      shouldFetchOnMounted: true,
      fetcher: getRadicalCollection(level),
      onComplete: onCompleteFactory(radicalCollection),
    }),
    useFetch<SubjectResponse<Vocabulary>, "collection">({
      storageKey: VOCABULARY_KEY,
      errorMessage: "Failed to load vocabulary",
      successMessage: "Vocabulary successfully loaded",
      shouldFetchOnMounted: true,
      fetcher: getVocabularyCollection(level),
      onComplete: onCompleteFactory(vocabularyCollection),
    }),
  ]);

  const isLoading = computed(
    () =>
      isKanjiCollectionLoading.value ||
      isRadicalCollectionLoading.value ||
      isVocabularyCollectionLoading.value,
  );

  return isLoading;
};
