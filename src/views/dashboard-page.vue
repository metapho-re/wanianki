<script setup lang="ts">
import { computed } from "vue";

import {
  BaseButton,
  BaseHeader,
  BaseSpinner,
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

const canReview = computed<boolean>(() => selectedSubjects.value.length > 0);
</script>

<template>
  <div v-if="isLoading" class="loading-page">
    <base-spinner width="96px" height="96px" />
  </div>
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
.loading-page {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.dashboard-page {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 16px;
  grid-template:
    "header header header" auto
    "subject-selection subject-selection subject-selection" 1fr
    "control control control" auto / 1fr 1fr 1fr;
}

.section {
  padding: 16px 20px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    var(--background-color-1) 0%,
    var(--background-color-transparent) 100%
  );
  box-shadow: var(--shadow-md);
}

.text {
  margin: 0;
  color: var(--foreground-color-1);
  font-size: 0.9rem;
}

.text b {
  color: var(--primary-color);
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
  padding-block: 12px;
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
