import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Django API origin
        changeOrigin: true,
        secure: false,
      },
    },
  },
})