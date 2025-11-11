import type { AxiosResponse } from "axios";

import type {
  Kanji,
  Radical,
  Response,
  SubjectResponse,
  User,
  Vocabulary,
} from "../types";
import { getSubjectsUrl } from "../utils";

import { axiosClient } from "./axios-client";

const getResource = async <T>(
  url: string,
): Promise<AxiosResponse<Response<T>>> => axiosClient.get<Response<T>>(url);

export type Fetcher<T> = (
  url: string | null,
) => ReturnType<typeof getResource<T>>;

export function getUserReport() {
  return getResource<User>("/user");
}

export function getKanjiCollection(level: number) {
  return function (url: string | null) {
    return getResource<SubjectResponse<Kanji>>(
      url ?? getSubjectsUrl(level, "kanji"),
    );
  };
}

export function getRadicalCollection(level: number) {
  return function (url: string | null) {
    return getResource<SubjectResponse<Radical>>(
      url ?? getSubjectsUrl(level, "radical"),
    );
  };
}

export function getVocabularyCollection(level: number) {
  return function (url: string | null) {
    return getResource<SubjectResponse<Vocabulary>>(
      url ?? getSubjectsUrl(level, "vocabulary"),
    );
  };
}
