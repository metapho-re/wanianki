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

import {
  kanjiCollection,
  radicalCollection,
  vocabularyCollection,
} from "../composables";
import type { QuizType, Subject, SubjectType } from "../types";
import {
  getAcceptedProperties,
  getDiceCoefficient,
  getSubjectDataFromSlug,
} from "../utils";

import { useReviewNavigationPaths } from "./use-review-navigation-paths";

type ValidationResult = "" | "correct" | "incorrect" | "invalid";

const MINIMUM_ACCEPTABLE_DICE_COEFFICIENT = 0.8;

const collectionMap = {
  kanji: kanjiCollection,
  radical: radicalCollection,
  vocabulary: vocabularyCollection,
};

interface ReturnValue {
  inputValue: Ref<string>;
  validationResult: Ref<ValidationResult>;
  acceptedAnswers: ComputedRef<string[]>;
  subject: Ref<Subject | null>;
  subjectType: Ref<SubjectType>;
  quizType: Ref<QuizType>;
  onInput: (event: Event) => void;
  onNavigate: () => void;
}

export const useQuizNavigation = (): ReturnValue => {
  const route = useRoute();
  const router = useRouter();

  const inputRef = useTemplateRef<HTMLInputElement>("user-input");

  const { getNextReviewNavigationPath } = useReviewNavigationPaths();

  const subject = ref<Subject | null>(
    getSubjectDataFromSlug<Subject>(
      route.params.slug as string,
      collectionMap[route.params.subjectType as keyof typeof collectionMap]
        .value,
    ),
  );
  const subjectType = ref<SubjectType>(route.params.subjectType as SubjectType);
  const quizType = ref<QuizType>(route.params.quizType as QuizType);

  const inputValue = ref<string>("");
  const validationResult = ref<ValidationResult>("");

  const acceptedAnswers = computed(() =>
    getAcceptedProperties(subject.value, quizType.value),
  );

  watch(
    () => route.params,
    (params) => {
      subject.value = getSubjectDataFromSlug<Subject>(
        params.slug as string,
        collectionMap[params.subjectType as keyof typeof collectionMap].value,
      );
      subjectType.value = params.subjectType as SubjectType;
      quizType.value = params.quizType as QuizType;

      inputRef.value?.focus();
    },
  );

  const validate = () => {
    if (quizType.value === "reading") {
      if (!isHiragana(inputValue.value) || inputValue.value.length === 0) {
        validationResult.value = "invalid";
      } else {
        validationResult.value = acceptedAnswers.value.includes(
          inputValue.value.trim(),
        )
          ? "correct"
          : "incorrect";
      }
    } else {
      if (inputValue.value.length === 0) {
        validationResult.value = "invalid";
      } else {
        validationResult.value = acceptedAnswers.value.some(
          (acceptedAnswer) =>
            getDiceCoefficient(acceptedAnswer, inputValue.value) >=
            MINIMUM_ACCEPTABLE_DICE_COEFFICIENT,
        )
          ? "correct"
          : "incorrect";
      }
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
        router.push("/");
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
    onInput,
    onNavigate,
  };
};
