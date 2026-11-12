import { loadEnvFile } from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import markdownDocumentation from './integrations/markdown.mjs'

try {
  loadEnvFile(new URL('../.env', import.meta.url))
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
const { parseBaseUrl } = await import('../src/base-url.ts')

export default defineConfig({
  site: parseBaseUrl(process.env.BASE_URL),
  output: 'static',
  integrations: [markdownDocumentation()],
  outDir: '../dist/docs',
  server: { port: 4321 },
  vite: {
    plugins: [tailwindcss()],
  },
})
