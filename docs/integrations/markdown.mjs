import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { parseHTML } from 'linkedom'
import TurndownService from 'turndown'
import gfm from 'turndown-plugin-gfm'
import { documentationFormat } from '../../src/utils/documentation-format.ts'
import { localeCodes, locales } from '../src/i18n/locales.ts'

export const documentationRoutes = Object.fromEntries(
  localeCodes.flatMap(locale => {
    const prefix = locale === 'en' ? '' : `/${locale}`
    return [
      [prefix || '/', `${prefix}/index.md`],
      [`${prefix}/status-codes`, `${prefix}/status-codes.md`],
    ]
  }),
)

export const toMarkdown = (html, origin) => {
  const { document } = parseHTML(html)
  const main = document.querySelector('main')
  if (!main) throw new Error('Documentation page has no main element')
  main
    .querySelectorAll('nav, script, style, form, fieldset, button, select, .copy-status')
    .forEach(node => {
      node.remove()
    })
  main.querySelectorAll('a[href]').forEach(link => {
    link.setAttribute('href', new URL(link.getAttribute('href'), origin).href)
  })
  const converter = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  })
  converter.use(gfm.tables)
  converter.addRule('methods', {
    filter: node => node.classList?.contains('endpoint-methods'),
    replacement: (_content, node) =>
      `\n\n${Array.from(node.children, child => child.textContent.trim()).join(', ')}\n\n`,
  })
  converter.addRule('summary', {
    filter: 'summary',
    replacement: (content, node) => {
      const code = node.querySelector('code.badge')
      const title = node.querySelector('span[lang]')
      return code && title
        ? `\n\n### ${code.textContent.trim()} ${title.textContent.trim()}\n\n`
        : `\n\n**${content.trim()}**\n\n`
    },
  })
  converter.addRule('codeBlock', {
    filter: 'pre',
    replacement: (_content, node) => {
      const code = node.querySelector('code')
      const text = code?.textContent ?? node.textContent ?? ''
      const language =
        code?.hasAttribute('data-curl-example') || text.startsWith('docker ') ? 'sh' : ''
      const fence = '`'.repeat(
        Math.max(3, ...[...text.matchAll(/`+/g)].map(match => match[0].length + 1)),
      )
      return `\n\n${fence}${language}\n${text}\n${fence}\n\n`
    },
  })
  return `${converter.turndown(main.innerHTML).trim()}\n`
}

const indexText = origin => {
  const lines = [
    '# 200 OK',
    '',
    '> HTTP request and response service with an API reference and HTTP status code documentation.',
    '',
    '## Documentation',
    '',
  ]
  for (const locale of localeCodes) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    lines.push(`- [API reference (${locales[locale]})](${origin}${prefix}/index.md)`)
    lines.push(`- [HTTP status codes (${locales[locale]})](${origin}${prefix}/status-codes.md)`)
  }
  lines.push('', '## Complete reference', '', `- [All documentation](${origin}/llms-full.txt)`, '')
  return lines.join('\n')
}

export default function markdownDocumentation() {
  let site
  return {
    name: 'markdown-documentation',
    hooks: {
      'astro:config:setup': ({ command, config }) => {
        if (command === 'build' && !config.site) {
          throw new Error(
            'Set BASE_URL in the root .env file or environment before building documentation',
          )
        }
      },
      'astro:config:done': ({ config }) => {
        site = config.site ? new URL(config.site).origin : undefined
      },
      'astro:build:done': async ({ dir }) => {
        const texts = []
        for (const [html, markdown] of Object.entries(documentationRoutes)) {
          const source = new URL(`${html === '/' ? '' : `${html.slice(1)}/`}index.html`, dir)
          const text = toMarkdown(await readFile(source, 'utf8'), new URL(html, site).href)
          const target = new URL(markdown.slice(1), dir)
          await mkdir(fileURLToPath(new URL('.', target)), { recursive: true })
          await writeFile(target, text)
          texts.push(text)
        }
        await writeFile(new URL('llms.txt', dir), indexText(site))
        await writeFile(new URL('llms-full.txt', dir), texts.join('\n\n---\n\n'))
        await writeFile(new URL('.documentation.json', dir), JSON.stringify(documentationRoutes))
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          try {
            if (req.method !== 'GET' && req.method !== 'HEAD') return next()
            const path =
              new URL(req.url ?? '/', 'http://localhost').pathname.replace(/\/+$/, '') || '/'
            const explicit = Object.entries(documentationRoutes).find(
              ([, markdown]) => markdown === path,
            )
            const markdown = Object.hasOwn(documentationRoutes, path)
              ? documentationRoutes[path]
              : undefined
            const discovery = path === '/llms.txt' || path === '/llms-full.txt'
            if (!explicit && !markdown && !discovery) return next()
            const vary = res.getHeader('Vary')
            res.setHeader('Vary', vary ? `${vary}, Accept` : 'Accept')
            if (explicit)
              res.setHeader('Link', `<${explicit[0]}>; rel="alternate"; type="text/html"`)
            else if (markdown)
              res.setHeader('Link', `<${markdown}>; rel="alternate"; type="text/markdown"`)
            const format =
              explicit || discovery ? 'markdown' : documentationFormat(req.headers.accept)
            if (!format) {
              res.statusCode = 406
              res.setHeader('Content-Type', 'text/plain; charset=utf-8')
              res.end('Available representations: text/html, text/markdown')
              return
            }
            if (format === 'html') return next()
            if (markdown) res.setHeader('Link', `<${path}>; rel="alternate"; type="text/html"`)
            // Use the listening address, never the untrusted incoming Host header.
            const address = server.httpServer?.address()
            if (!address || typeof address === 'string')
              throw new Error('Development server is not listening')
            const host = address.family === 'IPv6' ? '[::1]' : '127.0.0.1'
            const origin = `http://${host}:${address.port}`
            const render = async htmlPath => {
              const response = await fetch(`${origin}${htmlPath}`, {
                headers: { Accept: 'text/html' },
                signal: AbortSignal.timeout(15000),
              })
              if (!response.ok) throw new Error(`Cannot render ${htmlPath}: ${response.status}`)
              return toMarkdown(await response.text(), new URL(htmlPath, origin).href)
            }
            const text =
              path === '/llms.txt'
                ? indexText(origin)
                : path === '/llms-full.txt'
                  ? (await Promise.all(Object.keys(documentationRoutes).map(render))).join(
                      '\n\n---\n\n',
                    )
                  : await render(explicit?.[0] ?? path)
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
            res.end(req.method === 'HEAD' ? undefined : text)
          } catch (error) {
            next(error)
          }
        })
      },
    },
  }
}
