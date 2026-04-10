import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Fetch latest Vizier version from GitHub API
async function getLatestVersion(): Promise<string> {
  const maxRetries = 3
  const timeout = 5000 // 5 second timeout

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      // Use /releases (not /releases/latest) to include prerelease versions
      // Results are ordered by published_at in descending order, so first is most recent
      const response = await fetch(
        'https://api.github.com/repos/vizier-lab/vizier/releases?per_page=1',
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'vizier-landing-build',
          },
        }
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.warn(
          `GitHub API returned status ${response.status}, attempt ${attempt + 1}/${maxRetries}`
        )
        continue
      }

      const data = await response.json() as Array<{ tag_name: string }>

      if (!data || data.length === 0) {
        console.warn('No releases found in GitHub API response')
        continue
      }

      const version = data[0].tag_name.replace(/^v/, '') // Remove leading 'v'

      console.log(`✓ Fetched Vizier version: ${version}`)
      return version
    } catch (error) {
      console.warn(
        `Failed to fetch version (attempt ${attempt + 1}/${maxRetries}):`,
        error instanceof Error ? error.message : String(error)
      )

      if (attempt < maxRetries - 1) {
        // Wait before retry (100ms * (attempt + 1))
        await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)))
      }
    }
  }

  console.warn(
    '⚠ Could not fetch Vizier version from GitHub, using fallback "latest"'
  )
  return 'latest'
}

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
