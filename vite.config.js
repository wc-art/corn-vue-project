import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  define: {
    "__VUE_OPTIONS_API__": false // 关闭vue2的optionsAPI支持
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        // target: VITE_APP_UPLOAD_URL,
        // target: 'http://192.168.3.2:8989',
        // target: 'http://10.162.67.252:8989',
        target: 'http://43.143.200.52:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit:1500,
  }
})
