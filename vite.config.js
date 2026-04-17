import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

const hash = (() => {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7)
  try { return execSync('git rev-parse --short HEAD', {stdio:['pipe','pipe','pipe']}).toString().trim() }
  catch (_) { return 'dev' }
})()

export default defineConfig({
  plugins: [react()],
  base: '/nlics/',
  define: { __BUILD_HASH__: JSON.stringify(hash) },
  build: { outDir: 'dist', sourcemap: false },
})
