<script setup lang="ts">
import { useRouter } from "vue-router";

import { useDataCleanup } from "../composables";
import { deleteIconPath, kanjiIconPath } from "../icon-paths";

import BaseButton from "./base-button.vue";

const router = useRouter();

const { cleanUpData, isLoading: isDataCleanupLoading } = useDataCleanup();

const navigateHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="header">
    <base-button
      title="Go back to dashboard"
      :left-icon-path="kanjiIconPath"
      @click="navigateHome"
      >WaniAnki</base-button
    >
    <slot></slot>
    <base-button
      title="Clean up browser file system and log out"
      :disabled="isDataCleanupLoading"
      :left-icon-path="deleteIconPath"
      @click="cleanUpData"
    >
      Log out
    </base-button>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-1);
  box-shadow: var(--shadow-sm);
  grid-area: header;
}

@media (width <= 768px) {
  .header {
    display: grid;
    padding: 8px;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .header :deep(:first-child) {
    order: 1;
    justify-self: start;
  }

  .header :deep(:nth-child(2)) {
    order: 3;
    grid-column: 1 / -1;
    justify-self: center;
  }

  .header :deep(:last-child) {
    order: 2;
    justify-self: end;
  }
}

@media (width <= 480px) {
  .header {
    padding: 6px;
    gap: 6px;
  }
}
</style>
