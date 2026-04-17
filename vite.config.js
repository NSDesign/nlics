import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

var hash = 'dev'
try { hash = execSync('git rev-parse --short HEAD').toString().trim() } catch(e) {}

export default defineConfig({
  plugins: [react()],
  base: '/nlics/',
  define: {
    __BUILD_HASH__: JSON.stringify(hash),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
