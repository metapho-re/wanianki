import {
  DashboardPage,
  KanjiPage,
  LoginPage,
  QuizPage,
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
    path: "/study/kanji/:slug",
    component: KanjiPage,
  },
  {
    path: "/study/radical/:slug",
    component: RadicalPage,
  },
  {
    path: "/study/vocabulary/:slug",
    component: VocabularyPage,
  },
  {
    path: "/quiz/:quizType/:subjectType/:slug",
    component: QuizPage,
  },
];
