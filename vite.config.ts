/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
      },
      manifest: {
        name: "WaniAnki",
        short_name: "WaniAnki",
        description:
          "A lightweight web application that fetches review subjects from your WaniKani account and lets you review them offline.",
        theme_color: "#16161d",
        background_color: "#16161d",
        display: "standalone",
        icons: [
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
