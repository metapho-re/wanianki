import type { SubjectType } from "../types";

const SUBJECT_TYPES: SubjectType[] = ["kanji", "radical", "vocabulary"];

export const isSubjectType = (value: unknown): value is SubjectType =>
  typeof value === "string" && SUBJECT_TYPES.includes(value as SubjectType);
