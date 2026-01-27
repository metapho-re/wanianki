export const routes = [
  {
    path: "/",
    component: () => import("./views/dashboard-page.vue"),
  },
  {
    path: "/login",
    component: () => import("./views/login-page.vue"),
  },
  {
    path: "/study/kanji/:slug",
    component: () => import("./views/kanji-page.vue"),
  },
  {
    path: "/study/radical/:slug",
    component: () => import("./views/radical-page.vue"),
  },
  {
    path: "/study/vocabulary/:slug",
    component: () => import("./views/vocabulary-page.vue"),
  },
  {
    path: "/quiz/:quizType/:subjectType/:slug",
    component: () => import("./views/quiz-page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./views/not-found-page.vue"),
  },
];
