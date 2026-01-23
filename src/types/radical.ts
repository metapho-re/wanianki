import type { Subject } from "./subject";

interface Image {
  content_type: "image/png" | "image/svg+xml";
  url: string | undefined;
}

export interface Radical extends Subject {
  amalgamation_subject_ids: number[];
  character_images: Image[];
  characters: string | null;
}
