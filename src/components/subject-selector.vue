<script setup lang="ts">
import { useSubjectSelection } from "../composables";
import type { ReviewSubject, SubjectType } from "../types";
import { capitalize } from "../utils";

import BaseButton from "./base-button.vue";
import SubjectCard from "./subject-card.vue";
import SubjectChip from "./subject-chip.vue";
import SubjectSuggestion from "./subject-suggestion.vue";

const {
  level,
  selectedSubjectIds,
  addSubjectId,
  deleteSubjectId,
  clearSubjectIds,
} = defineProps<{
  level: number;
  selectedSubjectIds: Set<number>;
  selectedSubjects: ReviewSubject[];
  addSubjectId: (id: number) => void;
  deleteSubjectId: (id: number) => void;
  clearSubjectIds: () => void;
}>();

const {
  searchQuery,
  isSearchOpen,
  highlightIndex,
  filters,
  filteredSubjectsByLevel,
  visibleLevels,
  firstOpenLevel,
  suggestions,
  setFilterType,
  addSubject,
  removeSubject,
  toggleSubject,
  clearSelection,
  toggleAllSubjectsInLevel,
  selectAllFilteredSubjects,
  setHighlightIndex,
  highlightPreviousSuggestion,
  highlightNextSuggestion,
  selectHighlightedSuggestion,
  showSuggestions,
  hideSuggestions,
} = useSubjectSelection({
  level,
  selectedSubjectIds,
  addSubjectId,
  deleteSubjectId,
  clearSubjectIds,
});
</script>

<template>
  <div class="review-selector">
    <div class="filters">
      <div class="tabs">
        <button
          v-for="type in ['radical', 'kanji', 'vocabulary']"
          :key="type"
          :class="`${type} ${filters.type === type ? 'active' : ''}`"
          class="tab"
          @click="setFilterType(type as SubjectType)"
        >
          {{ capitalize(type) }}
        </button>
      </div>
      <div class="filter-group">
        <label>Level range</label>
        <div class="range">
          <input
            v-model.number="filters.minLevel"
            type="range"
            min="1"
            :max="level"
          />
          <input
            v-model.number="filters.maxLevel"
            type="range"
            min="1"
            :max="level"
          />
          <span> {{ filters.minLevel }}–{{ filters.maxLevel }} </span>
        </div>
      </div>
      <div class="filter-group search">
        <input
          v-model.trim="searchQuery"
          type="text"
          placeholder="Search by meaning or reading"
          @focus="showSuggestions"
          @blur="hideSuggestions"
          @keydown.up.prevent="highlightPreviousSuggestion"
          @keydown.down.prevent="highlightNextSuggestion"
          @keydown.enter.prevent="selectHighlightedSuggestion"
        />
        <div
          v-if="isSearchOpen && searchQuery"
          class="suggestions"
          @mouseleave="setHighlightIndex(-1)"
        >
          <div
            v-for="(suggestion, index) in suggestions"
            :key="suggestion.id"
            :class="`${index === highlightIndex ? 'highlighted' : ''}`"
            class="suggestion"
            @mouseenter="setHighlightIndex(index)"
            @mousedown.prevent="addSubject(suggestion)"
          >
            <subject-suggestion
              :subject="suggestion"
              :primary-size="'20px'"
              :secondary-size="'20px'"
            />
          </div>
          <div v-if="suggestions.length === 0" class="no-suggestions">
            No matches
          </div>
        </div>
      </div>
      <base-button @click="selectAllFilteredSubjects">Select all</base-button>
      <base-button
        :disabled="selectedSubjectIds.size === 0"
        @click="clearSelection"
      >
        Clear selection
      </base-button>
    </div>
    <div class="levels">
      <details
        v-for="visibleLevel in visibleLevels"
        :key="visibleLevel"
        :open="visibleLevel === firstOpenLevel"
        class="level-section"
      >
        <summary class="level-header">
          <div>
            <span class="title">Level {{ visibleLevel }}</span>
            <span class="count"
              >{{
                filteredSubjectsByLevel[visibleLevel]?.length || 0
              }}
              items</span
            >
          </div>
          <base-button
            size="small"
            @click.stop="toggleAllSubjectsInLevel(visibleLevel)"
          >
            Toggle all
          </base-button>
        </summary>
        <div class="grid">
          <div
            v-for="item in filteredSubjectsByLevel[visibleLevel]"
            :key="item.id"
            class="card"
            :class="{ selected: selectedSubjectIds.has(item.id) }"
            @click="toggleSubject(item)"
          >
            <subject-card :subject="item" />
          </div>
        </div>
      </details>
    </div>
    <div class="selection-summary">
      <div class="summary-header">
        <strong>Selected:</strong> {{ selectedSubjectIds.size }} items
      </div>
      <div class="chips">
        <div
          v-for="item in selectedSubjects"
          :key="item.id"
          class="chip"
          @click="removeSubject(item)"
        >
          <subject-chip :subject="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-selector {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  grid-template:
    "filters" auto
    "levels" 8fr
    "selection-summary" 4fr / 1fr;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  grid-column: 1 / -1;
}

