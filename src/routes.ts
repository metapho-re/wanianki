import {
  DashboardPage,
  KanjiPage,
  LoginPage,
  RadicalPage,
  VocabularyPage,
} from "./views";

export const routes = [
  {
    path: "/",
    component: DashboardPage,
  },
  {
    path: "/login",
    component: LoginPage,
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
