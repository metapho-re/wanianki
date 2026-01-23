import type { Radical } from "../types";

export const getRadicalImageUrl = (
  images: Radical["character_images"],
): string | undefined =>
  images.find(({ content_type }) => content_type === "image/svg+xml")?.url;
