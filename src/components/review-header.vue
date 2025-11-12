<script setup lang="ts">
import { useReviewCounter } from "../composables";

import BaseHeader from "./base-header.vue";

defineProps<{
  type: "kanji" | "radical" | "vocabulary";
}>();

const reviewCounter = useReviewCounter();
</script>

<template>
  <base-header>
    <div>
      <p class="counter">
        <span :class="type">{{ reviewCounter.index }}</span>
        <span>/</span>
        <span>{{ reviewCounter.length }}</span>
      </p>
    </div>
  </base-header>
</template>

<style scoped>
.counter {
  border: 1px solid var(--background-color-3);
  border-radius: 12px;
  margin: 0;
  background-color: var(--background-color-2);
  font-size: 1.5rem;
  font-weight: bold;
  padding-inline: 8px;
}

.kanji {
  color: var(--kanji-color);
}

.radical {
  color: var(--radical-color);
}

.vocabulary {
  color: var(--vocabulary-color);
}
</style>
