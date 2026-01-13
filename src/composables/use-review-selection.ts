import { computed, type ComputedRef, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

import type { ReviewSubject } from "../types";

import {
  subjectCollection,
  useLearningMaterial,
} from "./use-learning-material";
import { useReviewNavigationPaths } from "./use-review-navigation-paths";

type ReturnValue = Promise<{
  selectedSubjectIds: Ref<Set<number>>;
  selectedSubjects: ComputedRef<ReviewSubject[]>;
  shouldShuffle: Ref<boolean>;
  isQuizMode: Ref<boolean>;
  isLoading: ComputedRef<boolean>;
  addSubjectId: (id: number) => void;
  deleteSubjectId: (id: number) => void;
  clearSubjectIds: () => void;
  onStartReview: () => void;
}>;

export const useReviewSelection = async (userLevel: number): ReturnValue => {
  const router = useRouter();

  const subjectsById = computed<Record<string, ReviewSubject>>(() => {
    const subjectsMap: Record<string, ReviewSubject> = {};

    for (const subject of [
      ...subjectCollection.radical.value,
      ...subjectCollection.kanji.value,
      ...subjectCollection.vocabulary.value,
    ]) {
      subjectsMap[subject.id] = subject;
    }

    return subjectsMap;
  });

  const selectedSubjectIds = ref<Set<number>>(new Set());

  const selectedSubjects = computed<ReviewSubject[]>(() =>
    [...selectedSubjectIds.value]
      .map((id) => subjectsById.value[id] as ReviewSubject)
      .filter(Boolean),
  );

  const shouldShuffle = ref<boolean>(false);
  const isQuizMode = ref<boolean>(false);

  const isLoading = await useLearningMaterial(userLevel);

  const addSubjectId = (id: number) => {
    selectedSubjectIds.value.add(id);
  };

  const deleteSubjectId = (id: number) => {
    selectedSubjectIds.value.delete(id);
  };

  const clearSubjectIds = () => {
    selectedSubjectIds.value.clear();
  };

  const { createReviewNavigationPaths, getNextReviewNavigationPath } =
    useReviewNavigationPaths();

  const onStartReview = () => {
    createReviewNavigationPaths({
      selectedSubjects,
      shouldShuffle,
      isQuizMode,
    });

    const navigationPath = getNextReviewNavigationPath();

    if (navigationPath) {
      router.push(navigationPath);
    }
  };

  return {
    selectedSubjectIds,
    selectedSubjects,
    shouldShuffle,
    isQuizMode,
    isLoading,
    addSubjectId,
    deleteSubjectId,
    clearSubjectIds,
    onStartReview,
  };
};
