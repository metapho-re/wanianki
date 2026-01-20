<script setup lang="ts">
import type { SubjectType } from "../types";

defineProps<{
  type: SubjectType;
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
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    var(--background-color-1) 0%,
    var(--background-color-transparent) 100%
  );
  box-shadow: var(--shadow-md);
  grid-area: subject;
}

.level {
  padding: 4px 12px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-full);
  margin: 0;
  background: var(--background-color-0);
  color: var(--foreground-color-1);
  font-size: 0.85rem;
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
  padding: 16px 20px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-0);
  font-size: 1.1rem;
}

.kanji,
.radical,
.vocabulary {
  padding: 6px 14px;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--radius-full);
  margin: 6px;
  transition: var(--transition-fast);
}

.radical {
  border-color: var(--radical-color);
  background: linear-gradient(
    135deg,
    var(--radical-color-transparent) 0%,
    transparent 100%
  );
}

.radical:hover {
  box-shadow: var(--shadow-glow) var(--radical-color-glow);
}

.kanji {
  border-color: var(--kanji-color);
  background: linear-gradient(
    135deg,
    var(--kanji-color-transparent) 0%,
    transparent 100%
  );
}

.kanji:hover {
  box-shadow: var(--shadow-glow) var(--kanji-color-glow);
}

.vocabulary {
  border-color: var(--vocabulary-color);
  background: linear-gradient(
    135deg,
    var(--vocabulary-color-transparent) 0%,
    transparent 100%
  );
}

.vocabulary:hover {
  box-shadow: var(--shadow-glow) var(--vocabulary-color-glow);
}

@media (width <= 768px) {
  .subject-overview {
    padding: 16px;
  }

  .characters {
    height: auto;
    padding: 16px 0;
  }

  .meaning-reading {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    font-size: 1rem;
  }

  .kanji,
  .radical,
  .vocabulary {
    padding: 4px 12px;
    margin: 4px;
  }
}

@media (width <= 480px) {
  .subject-overview {
    padding: 12px;
  }

  .meaning-reading {
    padding: 10px 12px;
    font-size: 0.95rem;
  }
}
</style>
