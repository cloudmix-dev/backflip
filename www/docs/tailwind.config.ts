import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default ({
  content: ["./src/**/*.{astro,html,md,mdx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      neutral: colors.zinc,
      brand: colors.indigo,
      secondary: colors.blue,
      info: colors.purple,
      success: colors.emerald,
      danger: colors.red,
      warning: colors.amber,
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Golos Text", ...defaultTheme.fontFamily.sans],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [typography, containerQueries],
} satisfies Config);
