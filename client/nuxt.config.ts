// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  app: { baseURL: "/", buildAssetsDir: "/_nuxt/" },
  modules: [
    "@nuxtjs/tailwindcss",
    // "@nuxt/icon",
    "nuxt-headlessui",
    "@nuxtjs/google-fonts",
    "@primevue/nuxt-module",
  ],
  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700],
    },
  },
  headlessui: {
    prefix: "Headless",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
