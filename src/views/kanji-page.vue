<script setup lang="ts">
import { computed } from "vue";

import {
  BaseSection,
  HighlightedText,
  RadicalView,
  ReviewGrid,
  ReviewHeader,
  ReviewNavigation,
  SubjectDetails,
  SubjectOverview,
} from "../components";
import { subjectCollection, useStudyNavigation } from "../composables";
import type { Kanji } from "../types";
import {
  getKanjiReadings,
  getParsedText,
  getPrimaryKanjiReading,
  getRadicalCombination,
  getSubjectMeanings,
} from "../utils";

const { subject: kanji, onNavigate } = useStudyNavigation<Kanji>(
  subjectCollection.kanji,
);

const meanings = computed<ReturnType<typeof getSubjectMeanings> | null>(() =>
  kanji.value ? getSubjectMeanings(kanji.value) : null,
);
const readings = computed<ReturnType<typeof getKanjiReadings> | null>(() =>
  kanji.value ? getKanjiReadings(kanji.value) : null,
);
const primaryKanjiReading = computed<ReturnType<
  typeof getPrimaryKanjiReading
> | null>(() =>
  kanji.value ? getPrimaryKanjiReading(kanji.value.readings) : null,
);
const radicals = computed<ReturnType<typeof getRadicalCombination> | null>(
  () => (kanji.value ? getRadicalCombination(kanji.value) : null),
);
</script>

<template>
  <review-grid v-if="kanji">
    <review-header type="kanji" />
    <subject-overview
      type="kanji"
      :level="kanji.level"
      :meaning="meanings!.primary"
      :reading="primaryKanjiReading!.reading"
      :reading-type="primaryKanjiReading!.type"
    >
      <p class="kanji-character japanese">{{ kanji.characters }}</p>
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
          <span class="dimmed">Mnemonic</span><br />
          <highlighted-text
            :parsed-text="getParsedText(kanji.meaning_mnemonic)"
          />
        </p>
        <p v-if="kanji.meaning_hint">
          <span class="dimmed">Hint</span><br />
          <i>
            <highlighted-text :parsed-text="getParsedText(kanji.meaning_hint)"
          /></i>
        </p>
      </base-section>
      <base-section title="Radical combination">
        <div class="radical-list">
          <div
            v-for="radical in radicals"
            :key="radical.slug"
            class="radical-box"
          >
            <radical-view
              :characters="radical.characters"
              :url="radical.characterImageUrl"
              :size="'32px'"
            />
            <p class="radical-text">{{ radical.meaning }}</p>
          </div>
        </div>
      </base-section>
      <base-section title="Reading">
        <div class="reading-list">
          <div class="reading-box">
            <p
              class="reading-text"
              :class="readings!.onyomi?.primary ? 'primary' : ''"
            >
              <span class="dimmed">On'yomi</span>
              <br />
              <span v-if="readings!.onyomi" class="japanese">
                {{ readings!.onyomi.reading }}
              </span>
              <span v-else>None</span>
            </p>
          </div>
          <div class="reading-box">
            <p
              class="reading-text"
              :class="readings!.kunyomi?.primary ? 'primary' : ''"
            >
              <span class="dimmed">Kun'yomi</span>
              <br />
              <span v-if="readings!.kunyomi" class="japanese">
                {{ readings!.kunyomi.reading }}
              </span>
              <span v-else>None</span>
            </p>
          </div>
          <div class="reading-box">
            <p
              class="reading-text"
              :class="readings!.nanori?.primary ? 'primary' : ''"
            >
              <span class="dimmed">Nanori</span>
              <br />
              <span v-if="readings!.nanori" class="japanese">
                {{ readings!.nanori.reading }}
              </span>
              <span v-else>None</span>
            </p>
          </div>
        </div>
        <p>
          <span class="dimmed">Mnemonic</span><br />
          <highlighted-text
            :parsed-text="getParsedText(kanji.reading_mnemonic)"
          />
        </p>
        <p v-if="kanji.reading_hint">
          <span class="dimmed">Hint</span><br />
          <i>
            <highlighted-text :parsed-text="getParsedText(kanji.reading_hint)"
          /></i>
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
.kanji-character {
  margin: 0;
  font-size: 10rem;
  text-shadow: 0 4px 30px var(--text-shadow-color);
}

.meaning-list,
.radical-list,
.reading-list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.meaning {
  margin-block-end: 0;
}

.radical-list,
.reading-list {
  margin-block: 16px;
}

.radical-box,
.reading-box {
  display: flex;
  min-width: 80px;
  height: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-1);
  text-align: center;
  transition: var(--transition-fast);
}

.radical-box:hover,
.reading-box:hover {
  border-color: var(--primary-color-transparent);
  box-shadow: var(--shadow-sm);
}

.radical-text,
.reading-text {
  margin: 0;
  color: var(--foreground-color-1);
  font-size: 0.9rem;
}

@media (width <= 768px) {
  .kanji-character {
    font-size: clamp(4rem, 20vw, 8rem);
  }

  .meaning-list,
  .radical-list,
  .reading-list {
    gap: 20px;
  }

  .radical-box,
  .reading-box {
    min-width: 70px;
    height: 60px;
    padding: 8px;
  }
}

@media (width <= 480px) {
  .kanji-character {
    font-size: clamp(3rem, 18vw, 5rem);
  }

  .meaning-list,
  .radical-list,
  .reading-list {
    gap: 12px;
  }

  .radical-box,
  .reading-box {
    min-width: 60px;
    height: 55px;
    padding: 6px;
  }

  .radical-text,
  .reading-text {
    font-size: 0.8rem;
  }
}
</style>
