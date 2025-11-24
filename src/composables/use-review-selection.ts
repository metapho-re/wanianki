import { type ComputedRef, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

import { useLearningMaterial } from "./use-learning-material";
import { useReviewNavigationPaths } from "./use-review-navigation-paths";

type ReturnValue = Promise<{
  levels: number[];
  types: string[];
  selectedLevels: Ref<number[]>;
  selectedTypes: Ref<string[]>;
  shouldShuffle: Ref<boolean>;
  isQuizMode: Ref<boolean>;
  isLoading: ComputedRef<boolean>;
  onStartReview: () => void;
}>;

export const useReviewSelection = async (userLevel: number): ReturnValue => {
  const router = useRouter();

  const levels = Array.from({ length: userLevel }, (_, index) => index + 1);
  const types = ["kanji", "radical", "vocabulary"];

  const selectedLevels = ref<number[]>([]);
  const selectedTypes = ref<string[]>([]);
  const shouldShuffle = ref<boolean>(false);
  const isQuizMode = ref<boolean>(false);

  const isLoading = await useLearningMaterial(userLevel);

  const { createReviewNavigationPaths, getNextReviewNavigationPath } =
    useReviewNavigationPaths();

  const onStartReview = () => {
    createReviewNavigationPaths({
      selectedLevels,
      selectedTypes,
      shouldShuffle,
      isQuizMode,
    });

    const navigationPath = getNextReviewNavigationPath();

    if (navigationPath) {
      router.push(navigationPath);
    }
  };

  return {
    levels,
    types,
    selectedLevels,
    selectedTypes,
    shouldShuffle,
    isQuizMode,
    isLoading,
    onStartReview,
  };
};
