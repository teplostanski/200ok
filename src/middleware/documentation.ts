import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { RequestHandler } from 'express'
import { documentationFormat } from '../utils/documentation-format.js'

export const documentation = (directory: string): RequestHandler => {
  let routes: Record<string, string> = {}
  try {
    routes = JSON.parse(readFileSync(join(directory, '.documentation.json'), 'utf8'))
  } catch (error) {
    if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error
  }
  const markdownRoutes = new Map(Object.entries(routes).map(([html, markdown]) => [markdown, html]))
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    const path = req.path.replace(/\/+$/, '') || '/'
    const html = markdownRoutes.get(path)
    const markdown = Object.hasOwn(routes, path) ? routes[path] : undefined
    const discovery = path === '/llms.txt' || path === '/llms-full.txt'
    if (!html && !markdown && !discovery) return next()
    res.vary('Accept')
    if (html) res.set('Link', `<${html}>; rel="alternate"; type="text/html"`)
    else if (markdown) res.set('Link', `<${markdown}>; rel="alternate"; type="text/markdown"`)
    const format = html || discovery ? 'markdown' : documentationFormat(req.get('Accept'))
    if (!format) {
      res.status(406).type('text/plain').send('Available representations: text/html, text/markdown')
      return
    }
    if (format === 'html') return next()
    if (markdown) res.set('Link', `<${path}>; rel="alternate"; type="text/html"`)
    const file = html || discovery ? path : markdown
    if (!file) return next()
    res.type('text/markdown; charset=utf-8')
    res.sendFile(file.slice(1), { root: directory, cacheControl: false }, error => {
      if (error) next(error)
    })
  }
}
