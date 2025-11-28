import { ref, type Ref } from "vue";

import type { QuizReport, QuizType, SubjectType } from "../types";

const subjectTypes: SubjectType[] = ["kanji", "radical", "vocabulary"];
const quizTypes: QuizType[] = ["meaning", "reading"];
const properties: ("correct" | "total")[] = ["correct", "total"];

interface ReturnValue {
  quizReport: Ref<QuizReport>;
  update: (
    subjectType: SubjectType,
    quizType: QuizType,
    status: "correct" | "incorrect",
  ) => void;
}

export const useQuizReport = (): ReturnValue => {
  const quizReport = ref<QuizReport>({} as QuizReport);

  subjectTypes.forEach((subjectType) => {
    quizReport.value[subjectType] = {} as QuizReport[SubjectType];

    quizTypes.forEach((quizType) => {
      quizReport.value[subjectType][quizType] =
        {} as QuizReport[SubjectType][QuizType];

      properties.forEach((property) => {
        quizReport.value[subjectType][quizType][property] = 0;
      });
    });
  });

  const update = (
    subjectType: SubjectType,
    quizType: QuizType,
    status: "correct" | "incorrect",
  ) => {
    if (status === "correct") {
      quizReport.value[subjectType][quizType].correct += 1;
    }

    quizReport.value[subjectType][quizType].total += 1;
  };

  return {
    quizReport,
    update,
  };
};
