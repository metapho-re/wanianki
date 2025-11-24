import type { Kanji, QuizType, Subject, Vocabulary } from "../types";

export const getAcceptedProperties = (
  subject: Subject | null,
  type: QuizType,
): string[] => {
  if (!subject) {
    return [];
  }

  if (type === "meaning") {
    return subject.meanings
      .filter(({ accepted_answer }) => accepted_answer)
      .map(({ meaning }) => meaning);
  }

  return (subject as Kanji | Vocabulary).readings
    .filter(({ accepted_answer }) => accepted_answer)
    .map(({ reading }) => reading);
};
