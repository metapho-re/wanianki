import type { Subject, SubjectResponse } from "../types";

export const getSubjectFromSlug = <T extends Subject>(
  slug: string,
  collection: SubjectResponse<T>[],
): SubjectResponse<T> | null =>
  collection.find((element) => element.data.slug === slug) ?? null;
