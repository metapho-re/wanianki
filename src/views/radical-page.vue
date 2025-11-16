<script setup lang="ts">
import { computed } from "vue";

import {
  BaseImage,
  BaseSection,
  HighlightedText,
  ReviewGrid,
  ReviewHeader,
  ReviewNavigation,
  SubjectDetails,
  SubjectOverview,
} from "../components";
import { radicalCollection, useSubjectNavigation } from "../composables";
import type { Radical } from "../types";
import {
  getParsedText,
  getRadicalImageUrl,
  getSubjectMeanings,
} from "../utils";

const { subject: radical, onNavigate } =
  useSubjectNavigation<Radical>(radicalCollection);

const meanings = computed(() =>
  radical.value ? getSubjectMeanings(radical.value) : null,
);
const url = computed(() =>
  radical.value ? getRadicalImageUrl(radical.value.character_images!) : null,
);
</script>

<template>
  <review-grid v-if="radical">
    <review-header type="radical" />
    <subject-overview
      type="radical"
      :level="radical.level"
      :meaning="meanings!.primary"
    >
      <base-image :key="url!" :width="'192px'" :height="'192px'" :url="url!" />
    </subject-overview>
    <subject-details>
      <base-section title="Name">
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
  gap: 60px;
}

.meaning {
  margin-block-end: 0;
}
</style>
