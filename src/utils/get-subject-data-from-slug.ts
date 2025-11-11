import type { Subject, SubjectResponse } from "../types";

export const getSubjectDataFromSlug = <T extends Subject>(
  slug: string,
  collection: SubjectResponse<T>[],
): T | null =>
  collection.find((element) => element.data.slug === slug)?.data ?? null;
