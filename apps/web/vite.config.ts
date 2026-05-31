import { defineConfig } from "vite";
import { resolve } from "node:path";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import mdx from "fumadocs-mdx/vite";
import * as MdxConfig from "./source.config";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // Avoid Rollup native binary issues on Vercel/Linux CI (npm optional deps bug).
      rollup: resolve(__dirname, "node_modules/rollup"),
    },
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    nitro(),
    viteReact(),
    tailwindcss(),
    mdx(MdxConfig),
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    allowedHosts: true,
  },
});
