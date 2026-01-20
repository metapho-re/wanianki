<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import BaseButton from "./base-button.vue";

const router = useRouter();

const dialogRef = ref<HTMLDialogElement | null>(null);

const close = (event: MouseEvent) => {
  if (event.clientX > 0 && event.clientY > 0) {
    dialogRef.value?.close();
    router.push("/");
  }
};

const handleEscape = () => {
  router.push("/");
};

defineExpose<{
  dialogRef: typeof dialogRef;
}>({ dialogRef });
</script>

<template>
  <dialog ref="dialogRef" class="dialog" @cancel="handleEscape">
    <header class="dialog-header">
      <slot name="header"></slot>
    </header>
    <section class="dialog-body">
      <slot></slot>
    </section>
    <footer class="dialog-footer">
      <base-button @click="close">Dismiss</base-button>
    </footer>
  </dialog>
</template>

<style scoped>
.dialog {
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
