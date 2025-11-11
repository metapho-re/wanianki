import { radicalCollection } from "../composables";
import type { Kanji } from "../types";

import { getRadicalImageUrl } from "./get-radical-image-url";
import { getSubjectMeanings } from "./get-subject-meanings";

type ReturnValue = {
  characterImageUrl: string;
  meaning: string;
  slug: string;
}[];

export const getRadicalCombination = (kanji: Kanji): ReturnValue =>
  radicalCollection.value
    .filter(({ id }) => kanji.component_subject_ids.indexOf(id) >= 0)
    .map(({ data }) => ({
      characterImageUrl: getRadicalImageUrl(data.character_images),
      meaning: getSubjectMeanings(data).primary,
      slug: data.slug,
    }));
