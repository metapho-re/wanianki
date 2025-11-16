<script setup lang="ts">
defineProps<{
  type: "kanji" | "radical" | "vocabulary";
  level: number;
  meaning: string;
  reading?: string;
  readingType?: string;
}>();
</script>

<template>
  <div class="subject-overview">
    <p class="level">Level {{ level }}</p>
    <div class="characters">
      <slot></slot>
    </div>
    <div class="meaning-reading">
      <p v-if="reading" :class="type">
        <span class="japanese">{{ reading }}</span>
        <span v-if="readingType"> ({{ readingType }})</span>
      </p>
      <p :class="type">{{ meaning }}</p>
    </div>
  </div>
</template>

<style scoped>
.subject-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  grid-area: subject;
}

.level {
  border: 1px solid var(--background-color-3);
  border-radius: 12px;
  margin: 0;
  background-color: var(--background-color-2);
  padding-inline: 8px;
}

.characters {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.meaning-reading {
  display: flex;
  width: calc(100% - 40px);
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--background-color-2);
  font-size: 1.2rem;
}

.kanji,
.radical,
.vocabulary {
  border-width: 1px;
  border-style: solid;
  border-radius: 12px;
  margin: 8px;
  padding-inline: 8px;
}

.radical {
  border: 1px solid var(--radical-color);
  background-color: var(--radical-color-transparent);
}

.kanji {
  border: 1px solid var(--kanji-color);
  background-color: var(--kanji-color-transparent);
}

.vocabulary {
  border: 1px solid var(--vocabulary-color);
  background-color: var(--vocabulary-color-transparent);
}
</style>
