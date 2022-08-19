import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import vitePluginImp from 'vite-plugin-imp'
export default defineConfig({
  plugins: [
    react(),

    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: name => `antd/es/${name}/style`
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
