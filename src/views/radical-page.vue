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
import type { Radical } from "../types";
import {
  getParsedText,
  getRadicalImageUrl,
  getSubjectMeanings,
} from "../utils";

const { subject: radical, onNavigate } = useStudyNavigation<Radical>(
  subjectCollection.radical,
);

const meanings = computed<ReturnType<typeof getSubjectMeanings> | null>(() =>
  radical.value ? getSubjectMeanings(radical.value) : null,
);
const url = computed<string | undefined>(() =>
  radical.value
    ? getRadicalImageUrl(radical.value.character_images)
    : undefined,
);
</script>

<template>
  <review-grid v-if="radical">
    <review-header type="radical" />
    <subject-overview
      type="radical"
      :level="radical.level"
      :meaning="meanings?.primary ?? ''"
    >
      <radical-view
        :key="url"
        :characters="radical.characters"
        :url="url"
        :size="'clamp(72px, 24vw, 192px)'"
      />
    </subject-overview>
    <subject-details>
      <base-section title="Name">
        <div class="meaning-list">
          <p class="meaning">
            <span class="dimmed">Primary</span><br />
            {{ meanings?.primary }}
          </p>
          <p v-if="meanings?.secondary" class="meaning">
            <span class="dimmed">Alternative</span><br />
            {{ meanings?.secondary }}
          </p>
        </div>
        <p>
          <span class="dimmed">Mnemonic</span><br />
          <highlighted-text
            :parsed-text="getParsedText(radical.meaning_mnemonic)"
          />
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
.meaning-list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.meaning {
  margin-block-end: 0;
}

@media (width <= 768px) {
  .meaning-list {
    gap: 20px;
  }
}

@media (width <= 480px) {
  .meaning-list {
    gap: 12px;
  }
}
</style>
