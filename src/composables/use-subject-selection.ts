import { computed, type ComputedRef, ref, type Ref, watch } from "vue";

import type { ReviewSubject, SubjectType } from "../types";
import { clamp, getSubjectQueryString } from "../utils";

import { subjectCollection } from "./use-learning-material";

const MAX_SUGGESTIONS_COUNT = 10;

interface Params {
  level: number;
  selectedSubjectIds: Set<number>;
  addSubjectId: (id: number) => void;
  deleteSubjectId: (id: number) => void;
  clearSubjectIds: () => void;
}

interface ReturnValue {
  searchQuery: Ref<string>;
  isSearchOpen: Ref<boolean>;
  highlightIndex: Ref<number>;
  filters: Ref<{
    type: SubjectType;
    minLevel: number;
    maxLevel: number;
  }>;
  filteredSubjectsByLevel: ComputedRef<Record<number, ReviewSubject[]>>;
  visibleLevels: ComputedRef<number[]>;
  firstOpenLevel: ComputedRef<number>;
  suggestions: ComputedRef<ReviewSubject[]>;
  setFilterType: (type: SubjectType) => void;
  addSubject: (subject: ReviewSubject) => void;
  removeSubject: (subject: ReviewSubject) => void;
  toggleSubject: (subject: ReviewSubject) => void;
  clearSelection: () => void;
  toggleAllSubjectsInLevel: (level: number) => void;
  selectAllFilteredSubjects: () => void;
  setHighlightIndex: (index: number) => void;
  highlightPreviousSuggestion: () => void;
  highlightNextSuggestion: () => void;
  selectHighlightedSuggestion: () => void;
  showSuggestions: () => void;
  hideSuggestions: () => void;
}

export const useSubjectSelection = ({
  level,
  selectedSubjectIds,
  addSubjectId,
  deleteSubjectId,
  clearSubjectIds,
}: Params): ReturnValue => {
  const searchQuery = ref<string>("");

  const isSearchOpen = ref<boolean>(false);

  const highlightIndex = ref<number>(-1);

  const filters = ref<{
    type: SubjectType;
    minLevel: number;
    maxLevel: number;
  }>({
    type: "kanji",
    minLevel: 1,
    maxLevel: level,
  });

  const availableSubjects = computed<ReviewSubject[]>(
    () => subjectCollection[filters.value.type].value,
  );

  const filteredSubjects = computed<ReviewSubject[]>(() =>
    availableSubjects.value.filter((subject) => {
      if (
        subject.data.level < filters.value.minLevel ||
        subject.data.level > filters.value.maxLevel
      ) {
        return false;
      }

      if (
        searchQuery.value &&
        !getSubjectQueryString(subject).includes(
          searchQuery.value.toLowerCase(),
        )
      ) {
        return false;
      }

      return true;
    }),
  );

  const filteredSubjectsByLevel = computed<Record<number, ReviewSubject[]>>(
    () => {
      const map: Record<number, ReviewSubject[]> = {};

      for (const subject of filteredSubjects.value) {
        (map[subject.data.level] ||= []).push(subject);
      }

      return map;
    },
  );

  const visibleLevels = computed<number[]>(() => {
    const levels: number[] = [];

    for (
      let level = filters.value.minLevel;
      level <= filters.value.maxLevel;
      level += 1
    ) {
      levels.push(level);
    }

    return levels;
  });

  const firstOpenLevel = computed<number>(
    () => visibleLevels.value[0] as number,
  );

  const suggestions = computed<ReviewSubject[]>(() => {
    const query = searchQuery.value.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const suggestionsList: ReviewSubject[] = [];

    for (const subject of availableSubjects.value) {
      if (
        getSubjectQueryString(subject).includes(query) &&
        !selectedSubjectIds.has(subject.id)
      ) {
        suggestionsList.push(subject);

        if (suggestionsList.length >= MAX_SUGGESTIONS_COUNT) {
          break;
        }
      }
    }

    return suggestionsList;
  });

  watch(
    () => [filters.value.minLevel, filters.value.maxLevel] as [number, number],
    ([min, max]) => {
      if (min > max) {
        [filters.value.minLevel, filters.value.maxLevel] = [
          filters.value.maxLevel,
          filters.value.minLevel,
        ];
      }

      filters.value.minLevel = clamp(filters.value.minLevel, 1, 60);
      filters.value.maxLevel = clamp(filters.value.maxLevel, 1, 60);
    },
  );

  watch(
    () => searchQuery.value,
    () => {
      if (searchQuery.value.length > 0) {
        isSearchOpen.value = true;
      }
    },
  );

  const setFilterType = (type: SubjectType) => {
    filters.value.type = type;
  };

  const addSubject = (subject: ReviewSubject) => {
    addSubjectId(subject.id);
    highlightIndex.value = -1;
  };

  const removeSubject = (subject: ReviewSubject) => {
    deleteSubjectId(subject.id);
  };

  const toggleSubject = (subject: ReviewSubject) => {
    if (selectedSubjectIds.has(subject.id)) {
      deleteSubjectId(subject.id);
    } else {
      addSubjectId(subject.id);
    }
  };

  const clearSelection = () => {
    clearSubjectIds();
  };

  const toggleAllSubjectsInLevel = (level: number) => {
    const subjects = filteredSubjectsByLevel.value[level] || [];
    const areAllSubjectsSelected = subjects.every(({ id }) =>
      selectedSubjectIds.has(id),
    );

    for (const subject of subjects) {
      if (areAllSubjectsSelected) {
        deleteSubjectId(subject.id);
      } else {
        addSubjectId(subject.id);
      }
    }
  };

  const selectAllFilteredSubjects = () => {
    for (const subject of filteredSubjects.value) {
      addSubjectId(subject.id);
    }
  };

  const setHighlightIndex = (index: number) => {
    highlightIndex.value = index;
  };

  const highlightPreviousSuggestion = () => {
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
  };

  const highlightNextSuggestion = () => {
    highlightIndex.value = Math.min(
      highlightIndex.value + 1,
      suggestions.value.length - 1,
    );
  };

  const selectHighlightedSuggestion = () => {
    addSubject(suggestions.value[highlightIndex.value] as ReviewSubject);
  };

  const showSuggestions = () => {
    isSearchOpen.value = true;
  };

  const hideSuggestions = () => {
    isSearchOpen.value = false;
  };

  return {
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
  };
};
