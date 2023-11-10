import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import settings from './settings.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: settings.base,
});
