import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://vtu-xpwk.onrender.com',  // Make sure this matches the correct backend URL
    },
  },
});