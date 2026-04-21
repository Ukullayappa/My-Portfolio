import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://https://portfolio-backend-p9b8.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
