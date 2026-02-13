import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/valentine/', // Dùng dấu chấm này là "bùa hộ mệnh" để fix lỗi 404
})