.tabs {
  display: inline-flex;
  gap: 4px;
}

.tab {
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  border-bottom: none;
  background-color: var(--background-color-0);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
  font-size: 1rem;
}

.tab.radical {
  color: var(--radical-color);
}

.tab.kanji {
  color: var(--kanji-color);
}

.tab.vocabulary {
  color: var(--vocabulary-color);
}

.tab.active {
  color: var(--foreground-color);
}

.tab.radical.active {
  border-color: var(--radical-color);
  background: var(--radical-color-transparent);
}

.tab.kanji.active {
  border-color: var(--kanji-color);
  background: var(--kanji-color-transparent);
}

.tab.vocabulary.active {
  border-color: var(--vocabulary-color);
  background: var(--vocabulary-color-transparent);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  gap: 16px;
  grid-area: filters;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  color: var(--foreground-color);
  font-size: 12px;
}

.range {
  display: flex;
  align-items: center;
  color: var(--foreground-color);
  gap: 8px;
}

.range input {
  appearance: none;
  appearance: none;
  background-color: transparent;
}

.range ::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background-color: var(--foreground-color);
}

.range ::-moz-range-progress {
  height: 4px;
  background-color: var(--background-color-3);
}

.range ::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: var(--foreground-color);
}

.range ::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background-color: var(--foreground-color);
}

.range ::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  border-radius: 16px;
  margin-top: -6px;
  appearance: none;
  appearance: none;
  background-color: var(--foreground-color);
}

.search {
  position: relative;
  min-width: 280px;
  flex: 1;
}

.search input {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-0);
  color: var(--foreground-color);
  transition: 0.25s;
}

.search input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.suggestions {
  position: absolute;
  z-index: 10;
  top: calc(100% + 4px);
  right: 0;
  left: 0;
  overflow: auto;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-2);
}

.suggestion:nth-child(odd) {
  background-color: var(--background-color-1);
}

.suggestion.highlighted {
  background-color: var(--foreground-color);
  color: var(--background-color-2);
}

.no-suggestions {
  padding: 10px;
  color: var(--dimmed-color);
  font-size: 13px;
}

.levels {
  display: flex;
  overflow: auto;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  gap: 8px;
  grid-area: levels;
  grid-column: 1 / 2;
}

.level-section {
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-0);
}

.level-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 20px;
  cursor: pointer;
}

.level-header .title {
  font-weight: 700;
}

.level-header .count {
  color: var(--dimmed-color);
  font-size: 12px;
  padding-inline-start: 16px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
  padding-block-start: 0;
}

.card {
  border: 2px solid var(--background-color-3);
  border-radius: 8px;
  cursor: pointer;
}

.card.selected {
  border-color: var(--primary-color);
}

.selection-summary {
  overflow: auto;
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  grid-area: selection-summary;
  grid-column: 1 / -1;
}

.summary-header {
  margin-bottom: 10px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  background-color: var(--background-color-0);
}
</style>
