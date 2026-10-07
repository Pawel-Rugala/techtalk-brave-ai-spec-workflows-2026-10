import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5173 },
  build: {
    rollupOptions: {
      input: { pl: 'index.html', en: 'en.html' },
    },
  },
});
