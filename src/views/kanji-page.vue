<script setup lang="ts">
import { computed } from "vue";

import {
  BaseHeader,
  BaseImage,
  BaseSection,
  HighlightedText,
  ReviewGrid,
  ReviewNavigation,
  SubjectDetails,
  SubjectOverview,
} from "../components";
import { kanjiCollection, useSubjectNavigation } from "../composables";
import type { Kanji } from "../types";
import {
  getKanjiReadings,
  getParsedText,
  getPrimaryKanjiReading,
  getRadicalCombination,
  getSubjectMeanings,
} from "../utils";

const { subject: kanji, onNavigate } =
  useSubjectNavigation<Kanji>(kanjiCollection);

const meanings = computed(() =>
  kanji.value ? getSubjectMeanings(kanji.value) : null,
);
const readings = computed(() =>
  kanji.value ? getKanjiReadings(kanji?.value) : null,
);
const primaryKanjiReading = computed(() =>
  kanji.value ? getPrimaryKanjiReading(readings.value!) : null,
);
const radicals = computed(() =>
  kanji.value ? getRadicalCombination(kanji.value) : null,
);
</script>

<template>
  <review-grid v-if="kanji">
    <base-header />
    <subject-overview
      type="kanji"
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
            <base-image
              :width="'32px'"
              :height="'32px'"
              :url="radical.characterImageUrl"
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
  font-size: 12rem;
}

.meaning-list,
.radical-list,
.reading-list {
  display: flex;
  gap: 60px;
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
  text-align: center;
}

.radical-text,
.reading-text {
  margin: 0;
}
</style>
