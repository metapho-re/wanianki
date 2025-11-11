import {
  AuthenticationPage,
  KanjiPage,
  RadicalPage,
  VocabularyPage,
} from "./views";

export const routes = [
  {
    path: "/",
    component: AuthenticationPage,
  },
  {
    path: "/kanji/:slug",
    component: KanjiPage,
  },
  {
    path: "/radical/:slug",
    component: RadicalPage,
  },
  {
    path: "/vocabulary/:slug",
    component: VocabularyPage,
  },
];
