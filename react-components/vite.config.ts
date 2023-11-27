import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import settings from './settings.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: settings.base,
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  test: {
    globals: true,
    reporters: 'verbose',
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: 'text',
    },
  },
});
