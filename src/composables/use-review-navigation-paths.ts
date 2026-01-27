import { ref, type ComputedRef, type Ref } from "vue";

import type { ReviewSubject } from "../types";
import { getNavigationPathsFromSelectedSubjects, shuffleArray } from "../utils";

export const reviewNavigationPaths = ref<string[]>([]);

export const reviewNavigationIndex = ref<number>(-1);

interface ReturnValue {
  createReviewNavigationPaths: ({
    selectedSubjects,
    shouldShuffle,
    isQuizMode,
  }: {
    selectedSubjects: ComputedRef<ReviewSubject[]>;
    shouldShuffle: Ref<boolean>;
    isQuizMode: Ref<boolean>;
  }) => void;
  getPreviousReviewNavigationPath: () => string | undefined;
  getNextReviewNavigationPath: () => string | undefined;
}

export const useReviewNavigationPaths = (): ReturnValue => {
  const createReviewNavigationPaths = ({
    selectedSubjects,
    shouldShuffle,
    isQuizMode,
  }: {
    selectedSubjects: ComputedRef<ReviewSubject[]>;
    shouldShuffle: Ref<boolean>;
    isQuizMode: Ref<boolean>;
  }) => {
    const paths = getNavigationPathsFromSelectedSubjects({
      selectedSubjects,
      isQuizMode,
    });

    reviewNavigationPaths.value = shouldShuffle.value
      ? shuffleArray(paths)
      : paths;

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
