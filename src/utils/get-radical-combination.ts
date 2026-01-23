import { subjectCollection } from "../composables";
import type { Kanji } from "../types";

import { getRadicalImageUrl } from "./get-radical-image-url";
import { getSubjectMeanings } from "./get-subject-meanings";

type ReturnValue = {
  characters: string | null;
  characterImageUrl: string | undefined;
  meaning: string;
  slug: string;
}[];

export const getRadicalCombination = (kanji: Kanji): ReturnValue =>
  subjectCollection.radical.value
    .filter(({ id }) => kanji.component_subject_ids.indexOf(id) >= 0)
    .map(({ data }) => ({
      characters: data.characters,
      characterImageUrl: getRadicalImageUrl(data.character_images),
      meaning: getSubjectMeanings(data).primary,
      slug: data.slug,
    }));
