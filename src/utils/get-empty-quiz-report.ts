import type { QuizReport, QuizType, SubjectType } from "../types";

const subjectTypes: SubjectType[] = ["radical", "kanji", "vocabulary"];
const quizTypes: QuizType[] = ["meaning", "reading"];
const properties: ("correct" | "total")[] = ["correct", "total"];

export const getEmptyQuizReport = (): QuizReport => {
  const report = {} as QuizReport;

  subjectTypes.forEach((subjectType) => {
    report[subjectType] = {} as QuizReport[SubjectType];

    quizTypes.forEach((quizType) => {
      report[subjectType][quizType] = {} as QuizReport[SubjectType][QuizType];

      properties.forEach((property) => {
        report[subjectType][quizType][property] = 0;
      });
    });
  });

  return report;
};
