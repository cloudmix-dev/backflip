import mdx from "@mdx-js/rollup";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  plugins: [
    remix({
      appDirectory: "./src",
    }),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug],
    }),
  ],
});
