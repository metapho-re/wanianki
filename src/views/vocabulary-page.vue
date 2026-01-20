<script setup lang="ts">
import { computed } from "vue";

import {
  BaseSection,
  HighlightedText,
  ReviewGrid,
  ReviewHeader,
  ReviewNavigation,
  SubjectDetails,
  SubjectOverview,
} from "../components";
import { subjectCollection, useStudyNavigation } from "../composables";
import type { Vocabulary } from "../types";
import {
  getParsedText,
  getSubjectMeanings,
  getVocabularyReadings,
} from "../utils";

const { subject: vocabulary, onNavigate } = useStudyNavigation<Vocabulary>(
  subjectCollection.vocabulary,
);

const meanings = computed<ReturnType<typeof getSubjectMeanings> | null>(() =>
  vocabulary.value ? getSubjectMeanings(vocabulary.value) : null,
);
const readings = computed<ReturnType<typeof getVocabularyReadings> | null>(
  () => (vocabulary.value ? getVocabularyReadings(vocabulary.value) : null),
);
const wordType = computed<string | null>(() =>
  vocabulary.value ? vocabulary.value.parts_of_speech.join(", ") : null,
);
</script>

<template>
  <review-grid v-if="vocabulary">
    <review-header type="vocabulary" />
    <subject-overview
      type="vocabulary"
      :level="vocabulary.level"
      :meaning="meanings!.primary"
      :reading="readings!.primary"
    >
      <p class="vocabulary-characters japanese">{{ vocabulary.characters }}</p>
    </subject-overview>
    <subject-details>
      <base-section title="Meaning">
        <div class="meaning-list">
          <p class="meaning">
            <span class="dimmed">Primary</span><br />
            {{ meanings!.primary }}
          </p>
          <p v-if="meanings!.secondary" class="meaning">
            <span class="dimmed">Alternative</span><br />
            {{ meanings!.secondary }}
          </p>
        </div>
        <p>
          <span class="dimmed">Word type</span><br />
          {{ wordType }}
        </p>
        <p>
          <span class="dimmed">Explanation</span><br />
          <highlighted-text
            :parsed-text="getParsedText(vocabulary.meaning_mnemonic)"
          />
        </p>
      </base-section>
      <base-section title="Reading">
        <p class="japanese">
          <b>{{ readings?.primary }}</b>
          <span v-if="readings?.secondary"> ({{ readings?.secondary }})</span>
        </p>
        <p>
          <span class="dimmed">Explanation</span><br />
          <highlighted-text
            :parsed-text="getParsedText(vocabulary.reading_mnemonic)"
          />
        </p>
      </base-section>
      <base-section title="Context">
        <p
          v-for="contextSentence in vocabulary.context_sentences"
          :key="contextSentence.en"
        >
          <span class="japanese">{{ contextSentence.ja }}</span
          ><br />
          <span>{{ contextSentence.en }}</span>
        </p>
      </base-section>
    </subject-details>
    <review-navigation
      @previous-click="onNavigate('previous')()"
      @next-click="onNavigate('next')()"
    />
  </review-grid>
</template>

<style scoped>
.vocabulary-characters {
  font-size: 4rem;
  text-shadow: 0 4px 30px var(--text-shadow-color);
}

.meaning-list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.meaning {
  margin-block-end: 0;
}

@media (width <= 768px) {
  .vocabulary-characters {
    font-size: clamp(2rem, 10vw, 3.5rem);
  }

  .meaning-list {
    gap: 20px;
  }
}

@media (width <= 480px) {
  .vocabulary-characters {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }

  .meaning-list {
    gap: 12px;
  }
}
</style>
