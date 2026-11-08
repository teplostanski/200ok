import assert from 'node:assert/strict'
import { once } from 'node:events'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { after, before, test } from 'node:test'
import express from 'express'
import { documentation } from '../dist/middleware/documentation.js'
import { documentationFormat } from '../dist/utils/documentation-format.js'
import { documentationRoutes, toMarkdown } from '../docs/integrations/markdown.mjs'

let directory
let server
let origin
before(async () => {
  directory = await mkdtemp(join(tmpdir(), '200ok-markdown-test-'))
  await writeFile(join(directory, '.documentation.json'), JSON.stringify(documentationRoutes))
  for (const path of [...Object.values(documentationRoutes), '/llms.txt', '/llms-full.txt']) {
    const file = join(directory, path)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, `# Documentation ${path}\n`)
  }
  const app = express()
  app.use(documentation(directory))
  app.get('/', (_req, res) => res.type('html').send('<h1>HTML documentation</h1>'))
  app.get('/echo', (_req, res) => res.type('text').send('API'))
  server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  origin = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  server?.closeAllConnections()
  if (server)
    await new Promise((resolve, reject) =>
      server.close(error => (error ? reject(error) : resolve())),
    )
  if (directory) await rm(directory, { recursive: true })
})

for (const [accept, expected] of [
  [undefined, 'html'],
  ['*/*', 'html'],
  ['text/*', 'html'],
  ['text/markdown', 'markdown'],
  ['text/html, text/markdown', 'markdown'],
  ['text/html, text/markdown;q=0.5', 'html'],
  ['text/html;q=0.2, text/markdown;q=0.8', 'markdown'],
  ['text/markdown;q=0, text/*;q=1', 'html'],
  ['text/html;q=0, text/markdown;q=0, */*;q=1', undefined],
  ['image/png', undefined],
  ['text/markdown;q=bogus', undefined],
  ['TEXT/MARKDOWN; Q=1', 'markdown'],
]) {
  test(`Accept negotiation: ${accept}`, () => assert.equal(documentationFormat(accept), expected))
}

test('HTML, negotiated Markdown and direct Markdown carry discovery and Vary headers', async () => {
  const html = await fetch(origin, { headers: { Accept: 'text/html, text/markdown;q=0.5' } })
  assert.match(html.headers.get('content-type'), /text\/html/)
  assert.match(html.headers.get('vary'), /Accept/)
  assert.equal(html.headers.get('link'), '</index.md>; rel="alternate"; type="text/markdown"')
  const markdown = await fetch(origin, { headers: { Accept: 'text/html, text/markdown' } })
  assert.match(markdown.headers.get('content-type'), /text\/markdown/)
  assert.equal(markdown.headers.get('link'), '</>; rel="alternate"; type="text/html"')
  assert.match(await markdown.text(), /^# Documentation/)
  const direct = await fetch(`${origin}/index.md`, { headers: { Accept: 'image/png' } })
  assert.equal(direct.status, 200)
  assert.equal(direct.headers.get('link'), '</>; rel="alternate"; type="text/html"')
  assert.match(direct.headers.get('vary'), /Accept/)
})

test('all locales and both page types serve Markdown through direct and negotiated URLs', async () => {
  assert.equal(Object.keys(documentationRoutes).length, 14)
  for (const [html, markdown] of Object.entries(documentationRoutes)) {
    for (const path of [html, markdown]) {
      const response = await fetch(`${origin}${path}`, { headers: { Accept: 'text/markdown' } })
      assert.equal(response.status, 200, path)
      assert.match(response.headers.get('content-type'), /text\/markdown/)
    }
  }
})

test('406 is limited to documentation pages and HEAD has no body', async () => {
  const unacceptable = await fetch(origin, { headers: { Accept: 'image/png' } })
  assert.equal(unacceptable.status, 406)
  assert.match(unacceptable.headers.get('vary'), /Accept/)
  const api = await fetch(`${origin}/echo`, { headers: { Accept: 'image/png' } })
  assert.equal(api.status, 200)
  assert.equal(await api.text(), 'API')
  const head = await fetch(`${origin}/index.md`, { method: 'HEAD' })
  assert.equal(head.status, 200)
  assert.match(head.headers.get('content-type'), /text\/markdown/)
  assert.equal(await head.text(), '')
})

test('discovery files bypass negotiation and unknown Markdown paths stay 404', async () => {
  for (const path of ['/llms.txt', '/llms-full.txt']) {
    const response = await fetch(`${origin}${path}`, { headers: { Accept: 'image/png' } })
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /text\/markdown/)
  }
  for (const path of [
    '/missing.md',
    '/%2e%2e%2fpackage.json',
    '/constructor',
    '/.documentation.json',
  ]) {
    assert.equal((await fetch(`${origin}${path}`)).status, 404)
  }
})

test('conversion preserves code, tables, language and source links without UI or scripts', () => {
  const result = toMarkdown(
    `<header>chrome</header><main><h1>Документация</h1>
    <div class="endpoint-methods"><span>GET</span><span>POST</span></div>
    <details><summary><code class="badge">200</code><span lang="en">OK</span></summary></details>
    <nav>navigation</nav><button>Copy</button><script>alert(1)</script>
    <pre><code data-curl-example="0">curl 'https://example.com/ip?pretty'\n</code></pre>
    <table><thead><tr><th>Name</th><th>Type</th></tr></thead><tbody><tr><td>ip</td><td>string</td></tr></tbody></table>
    <a href="/reference">Source</a><a href="#part">Part</a>
    </main><footer>footer</footer>`,
    'https://example.com/ru/',
  )
  assert.match(result, /# Документация/)
  assert.match(result, /GET, POST/)
  assert.match(result, /### 200 OK/)
  assert.match(result, /```sh\ncurl 'https:\/\/example.com\/ip\?pretty'/)
  assert.match(result, /\| Name \| Type \|/)
  assert.match(result, /https:\/\/example.com\/reference/)
  assert.match(result, /https:\/\/example.com\/ru\/#part/)
  assert.doesNotMatch(result, /chrome|navigation|Copy|alert\(1\)|footer/)
})
