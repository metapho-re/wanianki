import type { Kanji, KanjiReading } from "../types";

type Reading = {
  reading: string;
  primary: boolean;
} | null;

type ReturnValue = Record<KanjiReading["type"], Reading>;

export const getKanjiReadings = (kanji: Kanji): ReturnValue =>
  kanji.readings.reduce(
    (readings, { primary, reading, type }) => {
      readings[type] =
        readings[type] === null
          ? { primary, reading }
          : {
              primary: readings[type].primary || primary,
              reading: `${readings[type].reading}, ${reading}`,
            };

      return readings;
    },
    {
      kunyomi: null,
      onyomi: null,
      nanori: null,
    } as ReturnValue,
  );
