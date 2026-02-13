import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/valentine/', // Quan trọng: Phải có dấu / ở cả đầu và cuối
})