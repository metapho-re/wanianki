import type { Vocabulary } from "../types";

interface ReturnValue {
  primary: string;
  secondary: string | null;
}

export const getVocabularyReadings = (vocabulary: Vocabulary): ReturnValue =>
  vocabulary.readings.reduce(
    (readings, { primary, reading }) => {
      if (primary) {
        return { ...readings, primary: reading };
      }

      return {
        ...readings,
        secondary: readings.secondary
          ? `${readings.secondary}, ${reading}`
          : reading,
      };
    },
    {
      primary: "",
      secondary: null,
    } as ReturnValue,
  );
