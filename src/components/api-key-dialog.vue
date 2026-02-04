<script setup lang="ts">
import { ref } from "vue";

import BaseButton from "./base-button.vue";

const emit = defineEmits<{
  submit: [apiKey: string];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const apiKeyInput = ref<string>("");

const handleCancel = () => {
  apiKeyInput.value = "";
  dialogRef.value?.close();
};

const handleSubmit = () => {
  const trimmedKey = apiKeyInput.value.trim();

  if (trimmedKey) {
    emit("submit", trimmedKey);

    handleCancel();
  }
};

defineExpose<{
  dialogRef: typeof dialogRef;
}>({ dialogRef });
</script>

<template>
  <dialog ref="dialogRef" class="dialog">
    <div class="dialog-content">
      <header class="dialog-header">
        <span>Enter your API Key</span>
      </header>
      <section class="dialog-body">
        <p class="dialog-description">
          Enter your WaniKani API key to check for level changes.
        </p>
        <input
          v-model="apiKeyInput"
          type="password"
          class="api-key-input"
          placeholder="Your WaniKani API key..."
          aria-label="WaniKani API key"
          @keyup.enter="handleSubmit"
        />
      </section>
      <footer class="dialog-footer">
        <base-button variant="secondary" @click="handleCancel">
          Cancel
        </base-button>
        <base-button :disabled="!apiKeyInput.trim()" @click="handleSubmit">
          Check for Updates
        </base-button>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  width: 400px;
  max-width: calc(100vw - 48px);
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  background: transparent;
}

.dialog::backdrop {
  backdrop-filter: blur(4px);
  background: var(--overlay-color);
}

.dialog-content {
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

.dialog-description {
  margin: 0 0 16px;
  color: var(--foreground-color-1);
  font-size: 0.95rem;
}

.api-key-input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-1);
  color: var(--foreground-color-0);
  font-family: inherit;
  font-size: 0.9rem;
  transition: var(--transition-base);
}

.api-key-input:focus {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow) var(--primary-color-glow);
  outline: none;
}

.api-key-input::placeholder {
  color: var(--muted-color);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--background-color-3);
  gap: 12px;
}

@media (width <= 768px) {
  .dialog {
    width: calc(100vw - 48px);
    max-width: 400px;
  }

  .dialog-content {
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
}

@media (width <= 480px) {
  .dialog {
    width: calc(100vw - 32px);
  }

  .dialog-content {
    padding: 16px;
  }

  .dialog-header {
    padding-bottom: 10px;
    font-size: 1rem;
  }

  .dialog-body {
    padding-block: 12px;
  }

  .dialog-description {
    font-size: 0.9rem;
  }

  .dialog-footer {
    flex-direction: column-reverse;
    padding-top: 10px;
  }
}
</style>
