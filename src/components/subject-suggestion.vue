<script setup lang="ts">
import type { Kanji, ReviewSubject, Vocabulary } from "../types";
import {
  capitalize,
  getKanjiReadings,
  getSubjectMeanings,
  getVocabularyReadings,
} from "../utils";

import SubjectView from "./subject-view.vue";

const { subject } = defineProps<{
  subject: ReviewSubject;
}>();

const meanings = Object.values(getSubjectMeanings(subject.data))
  .filter(Boolean)
  .join(", ");

const kanjiReadings =
  subject.object === "kanji"
    ? Object.values(getKanjiReadings(subject.data as Kanji))
        .map((reading) => reading?.reading)
        .filter(Boolean)
        .join(", ")
    : "";

const vocabularyReadings =
  subject.object === "vocabulary"
    ? Object.values(getVocabularyReadings(subject.data as Vocabulary))
        .filter(Boolean)
        .join(", ")
    : "";
</script>

<template>
  <div class="subject-suggestion">
    <subject-view
      :subject="subject"
      :primary-size="'20px'"
      :secondary-size="'20px'"
    />
    <span>&nbsp;•&nbsp;</span>
    <span>{{ capitalize(subject.object) }}</span>
    <span>&nbsp;•&nbsp;</span>
    <span>Lv {{ subject.data.level }}</span>
    <span v-if="subject.object !== 'radical'">&nbsp;•&nbsp;</span>
    <span v-if="subject.object !== 'radical'" class="japanese">
      {{ kanjiReadings || vocabularyReadings }}
    </span>
    <span>&nbsp;•&nbsp;</span>
    <span>{{ meanings }}</span>
  </div>
</template>

<style scoped>
.subject-suggestion {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 16px;
  color: var(--foreground-color-1);
  font-size: 0.85rem;
}
</style>
