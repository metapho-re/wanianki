import type { Kanji } from "./kanji";
import type { Radical } from "./radical";
import type { Vocabulary } from "./vocabulary";

interface AuxiliaryMeaning {
  meaning: string;
  type: "whitelist" | "blacklist";
}

interface Meaning {
  accepted_answer: boolean;
  meaning: string;
  primary: boolean;
}

export interface Subject {
  auxiliary_meanings: AuxiliaryMeaning[];
  document_url: string;
  level: number;
  meaning_mnemonic: string;
  meanings: Meaning[];
  slug: string;
}

export interface SubjectResponse<T> {
  id: number;
  object: SubjectType;
  data: T;
}

export type SubjectType = "kanji" | "radical" | "vocabulary";

export type ReviewSubject = SubjectResponse<Radical | Kanji | Vocabulary>;
