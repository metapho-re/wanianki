import type { QuizType } from "../types";

const QUIZ_TYPES: QuizType[] = ["meaning", "reading"];

export const isQuizType = (value: unknown): value is QuizType =>
  typeof value === "string" && QUIZ_TYPES.includes(value as QuizType);
