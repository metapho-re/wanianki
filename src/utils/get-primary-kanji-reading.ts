import type { KanjiReading } from "../types";

const TYPE_MAP = {
  kunyomi: "Kun'yomi",
  onyomi: "On'yomi",
  nanori: "Nanori",
};

export const getPrimaryKanjiReading = (
  kanjiReadings: KanjiReading[],
): {
  type: string;
  reading: string;
} => {
  const { type, reading } = kanjiReadings.find(
    ({ primary }) => primary,
  ) as KanjiReading;

  return { type: TYPE_MAP[type], reading };
};
