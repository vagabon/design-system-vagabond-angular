// vite.config.ts
import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [angular()],
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    setupFiles: ['./test-setup.ts'],
    exclude: ['dist/*', 'node_modules/*'],
    mockReset: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@ng-vagabond-lab/ng-dsv': fileURLToPath(new URL('./projects/ng-dsv', import.meta.url)),
    },
  },
});
