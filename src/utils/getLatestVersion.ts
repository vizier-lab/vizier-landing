/**
 * Fetches the latest Vizier version from GitHub releases
 * Called at build time by Vite
 * Falls back to "latest" if API fails
 */
export async function getLatestVersion(): Promise<string> {
  const maxRetries = 3;
  const timeout = 5000; // 5 second timeout

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(
        'https://api.github.com/repos/vizier-lab/vizier/releases/latest',
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'vizier-landing-build',
          },
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(
          `GitHub API returned status ${response.status}, attempt ${attempt + 1}/${maxRetries}`
        );
        continue;
      }

      const data = await response.json() as { tag_name: string };
      const version = data.tag_name.replace(/^v/, ''); // Remove leading 'v'

      console.log(`✓ Fetched Vizier version: ${version}`);
      return version;
    } catch (error) {
      console.warn(
        `Failed to fetch version (attempt ${attempt + 1}/${maxRetries}):`,
        error instanceof Error ? error.message : String(error)
      );

      if (attempt < maxRetries - 1) {
        // Wait before retry (100ms * (attempt + 1))
        await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
      }
    }
  }

  console.warn(
    '⚠ Could not fetch Vizier version from GitHub, using fallback "latest"'
  );
  return 'latest';
}
