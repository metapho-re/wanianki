import { ref, type Ref } from "vue";

import type {
  QuizReport,
  QuizType,
  ReviewSubject,
  SubjectType,
} from "../types";
import { getEmptyQuizReport } from "../utils";

const quizReport = ref<QuizReport>(getEmptyQuizReport());
const incorrectItems = ref<ReviewSubject[]>([]);
const sourceDeckId = ref<string | null>(null);

const updateQuizReport = ({
  subjectType,
  quizType,
  subject,
  status,
}: {
  subjectType: SubjectType;
  quizType: QuizType;
  subject: ReviewSubject | null;
  status: "correct" | "incorrect";
}) => {
  if (status === "correct") {
    quizReport.value[subjectType][quizType].correct += 1;
  } else {
    const isSubjectAlreadyAdded =
      subject && incorrectItems.value.some((item) => item.id === subject.id);

    if (!isSubjectAlreadyAdded) {
      incorrectItems.value = [
        ...incorrectItems.value,
        subject as ReviewSubject,
      ];
    }
  }

  quizReport.value[subjectType][quizType].total += 1;
};

const resetQuizReport = () => {
  quizReport.value = getEmptyQuizReport();
  incorrectItems.value = [];
  sourceDeckId.value = null;
};

const setSourceDeckId = (deckId: string | null) => {
  sourceDeckId.value = deckId;
};

interface ReturnValue {
  quizReport: Ref<QuizReport>;
  incorrectItems: Ref<ReviewSubject[]>;
  sourceDeckId: Ref<string | null>;
  updateQuizReport: ({
    subjectType,
    quizType,
    subject,
    status,
  }: {
    subjectType: SubjectType;
    quizType: QuizType;
    subject: ReviewSubject | null;
    status: "correct" | "incorrect";
  }) => void;
  resetQuizReport: () => void;
  setSourceDeckId: (deckId: string | null) => void;
}

export const useQuizReport = (): ReturnValue => ({
  quizReport,
  incorrectItems,
  sourceDeckId,
  updateQuizReport,
  resetQuizReport,
  setSourceDeckId,
});
