import type { SubjectType } from "../types";

const getLevelsQueryParameter = (
  startLevel: number,
  endLevel: number,
): string =>
  Array.from(
    { length: endLevel - startLevel + 1 },
    (_, index) => startLevel + index,
  ).join(",");

export const getSubjectsUrl = (
  startLevel: number,
  endLevel: number,
  subjectType: SubjectType,
): string =>
  `/subjects?types=${subjectType}&levels=${getLevelsQueryParameter(startLevel, endLevel)}`;
