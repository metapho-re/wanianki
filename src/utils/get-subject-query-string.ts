import { toRomaji } from "wanakana";

import type {
  Kanji,
  ReviewSubject,
  SubjectResponse,
  Vocabulary,
} from "../types";

export const getSubjectQueryString = (subject: ReviewSubject): string => {
  const meanings = subject.data.meanings.map(({ meaning }) =>
    meaning.toLowerCase(),
  );

  const readings =
    subject.object === "radical"
      ? ""
      : (subject as SubjectResponse<Kanji | Vocabulary>).data.readings.map(
          ({ reading }) => toRomaji(reading),
        );

  return [...meanings, ...readings].join(" ");
};
