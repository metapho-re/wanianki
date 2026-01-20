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
  padding: 6px 8px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    var(--background-color-1) 0%,
    var(--background-color-transparent) 100%
  );
  box-shadow: var(--shadow-sm);
  grid-area: navigation;
}

@media (width <= 768px) {
  .navigation {
    padding: 8px;
  }
}

@media (width <= 480px) {
  .navigation {
    padding: 6px;
  }
}
</style>
