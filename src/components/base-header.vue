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
      title="Go back to the home page"
      :on-click="navigateHome"
      :left-icon-path="kanjiIconPath"
      >WaniAnki</base-button
    >
    <slot></slot>
    <base-button
      title="Delete all data in browser file system"
      :disabled="isDataCleanupLoading"
      :on-click="cleanUpData"
      :left-icon-path="deleteIconPath"
    >
      Clean up data
    </base-button>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  grid-area: header;
}
</style>
