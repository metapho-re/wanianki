import type { RouteParams } from "vue-router";

import type { SubjectType } from "../types";

import { parseSlug } from "./parse-slug";

const decodeBase64Slug = (value: unknown): string | null => {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  try {
    return atob(value);
  } catch {
    return null;
  }
};

export const getSlugFromSubjectType = (
  type: SubjectType | null,
  routeParams: RouteParams,
): string | null => {
  if (!type) {
    return null;
  }

  return type === "radical"
    ? decodeBase64Slug(routeParams.slug)
    : parseSlug(routeParams.slug);
};
