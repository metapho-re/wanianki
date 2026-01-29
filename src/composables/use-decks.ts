import type { Ref } from "vue";

import { DECKS_KEY } from "../storage-keys";
import type { Deck } from "../types";

import { useLocalStorage } from "./use-local-storage";
import { useNotifications } from "./use-notifications";

const { addNotification } = useNotifications();

const decks = useLocalStorage<Deck[]>(DECKS_KEY, []);

const saveDeck = (name: string, subjectIds: number[]) => {
  const newDeck: Deck = {
    id: crypto.randomUUID(),
    name,
    subjectIds: [...subjectIds],
  };

  decks.value = [...decks.value, newDeck];

  addNotification(`Deck "${name}" saved`, "success");
};

const removeDeck = (id: string) => {
  decks.value = decks.value.filter((deck) => deck.id !== id);

  addNotification("Deck removed", "success");
};

interface ReturnValue {
  decks: Ref<Deck[]>;
  saveDeck: (name: string, subjectIds: number[]) => void;
  removeDeck: (id: string) => void;
}

export const useDecks = (): ReturnValue => ({
  decks,
  saveDeck,
  removeDeck,
});
