import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "./",
  test: {
    globals: true,
    environment: "node",
    include: ["tests/e2e/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
  },
});
