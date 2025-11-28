import type { Ref } from "vue";

import type {
  Kanji,
  Radical,
  SubjectResponse,
  SubjectType,
  Vocabulary,
} from "../types";

interface Params {
  selectedLevels: Ref<number[]>;
  selectedTypes: Ref<string[]>;
  isQuizMode: Ref<boolean>;
  collectionType: SubjectType;
  subjectCollection: SubjectResponse<Kanji | Radical | Vocabulary>[];
}

export const getNavigationPathsFromSelectedSubjects = ({
  selectedLevels,
  selectedTypes,
  isQuizMode,
  collectionType,
  subjectCollection,
}: Params): string[] => {
  const paths =
    selectedTypes.value.indexOf(collectionType) >= 0
      ? subjectCollection
          .filter(({ data }) => selectedLevels.value.indexOf(data.level) >= 0)
          .map(
            ({ data: { slug }, object }) =>
              `${collectionType}/${isQuizMode.value && object === "radical" ? btoa(slug) : slug}`,
          )
      : [];

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
