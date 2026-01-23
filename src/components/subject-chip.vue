<script setup lang="ts">
import type { Radical, ReviewSubject } from "../types";
import { getRadicalImageUrl } from "../utils";

import RadicalView from "./radical-view.vue";

const { subject } = defineProps<{
  subject: ReviewSubject;
}>();

const url =
  subject.object === "radical"
    ? getRadicalImageUrl((subject.data as Radical).character_images)
    : undefined;
</script>

<template>
  <div
    title="Click to remove this subject"
    class="subject-chip"
    :class="subject.object"
  >
    <radical-view
      v-if="subject.object === 'radical'"
      :characters="subject.data.characters"
      :url="url"
      size="18px"
    />
    <p v-else class="japanese characters">
      {{ subject.data.characters }}
    </p>
    <p class="level">Lv. {{ subject.data.level }}</p>
  </div>
</template>

<style scoped>
.subject-chip {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--radius-full);
  cursor: pointer;
  gap: 8px;
  transition: var(--transition-fast);
}

.subject-chip.radical {
  border-color: var(--radical-color);
  background: linear-gradient(
    135deg,
    var(--radical-color-transparent) 0%,
    transparent 100%
  );
}

.subject-chip.kanji {
  border-color: var(--kanji-color);
  background: linear-gradient(
    135deg,
    var(--kanji-color-transparent) 0%,
    transparent 100%
  );
}

.subject-chip.vocabulary {
  border-color: var(--vocabulary-color);
  background: linear-gradient(
    135deg,
    var(--vocabulary-color-transparent) 0%,
    transparent 100%
  );
}

.subject-chip.radical:hover {
  box-shadow: var(--shadow-glow) var(--radical-color-glow);
}

.subject-chip.kanji:hover {
  box-shadow: var(--shadow-glow) var(--kanji-color-glow);
}

.subject-chip.vocabulary:hover {
  box-shadow: var(--shadow-glow) var(--vocabulary-color-glow);
}

.characters {
  margin: 0;
  font-size: 16px;
  line-height: 16px;
}

.level {
  margin: 0;
  color: var(--dimmed-color);
  font-size: 0.75rem;
}
</style>
