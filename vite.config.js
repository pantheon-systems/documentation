import { defineConfig, configDefaults } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    coverage: {
      reportsDirectory: `./coverage`,
    },
    environment: "jsdom",
    setupFiles: ["./setupVitest.js"],
    exclude: [...configDefaults.exclude, "./playwright-tests/*", "./tests/playwright/**"],
    css: true,
    deps: {
      inline: [/@pantheon-systems\/pds-toolkit-react/],
    },
  },
  plugins: [react()],
});
