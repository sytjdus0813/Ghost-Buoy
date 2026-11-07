import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// host: true → 같은 Wi-Fi의 휴대폰에서 Network 주소(또는 QR)로 접속 가능
export default defineConfig({
  // base './' → GitHub Pages 하위 경로(/저장소이름/)에서도 에셋 경로가 맞도록
  base: './',
  plugins: [react()],
  server: { host: true },
  preview: { host: true },
})
