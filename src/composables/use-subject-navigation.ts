import { onMounted, onUnmounted, ref, type Ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Store, Subject, SubjectResponse } from "../types";
import { getSubjectDataFromSlug } from "../utils";

import { useReviewNavigationPaths } from "./use-review-navigation-paths";

interface ReturnValue<T> {
  subject: Ref<T | null>;
  onNavigate: (direction: "previous" | "next") => () => void;
}

export const useSubjectNavigation = <T extends Subject>(
  subjectCollection: Store<SubjectResponse<T>, "collection">,
): ReturnValue<T> => {
  const route = useRoute();
  const router = useRouter();

  const subject = ref<T | null>(
    getSubjectDataFromSlug(
      route.params.slug as string,
      subjectCollection.value,
    ),
  );

  watch(
    () => route.params.slug,
    (slug) => {
      subject.value = getSubjectDataFromSlug(
        slug as string,
        subjectCollection.value,
      );
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
      router.push(`../${navigationPath}`);
    } else {
      router.push("/");
    }
  };

  const onKeyDownEventListener = (event: KeyboardEvent) => {
    event.preventDefault();

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
