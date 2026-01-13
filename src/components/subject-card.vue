<script setup lang="ts">
import type { Kanji, Radical, ReviewSubject, Vocabulary } from "../types";
import {
  getPrimaryKanjiReading,
  getRadicalImageUrl,
  getSubjectMeanings,
  getVocabularyReadings,
} from "../utils";

import RadicalView from "./radical-view.vue";

const { subject } = defineProps<{
  subject: ReviewSubject;
}>();

const meaning = getSubjectMeanings(subject.data).primary;

const kanjiReading =
  subject.object === "kanji"
    ? getPrimaryKanjiReading((subject.data as Kanji).readings).reading
    : "";

const vocabularyReading =
  subject.object === "vocabulary"
    ? getVocabularyReadings(subject.data as Vocabulary).primary
    : "";

const url =
  subject.object === "radical"
    ? getRadicalImageUrl((subject.data as Radical).character_images)
    : null;
</script>

<template>
  <div class="subject-card">
    <div class="wrapper" :class="subject.object">
      <radical-view
        v-if="subject.object === 'radical'"
        :characters="subject.data.characters"
        :url="url!"
        :size="'36px'"
      />
      <p v-else class="japanese characters">
        {{ subject.data.characters }}
      </p>
    </div>
    <p v-if="subject.object !== 'radical'" class="japanese reading">
      {{ kanjiReading || vocabularyReading }}
    </p>
    <p class="meaning">
      {{ meaning }}
    </p>
  </div>
</template>

<style scoped>
.subject-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
}

.wrapper {
  padding: 8px;
  border-radius: 8px;
  margin-block-end: 8px;
}

.wrapper.radical {
  background-color: var(--radical-color-transparent);
}

.wrapper.kanji {
  background-color: var(--kanji-color-transparent);
}

.wrapper.vocabulary {
  background-color: var(--vocabulary-color-transparent);
}

.characters {
  margin: 0;
}

.kanji .characters {
  font-size: 36px;
  line-height: 36px;
}

.vocabulary .characters {
  font-size: 24px;
  line-height: 24px;
}

.reading,
.meaning {
  margin: 0;
  font-size: 0.8rem;
}
</style>
