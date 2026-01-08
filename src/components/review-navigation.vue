<script setup lang="ts">
import { chevronLeftIconPath, chevronRightIconPath } from "../icon-paths";

import BaseButton from "./base-button.vue";

defineProps<{
  onPreviousClick?: () => void;
  onNextClick: () => void;
}>();
</script>

<template>
  <div class="navigation">
    <base-button
      v-if="onPreviousClick"
      title="Navigate to the previous subject"
      :left-icon-path="chevronLeftIconPath"
      @click="onPreviousClick"
      >Previous</base-button
    >
    <div v-else></div>
    <base-button
      title="Navigate to the next subject"
      :right-icon-path="chevronRightIconPath"
      @click="onNextClick"
      >Next</base-button
    >
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  grid-area: navigation;
}
</style>
