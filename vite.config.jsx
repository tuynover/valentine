import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/valentine/', // QUAN TRỌNG: Phải trùng với tên Repository bạn sẽ tạo
})