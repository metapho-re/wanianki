<script setup lang="ts">
import { useReviewCounter } from "../composables";
import type { SubjectType } from "../types";

import BaseHeader from "./base-header.vue";

defineProps<{
  type: SubjectType;
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
  padding: 4px 14px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-full);
  margin: 0;
  background: var(--background-color-0);
  font-size: 1.2rem;
  font-weight: 700;
}

.kanji {
  color: var(--kanji-color);
  text-shadow: var(--shadow-glow) var(--kanji-color-glow);
}

.radical {
  color: var(--radical-color);
  text-shadow: var(--shadow-glow) var(--radical-color-glow);
}

.vocabulary {
  color: var(--vocabulary-color);
  text-shadow: var(--shadow-glow) var(--vocabulary-color-glow);
}
</style>
