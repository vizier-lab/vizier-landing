import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// Virtual module plugin for version injection
function vizierVersionPlugin() {
  return {
    name: 'vizier-version-inject',
    resolveId(id: string) {
      if (id === 'virtual-vizier-version') {
        return id
      }
    },
    async load(id: string) {
      if (id === 'virtual-vizier-version') {
        const { getLatestVersion } = await import(
          resolve(__dirname, 'src/utils/getLatestVersion.ts')
        )
        const version = await getLatestVersion()
        return `export const VIZIER_VERSION = "${version}";`
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vizierVersionPlugin(), react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
