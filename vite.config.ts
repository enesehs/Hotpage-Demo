import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Hotpage/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets'
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Burası "true" yerine kesinlikle '0.0.0.0' olmalı
    port: 5173,      // Portu da sabitleyebiliriz
  }
})