import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// सिर्फ एक ही export default होना चाहिए
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
