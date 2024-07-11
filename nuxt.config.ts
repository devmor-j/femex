// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: "2024-07-03",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/fontaine"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [{ name: "color-scheme", content: "dark light" }],
    },
  },
});
