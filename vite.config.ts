import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    server: {
      deps: {
        // Without this line, the build will fail with a message like:
        // Unknown file extension ".css" for /Users/xxxxxxxxxxx/Sites/documentation/node_modules/@pantheon-systems/pds-toolkit-react/_dist/index.css
        //similar to:
        // https://github.com/vitest-dev/vitest/issues/5283
        inline: [/@pantheon-systems\/.*/],
      },
    },
  },
});
