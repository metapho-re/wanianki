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
    index: reviewNavigationIndex.value + 1,
    length: reviewNavigationPaths.value.length,
  }));
