import type { SubjectType } from "./subject";

export type QuizType = "meaning" | "reading";

export type QuizReport = Record<
  SubjectType,
  Record<QuizType, Record<"correct" | "total", number>>
>;
