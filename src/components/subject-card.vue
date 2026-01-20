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
  padding: 14px 10px;
}

.wrapper {
  padding: 8px 10px;
  border-radius: var(--radius-md);
  margin-block-end: 8px;
  transition: var(--transition-fast);
}

.wrapper.radical {
  border: 1px solid transparent;
  background: linear-gradient(
    135deg,
    var(--radical-color-transparent) 0%,
    transparent 100%
  );
}

.wrapper.kanji {
  border: 1px solid transparent;
  background: linear-gradient(
    135deg,
    var(--kanji-color-transparent) 0%,
    transparent 100%
  );
}

.wrapper.vocabulary {
  border: 1px solid transparent;
  background: linear-gradient(
    135deg,
    var(--vocabulary-color-transparent) 0%,
    transparent 100%
  );
}

.subject-card:hover .wrapper.radical {
  border-color: var(--radical-color);
  box-shadow: var(--shadow-glow) var(--radical-color-glow);
}

.subject-card:hover .wrapper.kanji {
  border-color: var(--kanji-color);
  box-shadow: var(--shadow-glow) var(--kanji-color-glow);
}

.subject-card:hover .wrapper.vocabulary {
  border-color: var(--vocabulary-color);
  box-shadow: var(--shadow-glow) var(--vocabulary-color-glow);
}

.characters {
  margin: 0;
  font-size: 32px;
  line-height: 32px;
}

.vocabulary .characters {
  font-size: 22px;
  line-height: 22px;
}

.reading {
  margin: 0;
  color: var(--foreground-color-1);
  font-size: 0.75rem;
}

.meaning {
  margin: 0;
  color: var(--dimmed-color);
  font-size: 0.75rem;
}

@media (width <= 480px) {
  .subject-card {
    padding: 10px 8px;
  }

  .wrapper {
    padding: 6px 8px;
    margin-block-end: 6px;
  }

  .characters {
    font-size: 28px;
    line-height: 28px;
  }

  .vocabulary .characters {
    font-size: 18px;
    line-height: 18px;
  }

  .reading,
  .meaning {
    font-size: 0.7rem;
  }
}
</style>
