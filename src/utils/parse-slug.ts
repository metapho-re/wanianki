export const parseSlug = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;
