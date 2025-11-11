<script setup lang="ts">
import { getParsedText } from "../utils";

defineProps<{
  parsedText: ReturnType<typeof getParsedText>;
}>();
</script>

<template>
  <span
    v-for="(segment, index) in parsedText"
    :key="`${segment.content}-${index}`"
    :class="segment.tag"
    >{{ segment.content }}</span
  >
</template>

<style scoped>
.meaning,
.reading {
  font-style: italic;
}

.kanji,
.radical,
.vocabulary {
  border-radius: 8px;
  padding-inline: 4px;
}

.kanji {
  border: 1px solid var(--kanji-color);
  background-color: var(--kanji-color-transparent);
}

.radical {
  border: 1px solid var(--radical-color);
  background-color: var(--radical-color-transparent);
}

.vocabulary {
  border: 1px solid var(--vocabulary-color);
  background-color: var(--vocabulary-color-transparent);
}
</style>
