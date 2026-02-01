// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "nuxt-headlessui"],
  headlessui: {
    prefix: "Headless",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
