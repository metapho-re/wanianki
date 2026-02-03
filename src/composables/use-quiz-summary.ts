import { computed, type ComputedRef, onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

import type { Deck, QuizReport, ReviewSubject } from "../types";
import { getEmptyQuizReport } from "../utils";

import { useDecks } from "./use-decks";
import { useQuizReport } from "./use-quiz-report";

interface ReturnValue {
  quizReport: Ref<QuizReport>;
  incorrectItems: Ref<ReviewSubject[]>;
  newDeckName: Ref<string>;
  shouldShowNameInput: Ref<boolean>;
  sourceDeck: ComputedRef<Deck | null | undefined>;
  hasIncorrectItems: ComputedRef<boolean>;
  hasQuizReport: ComputedRef<boolean>;
  showNameInput: () => void;
  hideNameInput: () => void;
  handleDismiss: () => void;
  handleCreateDeck: () => void;
  handleUpdateDeck: () => void;
}

export const useQuizSummary = (): ReturnValue => {
  const router = useRouter();

  const { quizReport, incorrectItems, sourceDeckId, resetQuizReport } =
    useQuizReport();

  const { decks, saveDeck, updateDeck } = useDecks();

  const newDeckName = ref<string>("");
  const shouldShowNameInput = ref<boolean>(false);

  const sourceDeck = computed<Deck | null | undefined>(() =>
    sourceDeckId.value
      ? decks.value.find((deck) => deck.id === sourceDeckId.value)
      : null,
  );
  const incorrectItemIds = computed<number[]>(() =>
    incorrectItems.value.map(({ id }) => id),
  );
  const hasIncorrectItems = computed<boolean>(
    () => incorrectItems.value.length > 0,
  );
  const hasQuizReport = computed<boolean>(
    () =>
      JSON.stringify(quizReport.value) !== JSON.stringify(getEmptyQuizReport()),
  );

  onMounted(() => {
    if (!hasQuizReport.value) {
      router.push("/");
    }
  });

  const showNameInput = () => {
    shouldShowNameInput.value = true;
  };

  const hideNameInput = () => {
    shouldShowNameInput.value = false;
  };

  const handleDismiss = () => {
    resetQuizReport();

    router.push("/");
  };

  const handleCreateDeck = () => {
    const trimmedName = newDeckName.value.trim();

    if (trimmedName) {
      saveDeck(trimmedName, incorrectItemIds.value);
      handleDismiss();
    }
  };

  const handleUpdateDeck = () => {
    if (sourceDeckId.value) {
      updateDeck(sourceDeckId.value, incorrectItemIds.value);
      handleDismiss();
    }
  };

  return {
    quizReport,
    incorrectItems,
    newDeckName,
    shouldShowNameInput,
    sourceDeck,
    hasIncorrectItems,
    hasQuizReport,
    showNameInput,
    hideNameInput,
    handleDismiss,
    handleCreateDeck,
    handleUpdateDeck,
  };
};
