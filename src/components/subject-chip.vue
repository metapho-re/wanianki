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
    : null;
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
      :url="url!"
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
  border-width: 2px;
  border-style: solid;
  border-radius: 16px;
  cursor: pointer;
  gap: 8px;
  padding-inline: 8px;
}

.subject-chip.radical {
  border-color: var(--radical-color);
}

.subject-chip.kanji {
  border-color: var(--kanji-color);
}

.subject-chip.vocabulary {
  border-color: var(--vocabulary-color);
}

.characters {
  margin: 0;
  font-size: 18px;
  line-height: 18px;
}

.level {
  color: var(--dimmed-color);
  font-size: 0.8rem;
}
</style>
