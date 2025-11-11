import type { Ref } from "vue";

import type { Store } from "../types";
import { getNavigationPathsFromSelectedSubjects } from "../utils";

import {
  kanjiCollection,
  radicalCollection,
  vocabularyCollection,
} from "./use-learning-material";

const reviewNavigationPathsStore: Store<string, "collection"> = {
  value: [],
};
const reviewNavigationIndexStore: Store<number, "report"> = {
  value: -1,
};

interface ReturnValue {
  createReviewNavigationPaths: ({
    selectedLevels,
    selectedTypes,
  }: {
    selectedLevels: Ref<number[]>;
    selectedTypes: Ref<string[]>;
  }) => void;
  getPreviousReviewNavigationPath: () => string | undefined;
  getNextReviewNavigationPath: () => string | undefined;
}

export const useReviewNavigationPaths = (): ReturnValue => {
  const createReviewNavigationPaths = ({
    selectedLevels,
    selectedTypes,
  }: {
    selectedLevels: Ref<number[]>;
    selectedTypes: Ref<string[]>;
  }) => {
    const reviewNavigationPaths = [
      ...getNavigationPathsFromSelectedSubjects({
        selectedLevels,
        selectedTypes,
        collectionType: "kanji",
        subjectCollection: kanjiCollection.value,
      }),
      ...getNavigationPathsFromSelectedSubjects({
        selectedLevels,
        selectedTypes,
        collectionType: "radical",
        subjectCollection: radicalCollection.value,
      }),
      ...getNavigationPathsFromSelectedSubjects({
        selectedLevels,
        selectedTypes,
        collectionType: "vocabulary",
        subjectCollection: vocabularyCollection.value,
      }),
    ];

    reviewNavigationPathsStore.value = reviewNavigationPaths;
    reviewNavigationIndexStore.value = -1;
  };

  const getPreviousReviewNavigationPath = () => {
    if (reviewNavigationIndexStore.value > 0) {
      reviewNavigationIndexStore.value -= 1;
    }

    return reviewNavigationPathsStore.value[reviewNavigationIndexStore.value];
  };

  const getNextReviewNavigationPath = () => {
    reviewNavigationIndexStore.value += 1;

    return reviewNavigationPathsStore.value[reviewNavigationIndexStore.value];
  };

  return {
    createReviewNavigationPaths,
    getPreviousReviewNavigationPath,
    getNextReviewNavigationPath,
  };
};
