<script setup lang="ts">
import { computed } from "vue";

import {
  BaseImage,
  QuizDialog,
  QuizSummary,
  ReviewHeader,
  ReviewNavigation,
} from "../components";
import { useQuizNavigation } from "../composables";
import type { Kanji, Radical, Vocabulary } from "../types";
import { getRadicalImageUrl } from "../utils";

const {
  inputValue,
  validationResult,
  acceptedAnswers,
  subject,
  subjectType,
  quizType,
  quizReport,
  dialogRef,
  onInput,
  onNavigate,
} = useQuizNavigation();

const url = computed(() =>
  subjectType.value === "radical" && subject.value
    ? getRadicalImageUrl((subject.value as Radical).character_images!)
    : null,
);
const characters = computed(() =>
  subjectType.value !== "radical" && subject.value
    ? (subject.value as Kanji | Vocabulary).characters
    : null,
);
</script>

<template>
  <div class="quiz-page">
    <quiz-dialog ref="dialogRef">
      <template #header>Review Summary</template>
      <quiz-summary :quiz-report="quizReport" />
    </quiz-dialog>
    <review-header :type="subjectType" />
    <div class="subject-section">
      <base-image
        v-if="subjectType === 'radical' && url"
        :key="url!"
        :width="'192px'"
        :height="'192px'"
        :url="url!"
      />
      <p v-else :class="subjectType" class="characters japanese">
        {{ characters }}
      </p>
      <p
        class="answers"
        :class="`${validationResult} ${subjectType} ${quizType === 'reading' ? 'japanese' : ''}`"
      >
        {{ acceptedAnswers.join(", ") }}
      </p>
    </div>
    <div class="input-section">
      <input
        ref="user-input"
        class="input"
        :class="`${validationResult} ${quizType === 'reading' ? 'japanese' : ''}`"
        :value="inputValue"
        autofocus
        :placeholder="`Type in the ${quizType}...`"
        :disabled="validationResult.includes('correct')"
        type="text"
        @input="onInput"
      />
    </div>
    <review-navigation @next-click="onNavigate" />
  </div>
</template>

<style scoped>
.quiz-page {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  grid-template:
    "header" 1fr
    "subject" 12fr
    "input" 1fr
    "navigation" 1fr / 1fr;
}

.subject-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  grid-area: subject;
}

.characters {
  margin: 0;
}

.characters.kanji {
  font-size: 12rem;
}

.characters.vocabulary {
  font-size: 2rem;
}

.answers {
  border-radius: 16px;
  font-size: 1.2rem;
  opacity: 0;
  padding-inline: 8px;
}

.answers.radical {
  border: 1px solid var(--radical-color);
  background-color: var(--radical-color-transparent);
}

.answers.kanji {
  border: 1px solid var(--kanji-color);
  background-color: var(--kanji-color-transparent);
}

.answers.vocabulary {
  border: 1px solid var(--vocabulary-color);
  background-color: var(--vocabulary-color-transparent);
}

.answers.incorrect {
  opacity: 1;
}

.input {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  color: var(--foreground-color);
  font-size: 1.8rem;
  grid-area: input;
  text-align: center;
  transition: 0.25s;
}

.input.correct {
  border-color: var(--success-color);
  background-color: var(--success-color-transparent);
}

.input.incorrect {
  border-color: var(--error-color);
  background-color: var(--error-color-transparent);
}

.input.invalid {
  animation: shake 0.25s ease-in-out;
}

.input:focus {
  outline: none;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-5px);
  }

  40% {
    transform: translateX(5px);
  }

  60% {
    transform: translateX(-5px);
  }

  80% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
