<script setup lang="ts">
import { computed } from "vue";

import {
  QuizDialog,
  QuizSummary,
  RadicalView,
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

const url = computed<string | null>(() =>
  subjectType.value === "radical" && subject.value
    ? getRadicalImageUrl((subject.value as Radical).character_images!)
    : null,
);
const characters = computed<string | null>(() =>
  subject.value
    ? (subject.value as Kanji | Radical | Vocabulary).characters
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
      <span class="subject-type-badge" :class="subjectType">{{
        `${subjectType} - ${quizType}`
      }}</span>
      <radical-view
        v-if="subjectType === 'radical' && url"
        :key="url"
        :characters="characters"
        :url="url"
        :size="'192px'"
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
  gap: 16px;
  grid-template:
    "header" auto
    "subject" 1fr
    "input" auto
    "navigation" auto / 1fr;
}

.subject-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    var(--background-color-1) 0%,
    var(--background-color-transparent) 100%
  );
  box-shadow: var(--shadow-md);
  grid-area: subject;
}

.subject-type-badge {
  position: absolute;
  top: 12px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  color: var(--foreground-color-0);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
}

.subject-type-badge.radical {
  border: 1px solid var(--radical-color);
  background: linear-gradient(
    135deg,
    var(--radical-color-transparent) 0%,
    transparent 100%
  );
  box-shadow: var(--shadow-glow) var(--radical-color-glow);
}

.subject-type-badge.kanji {
  border: 1px solid var(--kanji-color);
  background: linear-gradient(
    135deg,
    var(--kanji-color-transparent) 0%,
    transparent 100%
  );
  box-shadow: var(--shadow-glow) var(--kanji-color-glow);
}

.subject-type-badge.vocabulary {
  border: 1px solid var(--vocabulary-color);
  background: linear-gradient(
    135deg,
    var(--vocabulary-color-transparent) 0%,
    transparent 100%
  );
  box-shadow: var(--shadow-glow) var(--vocabulary-color-glow);
}

.characters {
  margin: 0;
  text-shadow: 0 4px 20px var(--text-shadow-color);
}

.characters.kanji {
  font-size: 10rem;
}

.characters.vocabulary {
  font-size: 6rem;
}

.answers {
  padding: 4px 16px;
  border-radius: var(--radius-full);
  font-size: 1.1rem;
  opacity: 0;
}

.answers.radical {
  border: 1px solid var(--radical-color);
  background: linear-gradient(
    135deg,
    var(--radical-color-transparent) 0%,
    transparent 100%
  );
  box-shadow: var(--shadow-glow) var(--radical-color-glow);
}

.answers.kanji {
  border: 1px solid var(--kanji-color);
  background: linear-gradient(
    135deg,
    var(--kanji-color-transparent) 0%,
    transparent 100%
  );
  box-shadow: var(--shadow-glow) var(--kanji-color-glow);
}

.answers.vocabulary {
  border: 1px solid var(--vocabulary-color);
  background: linear-gradient(
    135deg,
    var(--vocabulary-color-transparent) 0%,
    transparent 100%
  );
  box-shadow: var(--shadow-glow) var(--vocabulary-color-glow);
}

.answers.incorrect {
  opacity: 1;
  transition: var(--transition-base);
}

.input-section {
  grid-area: input;
}

.input {
  width: 100%;
  height: 3.2rem;
  padding: 0;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background-color: var(--background-color-0);
  box-shadow: var(--shadow-sm);
  color: var(--foreground-color-0);
  font-size: 1.4rem;
  text-align: center;
  transition: var(--transition-base);
}

.input:focus {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow) var(--primary-color-glow);
}

.input.correct {
  border-color: var(--success-color);
  background: linear-gradient(
    180deg,
    var(--success-color-transparent) 0%,
    var(--success-color-subtle) 100%
  );
  box-shadow: var(--shadow-glow) var(--success-color-glow);
  transition: var(--transition-base);
}

.input.incorrect {
  border-color: var(--error-color);
  background: linear-gradient(
    180deg,
    var(--error-color-transparent) 0%,
    var(--error-color-subtle) 100%
  );
  box-shadow: var(--shadow-glow) var(--error-color-glow);
  transition: var(--transition-base);
}

.input.invalid {
  animation: shake 0.25s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-4px);
  }

  40%,
  80% {
    transform: translateX(4px);
  }
}
</style>
