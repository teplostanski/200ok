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
  integrations: [
    {
      name: 'deployment-url',
      hooks: {
        'astro:config:setup': ({ command, updateConfig }) => {
          loadEnvFile(
            new URL(
              command === 'build' ? '../.env.production' : '../.env.development',
              import.meta.url,
            ),
          )
          if (command !== 'build') {
            const port = Number(process.env.DOCS_PORT)
            const host = process.env.DOCS_HOST
            if (!host?.trim()) throw new Error('DOCS_HOST must be set')
            if (!Number.isInteger(port) || port < 1 || port > 65535) {
              throw new Error('DOCS_PORT must be an integer between 1 and 65535')
            }
            updateConfig({ server: { host, port }, vite: { server: { strictPort: true } } })
            return
          }
          const site = parseBaseUrl(process.env.BASE_URL)
          if (!site)
            throw new Error('Set BASE_URL in .env.production before building documentation')
          updateConfig({ site })
        },
      },
    },
    markdownDocumentation(),
  ],
  outDir: '../dist/docs',
  vite: {
    plugins: [tailwindcss()],
  },
})
