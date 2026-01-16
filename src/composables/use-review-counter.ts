import { computed, type ComputedRef } from "vue";

import {
  reviewNavigationIndex,
  reviewNavigationPaths,
} from "./use-review-navigation-paths";

interface Counter {
  index: number;
  length: number;
}

export const useReviewCounter = (): ComputedRef<Counter> =>
  computed<Counter>(() => ({
    index: Math.min(
      reviewNavigationIndex.value + 1,
      reviewNavigationPaths.value.length,
    ),
    length: reviewNavigationPaths.value.length,
  }));
