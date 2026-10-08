import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Netlify functions don't run under plain `vite`, so read the live content locally
    proxy: {
      '/api/site-data': { target: 'https://www.attunedbeing.co', changeOrigin: true },
      '/api/instagram-posts': { target: 'https://www.attunedbeing.co', changeOrigin: true }
    }
  }
})