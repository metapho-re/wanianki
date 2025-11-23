import type { SubjectType } from "../types";

const getLevelsQueryParameter = (level: number): string =>
  Array.from({ length: level }, (_, index) => index + 1).reduce(
    (previousValue, currentValue, index) =>
      index === 0 ? `${currentValue}` : `${previousValue},${currentValue}`,
    "",
  );

export const getSubjectsUrl = (
  level: number,
  subjectType: SubjectType,
): string =>
  `/subjects?types=${subjectType}&levels=${getLevelsQueryParameter(level)}`;
