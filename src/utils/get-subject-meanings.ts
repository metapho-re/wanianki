import type { Subject } from "../types";

interface ReturnValue {
  primary: string;
  secondary: string | null;
}

export const getSubjectMeanings = (subject: Subject): ReturnValue => {
  const primaryMeanings: string[] = [];
  const secondaryMeanings: string[] = [];

  subject.meanings.forEach(({ meaning, primary }) => {
    if (primary) {
      primaryMeanings.push(meaning);
    } else {
      secondaryMeanings.push(meaning);
    }
  });

  return {
    primary: primaryMeanings[0]!,
    secondary: secondaryMeanings.length ? secondaryMeanings.join(", ") : null,
  };
};
