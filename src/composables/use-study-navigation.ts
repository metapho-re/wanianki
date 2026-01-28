import { onMounted, onUnmounted, ref, type Ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Store, Subject, SubjectResponse } from "../types";
import { getSubjectDataFromSlug, parseSlug } from "../utils";

import { useReviewNavigationPaths } from "./use-review-navigation-paths";

interface ReturnValue<T> {
  subject: Ref<T | null>;
  onNavigate: (direction: "previous" | "next") => () => void;
}

export const useStudyNavigation = <T extends Subject>(
  subjectCollection: Store<SubjectResponse<T>, "collection">,
): ReturnValue<T> => {
  const route = useRoute();
  const router = useRouter();

  const initialSlug = parseSlug(route.params.slug);

  const subject = ref<T | null>(
    initialSlug
      ? getSubjectDataFromSlug(initialSlug, subjectCollection.value)
      : null,
  );

  watch(
    () => route.params.slug,
    (slug) => {
      const newSlug = parseSlug(slug);

      if (!newSlug) {
        router.push("/");
      } else {
        subject.value = getSubjectDataFromSlug(
          newSlug,
          subjectCollection.value,
        );
      }
    },
  );

  const { getPreviousReviewNavigationPath, getNextReviewNavigationPath } =
    useReviewNavigationPaths();

  const onNavigate = (direction: "previous" | "next") => () => {
    const navigationPath =
      direction === "next"
        ? getNextReviewNavigationPath()
        : getPreviousReviewNavigationPath();

    if (navigationPath) {
      router.push(`/${navigationPath}`);
    } else {
      router.push("/");
    }
  };

  const onKeyDownEventListener = (event: KeyboardEvent) => {
    switch (event.code) {
      case "Space":
      case "Enter": {
        const direction = event.ctrlKey ? "previous" : "next";

        onNavigate(direction)();

        break;
      }

      case "Escape": {
        router.push("/");

        break;
      }
      default: {
        return;
      }
    }
  };

  onMounted(() => {
    if (!subject.value) {
      router.push("/");
    }

    window.addEventListener("keydown", onKeyDownEventListener);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDownEventListener);
  });

  return { subject: subject as Ref<T | null>, onNavigate };
};
