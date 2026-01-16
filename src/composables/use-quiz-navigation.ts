import {
  computed,
  type ComputedRef,
  onMounted,
  onUnmounted,
  ref,
  type Ref,
  useTemplateRef,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { isHiragana, toHiragana, toRomaji } from "wanakana";

import { subjectCollection } from "../composables";
import type { QuizReport, QuizType, Subject, SubjectType } from "../types";
import {
  getAcceptedProperties,
  getDiceCoefficient,
  getSubjectDataFromSlug,
} from "../utils";

import { useQuizDialog } from "./use-quiz-dialog";
import { useQuizReport } from "./use-quiz-report";
import { useReviewNavigationPaths } from "./use-review-navigation-paths";

type ValidationResult = "" | "correct" | "incorrect" | "invalid";

const MINIMUM_ACCEPTABLE_DICE_COEFFICIENT = 0.8;

interface ReturnValue {
  inputValue: Ref<string>;
  validationResult: Ref<ValidationResult>;
  acceptedAnswers: ComputedRef<string[]>;
  subject: Ref<Subject | null>;
  subjectType: Ref<SubjectType>;
  quizType: Ref<QuizType>;
  quizReport: Ref<QuizReport>;
  dialogRef: Ref<{ dialogRef: HTMLDialogElement | null }>;
  onInput: (event: Event) => void;
  onNavigate: () => void;
}

export const useQuizNavigation = (): ReturnValue => {
  const route = useRoute();
  const router = useRouter();

  const inputRef = useTemplateRef<HTMLInputElement>("user-input");

  const { getNextReviewNavigationPath } = useReviewNavigationPaths();
  const { dialogRef, open: openDialog } = useQuizDialog();
  const { quizReport, update: updateQuizReport } = useQuizReport();

  const subject = ref<Subject | null>(
    getSubjectDataFromSlug<Subject>(
      route.params.subjectType === "radical"
        ? atob(route.params.slug as string)
        : (route.params.slug as string),
      subjectCollection[
        route.params.subjectType as keyof typeof subjectCollection
      ].value,
    ),
  );
  const subjectType = ref<SubjectType>(route.params.subjectType as SubjectType);
  const quizType = ref<QuizType>(route.params.quizType as QuizType);

  const inputValue = ref<string>("");
  const validationResult = ref<ValidationResult>("");

  const acceptedAnswers = computed<string[]>(() =>
    getAcceptedProperties(subject.value, quizType.value),
  );

  watch(
    () => route.params,
    (params) => {
      subject.value = getSubjectDataFromSlug<Subject>(
        params.subjectType === "radical"
          ? atob(params.slug as string)
          : (params.slug as string),
        subjectCollection[params.subjectType as keyof typeof subjectCollection]
          .value,
      );
      subjectType.value = params.subjectType as SubjectType;
      quizType.value = params.quizType as QuizType;

      inputRef.value?.focus();
    },
  );

  const validate = () => {
    let _validationResult: ValidationResult = "incorrect";

    if (inputValue.value.length === 0) {
      _validationResult = "invalid";
    } else if (quizType.value === "reading" && !isHiragana(inputValue.value)) {
      _validationResult = "invalid";
    } else if (
      quizType.value === "reading" &&
      acceptedAnswers.value.includes(inputValue.value.trim())
    ) {
      _validationResult = "correct";
    } else if (
      quizType.value === "meaning" &&
      acceptedAnswers.value.some(
        (acceptedAnswer) =>
          getDiceCoefficient(acceptedAnswer, inputValue.value) >=
          MINIMUM_ACCEPTABLE_DICE_COEFFICIENT,
      )
    ) {
      _validationResult = "correct";
    }

    validationResult.value = _validationResult;

    if (_validationResult === "correct" || _validationResult === "incorrect") {
      updateQuizReport(subjectType.value, quizType.value, _validationResult);
    }
  };

  const onNavigate = () => {
    if (validationResult.value === "" || validationResult.value === "invalid") {
      validate();
    } else {
      validationResult.value = "";
      inputValue.value = "";

      const navigationPath = getNextReviewNavigationPath();

      if (navigationPath) {
        router.push(`../../../${navigationPath}`);
      } else {
        openDialog();
      }
    }
  };

  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    validationResult.value = "";

    if (quizType.value === "meaning") {
      inputValue.value = value;
    } else {
      inputValue.value = toHiragana(toRomaji(value), { IMEMode: true });
    }
  };

  const onKeyDownEventListener = (event: KeyboardEvent) => {
    switch (event.code) {
      case "Enter": {
        onNavigate();

        break;
      }

      case "Escape": {
        router.push("/");

        break;
      }
      default: {
        return;
      }
    }
  };

  onMounted(() => {
    if (!subject.value) {
      router.push("/");
    }

    window.addEventListener("keydown", onKeyDownEventListener);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDownEventListener);
  });

  return {
    inputValue,
    validationResult,
    acceptedAnswers,
    subject,
    subjectType,
    quizType,
    quizReport,
    dialogRef,
    onInput,
    onNavigate,
  };
};
