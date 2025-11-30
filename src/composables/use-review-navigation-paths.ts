import { ref, type Ref } from "vue";

import { getNavigationPathsFromSelectedSubjects, shuffleArray } from "../utils";

import {
  kanjiCollection,
  radicalCollection,
  vocabularyCollection,
} from "./use-learning-material";

export const reviewNavigationPaths = ref<string[]>([]);

export const reviewNavigationIndex = ref<number>(-1);

interface ReturnValue {
  createReviewNavigationPaths: ({
    selectedLevels,
    selectedTypes,
    shouldShuffle,
    isQuizMode,
  }: {
    selectedLevels: Ref<number[]>;
    selectedTypes: Ref<string[]>;
    shouldShuffle: Ref<boolean>;
    isQuizMode: Ref<boolean>;
  }) => void;
  getPreviousReviewNavigationPath: () => string | undefined;
  getNextReviewNavigationPath: () => string | undefined;
}

export const useReviewNavigationPaths = (): ReturnValue => {
  const createReviewNavigationPaths = ({
    selectedLevels,
    selectedTypes,
    shouldShuffle,
    isQuizMode,
  }: {
    selectedLevels: Ref<number[]>;
    selectedTypes: Ref<string[]>;
    shouldShuffle: Ref<boolean>;
    isQuizMode: Ref<boolean>;
  }) => {
    reviewNavigationPaths.value = [
      ...getNavigationPathsFromSelectedSubjects({
        selectedLevels,
        selectedTypes,
        isQuizMode,
        collectionType: "radical",
        subjectCollection: radicalCollection.value,
      }),
      ...getNavigationPathsFromSelectedSubjects({
        selectedLevels,
        selectedTypes,
        isQuizMode,
        collectionType: "kanji",
        subjectCollection: kanjiCollection.value,
      }),
      ...getNavigationPathsFromSelectedSubjects({
        selectedLevels,
        selectedTypes,
        isQuizMode,
        collectionType: "vocabulary",
        subjectCollection: vocabularyCollection.value,
      }),
    ];

    if (shouldShuffle.value) {
      shuffleArray(reviewNavigationPaths.value);
    }

    reviewNavigationIndex.value = -1;
  };

  const getPreviousReviewNavigationPath = () => {
    if (reviewNavigationIndex.value > 0) {
      reviewNavigationIndex.value -= 1;
    }

    return reviewNavigationPaths.value[reviewNavigationIndex.value];
  };

  const getNextReviewNavigationPath = () => {
    reviewNavigationIndex.value += 1;

    return reviewNavigationPaths.value[reviewNavigationIndex.value];
  };

  return {
    createReviewNavigationPaths,
    getPreviousReviewNavigationPath,
    getNextReviewNavigationPath,
  };
};
