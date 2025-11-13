<script setup lang="ts">
import { computed } from "vue";

import { BaseButton, BaseHeader, BaseSwitch } from "../components";
import { useReviewSelection } from "../composables";
import { bookIconPath } from "../icon-paths";
import type { User } from "../types";

const { user } = defineProps<{
  user: User;
}>();

const {
  levels,
  types,
  selectedLevels,
  selectedTypes,
  shouldShuffle,
  isLoading: isReviewSelectionLoading,
  onStartReview,
} = await useReviewSelection(user.level);

const canReview = computed(
  () => selectedLevels.value.length > 0 && selectedTypes.value.length > 0,
);
</script>

<template>
  <div v-if="isReviewSelectionLoading">Loading...</div>
  <div v-else class="review-selection">
    <base-header />
    <div class="user-section section">
      <p class="text">
        Welcome <b>{{ user.username }}</b
        >! You're <b>level {{ user.level }}</b> already.
        {{ 60 - user.level }} levels to go until mastery!
      </p>
    </div>
    <div class="levels-section section">
      <p class="text">Select the levels you wish to review:</p>
      <div class="list-container">
        <div v-for="level in levels" :key="level" class="list-item">
          <input
            :id="String(level)"
            v-model="selectedLevels"
            type="checkbox"
            :value="level"
          />
          <label :for="String(level)">{{ level }}</label>
        </div>
      </div>
    </div>
    <div class="types-section section">
      <p class="text">Select the subject types you wish to review:</p>
      <div class="list-container">
        <div v-for="type in types" :key="type" :class="`list-item ${type}`">
          <input
            :id="type"
            v-model="selectedTypes"
            type="checkbox"
            :value="type"
          />
          <label :for="type">{{ type }}</label>
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
.review-selection {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  grid-template: "header header" 1fr "user-info user-info" 1fr "level-selection level-selection" 8fr "type-selection shuffle-selection" 4fr "navigation navigation" 1fr / 1fr 1fr;
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
