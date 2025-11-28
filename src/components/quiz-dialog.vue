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
  padding: 40px;
  border: 1px solid var(--background-color-3);
  border-radius: 16px;
  background-color: var(--background-color-2);
  color: var(--foreground-color);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
}

.dialog-body {
  padding-block: 40px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
