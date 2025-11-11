import type { Ref } from "vue";

import type { Kanji, Radical, SubjectResponse, Vocabulary } from "../types";

interface Params {
  selectedLevels: Ref<number[]>;
  selectedTypes: Ref<string[]>;
  collectionType: "kanji" | "radical" | "vocabulary";
  subjectCollection: SubjectResponse<Kanji | Radical | Vocabulary>[];
}

export const getNavigationPathsFromSelectedSubjects = ({
  selectedLevels,
  selectedTypes,
  collectionType,
  subjectCollection,
}: Params): string[] =>
  selectedTypes.value.indexOf(collectionType) >= 0
    ? subjectCollection
        .filter(({ data }) => selectedLevels.value.indexOf(data.level) >= 0)
        .map(({ data: { slug } }) => `${collectionType}/${slug}`)
    : [];
