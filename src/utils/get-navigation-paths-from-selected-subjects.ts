import type { ComputedRef, Ref } from "vue";

import type { ReviewSubject } from "../types";

interface Params {
  selectedSubjects: ComputedRef<ReviewSubject[]>;
  isQuizMode: Ref<boolean>;
}

export const getNavigationPathsFromSelectedSubjects = ({
  selectedSubjects,
  isQuizMode,
}: Params): string[] => {
  const paths = selectedSubjects.value.map(
    ({ data: { slug }, object }) =>
      `${object}/${isQuizMode.value && object === "radical" ? btoa(slug) : slug}`,
  );

  if (isQuizMode.value) {
    return paths
      .map((path) =>
        (path.split("/")[0] === "radical"
          ? ["meaning"]
          : ["meaning", "reading"]
        ).map((type) => `quiz/${type}/${path}`),
      )
      .flat();
  } else {
    return paths.map((path) => `study/${path}`);
  }
};
