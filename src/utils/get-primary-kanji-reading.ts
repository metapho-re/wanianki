import type { KanjiReading } from "../types";

import { getKanjiReadings } from "./get-kanji-readings";

const TYPE_MAP = {
  kunyomi: "Kun'yomi",
  onyomi: "On'yomi",
  nanori: "Nanori",
};

export const getPrimaryKanjiReading = (
  kanjiReadings: ReturnType<typeof getKanjiReadings>,
): {
  type: string;
  reading: string;
} => {
  const [type, { reading }] = Object.entries(kanjiReadings).find(
    ([, value]) => !!value?.primary,
  ) as [KanjiReading["type"], { reading: string }];

  return { type: TYPE_MAP[type], reading };
};
