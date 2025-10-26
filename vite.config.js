import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': 'https://vtu-backend-uqmx.onrender.com',  // Make sure this matches the correct backend URL
    },
  },
});