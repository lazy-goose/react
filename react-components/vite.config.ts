import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import settings from './settings.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: settings.base,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: 'text',
    },
  },
});
