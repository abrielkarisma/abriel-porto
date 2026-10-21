import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Base path untuk semua asset (CSS/JS/gambar).
// GitHub Pages "project site" WAJIB pakai '/<nama-repo>/'.
// Kalau deploy ke domain sendiri (mis. abrielwebsoon.com) yang root-nya langsung repo ini,
// jalankan: VITE_BASE=/ npm run build
const base = process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/abriel-porto/' : '/')

export default defineConfig({
  plugins: [vue()],
  base,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    allowedHosts: ['f7536019c2d8.ngrok-free.app']
  }
})
