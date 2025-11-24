<script setup lang="ts">
import { computed } from "vue";

import {
  BaseButton,
  BaseCheckbox,
  BaseHeader,
  BaseSwitch,
} from "../components";
import { user, useReviewSelection } from "../composables";
import { bookIconPath } from "../icon-paths";

const {
  levels,
  types,
  selectedLevels,
  selectedTypes,
  shouldShuffle,
  isQuizMode,
  isLoading,
  onStartReview,
} = await useReviewSelection(user.value!.level);

const canReview = computed(
  () => selectedLevels.value.length > 0 && selectedTypes.value.length > 0,
);
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="dashboard-page">
    <base-header />
    <div class="user-section section">
      <p class="text">
        Welcome, <b>{{ user?.username }}</b
        >! You're <b>level {{ user?.level }}</b> already.
        {{ 60 - (user?.level || 0) }} levels to go until mastery!
      </p>
    </div>
    <div class="levels-section section">
      <p class="text">Select the levels you wish to review:</p>
      <div class="list-container">
        <div v-for="level in levels" :key="level" class="list-item">
          <base-checkbox v-model="selectedLevels" :value="level">
            {{ level }}
          </base-checkbox>
        </div>
      </div>
    </div>
    <div class="types-section section">
      <p class="text">Select the subject types you wish to review:</p>
      <div class="list-container">
        <div v-for="type in types" :key="type" :class="`list-item ${type}`">
          <base-checkbox v-model="selectedTypes" :value="type">
            {{ type }}
          </base-checkbox>
        </div>
      </div>
    </div>
    <div class="shuffle-section section">
      <p class="text">Toggle to shuffle subject review order:</p>
      <div class="list-container">
        <div class="list-item">
          <base-switch
            v-model="shouldShuffle"
            off-label="Ordered"
            on-label="Shuffled"
          />
        </div>
      </div>
    </div>
    <div class="mode-section section">
      <p class="text">
        Toggle to switch between study (<i>passive</i>) mode and quiz
        (<i>active</i>) mode:
      </p>
      <div class="list-container">
        <div class="list-item">
          <base-switch
            v-model="isQuizMode"
            off-label="Study mode"
            on-label="Quiz mode"
          />
        </div>
      </div>
    </div>
    <div class="navigation-section section">
      <base-button
        title="Start a fresh review session"
        :on-click="onStartReview"
        :left-icon-path="bookIconPath"
        :disabled="!canReview"
      >
        Start review
      </base-button>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  grid-template:
    "header header header" 1fr
    "user-info user-info user-info" 1fr
    "level-selection level-selection level-selection" 8fr
    "type-selection shuffle-selection mode-selection" 4fr
    "navigation navigation navigation" 1fr / 1fr 1fr 1fr;
}

.section {
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
}

.text {
  margin: 0;
}

.user-section {
  grid-area: user-info;
}

.levels-section {
  grid-area: level-selection;
}

.types-section {
  grid-area: type-selection;
}

.shuffle-section {
  grid-area: shuffle-selection;
}

.mode-section {
  grid-area: mode-selection;
}

.navigation-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  grid-area: navigation;
}

.list-container {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  padding-block-start: 20px;
}

.list-item {
  display: flex;
  width: fit-content;
  min-width: 48px;
  padding: 8px;
  border: 1px solid var(--background-color-3);
  border-radius: 12px;
  background-color: var(--background-color-2);
  gap: 8px;
}

.kanji {
  border: 1px solid var(--kanji-color);
  background-color: var(--kanji-color-transparent);
}

.radical {
  border: 1px solid var(--radical-color);
  background-color: var(--radical-color-transparent);
}

.vocabulary {
  border: 1px solid var(--vocabulary-color);
  background-color: var(--vocabulary-color-transparent);
}
</style>
