import "@fontsource/noto-sans-jp/japanese-400.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/400-italic.css";
import "@fontsource/roboto-mono/700.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import "./style.css";
import App from "./App.vue";
import { routes } from "./routes";

const app = createApp(App);

const router = createRouter({
  routes,
  history: createWebHistory(),
});

app.use(router);
app.mount("#app");
