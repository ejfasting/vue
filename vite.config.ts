import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/vue/',
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.ts',
        // Add your additional HTML file entry here
        index: 'index.html',
        errorPage: '404.html'
      },
    },
  },
})
