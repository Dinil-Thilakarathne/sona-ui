import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    include: [
      "src/**/*.test.tsx",
      "src/**/*.test.ts",
      "tests/**/*.test.tsx",
      "tests/**/*.test.ts",
    ],
    css: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
});
