import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom"],
  treeshake: true,
  splitting: false,
  minify: false,
  onSuccess: async () => {
    mkdirSync(resolve("dist"), { recursive: true });
    copyFileSync(resolve("src/styles.css"), resolve("dist/styles.css"));
    copyFileSync(resolve("src/default.css"), resolve("dist/default.css"));
  },
});
