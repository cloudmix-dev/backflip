import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import solid from "vite-plugin-solid";

import pkg from "./package.json";

export default defineConfig({
  plugins: [
    solid(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Cloudmix UI",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `index.${format}.${format === "cjs" ? "js" : "mjs"}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.devDependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
