import { computed, type ComputedRef } from "vue";

import {
  reviewNavigationIndex,
  reviewNavigationPaths,
} from "./use-review-navigation-paths";

export const useReviewCounter = (): ComputedRef<{
  index: number;
  length: number;
}> =>
  computed(() => ({
    index: Math.min(
      reviewNavigationIndex.value + 1,
      reviewNavigationPaths.value.length,
    ),
    length: reviewNavigationPaths.value.length,
  }));
