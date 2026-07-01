import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: "2024-07-03",
  modules: ["@nuxtjs/fontaine", "nuxt-svgo"],
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [
        { name: "color-scheme", content: "dark light" },
        {
          name: "description",
          content:
            "Hobby website to showcase one of my latest works with Nuxt and TailwindCSS",
        },
      ],
      title: "Femex",
      htmlAttrs: { lang: "en" },
    },
  },
  svgo: {
    autoImportPath: "assets/svg/",
    defaultImport: "component",
    global: false,
    componentPrefix: "svg",
  },
});
