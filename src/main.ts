import "@fontsource/noto-sans-jp/japanese-400.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/400-italic.css";
import "@fontsource/roboto-mono/700.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import "./style.css";
import App from "./App.vue";
import { useOpfsStorage, user } from "./composables";
import { routes } from "./routes";
import { USER_KEY } from "./storage-keys";
import type { User } from "./types";

const { getValue } = useOpfsStorage<User, "report">(USER_KEY);
const persistedUser = await getValue();

if (persistedUser) {
  user.value = persistedUser;
}

const app = createApp(App);

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  if (!user.value && to.path !== "/login") {
    return { path: "/login" };
  }
});

app.use(router);
app.mount("#app");
