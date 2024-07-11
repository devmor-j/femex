import tailwindScrollbar from "tailwind-scrollbar";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        buy: "#00bd84",
        sell: "#f24e53",
      },
      fontFamily: {
        HarmonyOS_Sans: [
          "HarmonyOS Sans",
          "HarmonyOS Sans fallback",
          ...fontFamily.sans,
        ],
      },
    },
  },
  plugins: [
    tailwindScrollbar({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
