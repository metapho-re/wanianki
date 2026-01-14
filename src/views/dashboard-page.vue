<script setup lang="ts">
import { computed } from "vue";

import {
  BaseButton,
  BaseHeader,
  BaseSwitch,
  SubjectSelector,
} from "../components";
import { user, useReviewSelection } from "../composables";
import { bookIconPath } from "../icon-paths";

const {
  selectedSubjectIds,
  selectedSubjects,
  shouldShuffle,
  isQuizMode,
  isLoading,
  addSubjectId,
  deleteSubjectId,
  clearSubjectIds,
  onStartReview,
} = await useReviewSelection(user.value!.level);

const canReview = computed(() => selectedSubjects.value.length > 0);
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="dashboard-page">
    <base-header>
      <p class="text">
        Logged in as <b>{{ user?.username }}</b> (level {{ user?.level }})
      </p>
    </base-header>
    <div class="subject-selection-section">
      <subject-selector
        :level="user!.level"
        :selected-subject-ids="selectedSubjectIds"
        :selected-subjects="selectedSubjects"
        :add-subject-id="addSubjectId"
        :delete-subject-id="deleteSubjectId"
        :clear-subject-ids="clearSubjectIds"
      />
    </div>
    <div class="control-section section">
      <base-switch
        v-model="shouldShuffle"
        off-label="Ordered"
        on-label="Shuffled"
      />
      <base-button
        title="Start a fresh review session"
        :left-icon-path="bookIconPath"
        :disabled="!canReview"
        @click="onStartReview"
      >
        Start review
      </base-button>
      <base-switch
        v-model="isQuizMode"
        off-label="Study mode"
        on-label="Quiz mode"
      />
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
    "subject-selection subject-selection subject-selection" 14fr
    "control control control" 1fr / 1fr 1fr 1fr;
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

.subject-selection-section {
  overflow: hidden;
  grid-area: subject-selection;
}

.control-section {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-area: control;
  padding-block: 0;
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
