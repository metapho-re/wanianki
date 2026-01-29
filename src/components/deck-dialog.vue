<script setup lang="ts">
import { ref } from "vue";

import { deleteIconPath } from "../icon-paths";
import type { Deck } from "../types";
import { getPluralizedQuantity } from "../utils";

import BaseButton from "./base-button.vue";
import BaseIcon from "./base-icon.vue";

defineProps<{
  decks: Deck[];
  hasSelection: boolean;
}>();

const emit = defineEmits<{
  load: [subjectIds: number[]];
  remove: [id: string];
  save: [name: string];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const newDeckName = ref<string>("");

const close = (event: MouseEvent) => {
  if (event.clientX > 0 && event.clientY > 0) {
    dialogRef.value?.close();
  }
};

const handleSave = () => {
  const trimmedName = newDeckName.value.trim();

  if (trimmedName) {
    emit("save", trimmedName);

    newDeckName.value = "";
    dialogRef.value?.close();
  }
};

const handleLoad = (subjectIds: number[]) => {
  emit("load", subjectIds);

  dialogRef.value?.close();
};

const handleRemove = (id: string) => {
  emit("remove", id);
};

defineExpose<{
  dialogRef: typeof dialogRef;
}>({ dialogRef });
</script>

<template>
  <dialog ref="dialogRef" class="dialog">
    <header class="dialog-header">
      <span>Saved Review Decks</span>
    </header>
    <section class="dialog-body">
      <div class="save-section">
        <input
          v-model="newDeckName"
          class="deck-input"
          placeholder="New deck name..."
          aria-label="New deck name"
          @keyup.enter="handleSave"
        />
        <base-button
          size="small"
          :disabled="!hasSelection || !newDeckName.trim()"
          @click="handleSave"
        >
          Save Current
        </base-button>
      </div>
      <ul v-if="decks.length > 0" class="deck-list" role="list">
        <li v-for="deck in decks" :key="deck.id" class="deck-item">
          <button
            class="deck-name"
            :aria-label="`Load deck ${deck.name}`"
            @click="handleLoad(deck.subjectIds)"
          >
            {{ deck.name }}
            <span class="deck-count"
              >({{
                getPluralizedQuantity("item", deck.subjectIds.length)
              }})</span
            >
          </button>
          <button
            class="remove-button"
            title="Remove deck"
            :aria-label="`Remove deck ${deck.name}`"
            @click="handleRemove(deck.id)"
          >
            <base-icon :path="deleteIconPath" width="20px" height="20px" />
          </button>
        </li>
      </ul>
      <p v-else class="empty-message">No saved decks yet.</p>
    </section>
    <footer class="dialog-footer">
      <base-button @click="close">Close</base-button>
    </footer>
  </dialog>
</template>

<style scoped>
.dialog {
  width: 400px;
  max-width: calc(100vw - 48px);
  padding: 32px 40px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-lg);
  background: linear-gradient(
    180deg,
    var(--background-color-2) 0%,
    var(--background-color-1) 100%
  );
  box-shadow:
    var(--shadow-lg),
    0 0 60px var(--overlay-color);
  color: var(--foreground-color-0);
}

.dialog::backdrop {
  backdrop-filter: blur(4px);
  background: var(--overlay-color);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--background-color-3);
  font-size: 1.3rem;
  font-weight: 700;
}

.dialog-body {
  padding-block: 24px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--background-color-3);
}

.save-section {
  display: flex;
  margin-bottom: 20px;
  gap: 12px;
}

.deck-input {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-1);
  color: var(--foreground-color-0);
  font-family: inherit;
  font-size: 0.9rem;
  transition: var(--transition-base);
}

.deck-input:focus {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow) var(--primary-color-glow);
  outline: none;
}

.deck-input::placeholder {
  color: var(--muted-color);
}

.deck-list {
  display: flex;
  max-height: 300px;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 8px;
  list-style: none;
  overflow-y: auto;
}

.deck-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-1);
  transition: var(--transition-base);
}

.deck-item:hover {
  border-color: var(--primary-color);
}

.deck-name {
  flex: 1;
  padding: 0;
  border: none;
  background: none;
  color: var(--foreground-color-0);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  text-align: left;
}

.deck-name:hover {
  color: var(--primary-color);
}

.deck-count {
  margin-left: 8px;
  color: var(--muted-color);
  font-size: 0.85rem;
}

.remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--muted-color);
  cursor: pointer;
  transition: var(--transition-base);
}

.remove-button:hover {
  background: var(--background-color-2);
  color: var(--error-color);
}

.empty-message {
  margin: 0;
  color: var(--muted-color);
  font-size: 0.95rem;
  text-align: center;
}

@media (width >= 1024px) {
  .dialog {
    width: 500px;
  }

  .deck-list {
    max-height: 400px;
  }
}

@media (width <= 768px) {
  .dialog {
    width: calc(100vw - 48px);
    max-width: 500px;
    padding: 24px;
  }

  .dialog-header {
    padding-bottom: 12px;
    font-size: 1.1rem;
  }

  .dialog-body {
    padding-block: 16px;
  }

  .dialog-footer {
    padding-top: 12px;
  }

  .save-section {
    flex-direction: column;
    gap: 10px;
  }
}

@media (width <= 480px) {
  .dialog {
    width: calc(100vw - 32px);
    padding: 16px;
  }

  .dialog-header {
    padding-bottom: 10px;
    font-size: 1rem;
  }

  .dialog-body {
    padding-block: 12px;
  }

  .dialog-footer {
    padding-top: 10px;
  }
}
</style>
