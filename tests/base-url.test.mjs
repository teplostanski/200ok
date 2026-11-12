import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseBaseUrl } from '../dist/base-url.js'

test('BASE_URL accepts HTTP(S) origins and normalizes trailing slashes', () => {
  assert.equal(parseBaseUrl(undefined), undefined)
  assert.equal(parseBaseUrl(''), undefined)
  assert.equal(parseBaseUrl('https://api.example.com/'), 'https://api.example.com')
  assert.equal(parseBaseUrl('http://localhost:4321'), 'http://localhost:4321')
  assert.equal(parseBaseUrl('http://[::1]:3000/'), 'http://[::1]:3000')
})

test('BASE_URL rejects non-origins', () => {
  for (const value of [
    'example.com',
    'ftp://example.com',
    'https://user:password@example.com',
    'https://example.com/docs',
    'https://example.com/?x=1',
    'https://example.com/#docs',
  ]) {
    assert.throws(() => parseBaseUrl(value), undefined, value)
  }
})

test('API links prefer BASE_URL, then the dev UI, then the request origin', async () => {
  const { spawnSync } = await import('node:child_process')
  for (const [configured, devOrigin, expected] of [
    ['https://custom.example', 'http://localhost:4322', 'https://custom.example'],
    ['', 'http://localhost:4322', 'http://localhost:4322'],
    ['', '', 'https://self-hosted.example'],
  ]) {
    const result = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `
      import { jsonDepthLimit } from './dist/middleware/json-depth-limit.js'
      const req = {
        body: { child: {} },
        protocol: 'https',
        get: () => 'self-hosted.example',
        app: { locals: { documentationOrigin: ${JSON.stringify(devOrigin || null)} } },
      }
      const res = {
        locals: {},
        status() { return this },
        type() { return this },
        send(text) { console.log(text.split('\\n').at(-1)) },
      }
      jsonDepthLimit(req, res, () => { throw new Error('Expected depth rejection') })
    `,
      ],
      {
        env: { ...process.env, BASE_URL: configured, JSON_MAX_DEPTH: '1' },
        encoding: 'utf8',
      },
    )
    assert.equal(result.status, 0, result.stderr)
    assert.equal(result.stdout.trim(), `${expected}/#run-locally`)
  }
})
