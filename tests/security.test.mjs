import './environment.mjs'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { after, before, test } from 'node:test'
import { gzipSync } from 'node:zlib'

process.env.JSON_MAX_DEPTH = '64'
delete process.env.BASE_URL
process.env.TRUST_PROXY = ''
const { app } = await import('../dist/app.js')
const { BODY_LIMIT_BYTES, JSON_MAX_DEPTH } = await import('../dist/constants.js')

let server
let origin
before(async () => {
  server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  origin = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  server.closeAllConnections()
  await new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())))
})

const post = (path, body, headers = {}) =>
  fetch(`${origin}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body,
  })

for (const prefix of ['', '/v1']) {
  test(`${prefix}/echo rejects deeply nested objects and arrays in every output format`, async () => {
    for (const format of ['', '?json', '?pretty']) {
      for (const [open, close] of [
        ['{"a":', '}'],
        ['[', ']'],
      ]) {
        const body = `${open.repeat(1200)}1${close.repeat(1200)}`
        const response = await post(`${prefix}/echo${format}`, body)
        assert.equal(response.status, 400)
        assert.match(await response.text(), /nesting limit/)
      }
    }
  })

  test(`${prefix}/echo accepts the nesting boundary`, async () => {
    const body = `${'['.repeat(JSON_MAX_DEPTH)}1${']'.repeat(JSON_MAX_DEPTH)}`
    const response = await post(`${prefix}/echo?json`, body)
    assert.equal(response.status, 200)
    assert.deepEqual((await response.json()).body, JSON.parse(body))
  })

  test(`${prefix}/echo rejects oversized and compressed oversized bodies`, async () => {
    const body = JSON.stringify({ data: 'x'.repeat(BODY_LIMIT_BYTES) })
    for (const compressed of [false, true]) {
      const response = await post(
        `${prefix}/echo?json`,
        compressed ? gzipSync(body) : body,
        compressed ? { 'content-encoding': 'gzip' } : {},
      )
      assert.equal(response.status, 413)
      assert.equal((await response.json()).limitBytes, BODY_LIMIT_BYTES)
    }
  })

  test(`${prefix}/echo keeps HTML inert and malformed JSON errors generic`, async () => {
    const payload = '<script>alert(1)</script>'
    const echoed = await post(`${prefix}/echo`, JSON.stringify({ payload }))
    assert.equal(echoed.status, 200)
    assert.match(echoed.headers.get('content-type'), /^text\/plain/)
    assert.equal(echoed.headers.get('x-content-type-options'), 'nosniff')
    assert.match(await echoed.text(), /<script>/)
    const malformed = await post(`${prefix}/echo?json`, '{"private":"secret"')
    assert.equal(malformed.status, 400)
    assert.deepEqual(await malformed.json(), { error: 'Bad Request' })
  })
}

test('untrusted forwarded IP headers do not override the socket address', async () => {
  const response = await fetch(`${origin}/ip?json`, {
    headers: { 'x-forwarded-for': '203.0.113.10' },
  })
  assert.deepEqual(await response.json(), { ip: '127.0.0.1' })
})

test('unsupported status codes return a client error', async () => {
  for (const code of ['999', '200x', '%3Cscript%3E']) {
    const response = await fetch(`${origin}/status/${code}?json`)
    assert.equal(response.status, 400)
  }
})

test('JSON_MAX_DEPTH accepts supported values and rejects invalid configuration at startup', () => {
  for (const value of ['1', '64', '256', '512']) {
    const result = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        "import { JSON_MAX_DEPTH } from './dist/constants.js'; process.stdout.write(String(JSON_MAX_DEPTH))",
      ],
      {
        cwd: new URL('../', import.meta.url),
        encoding: 'utf8',
        env: { ...process.env, JSON_MAX_DEPTH: value },
      },
    )
    assert.equal(result.status, 0, result.stderr)
    assert.equal(result.stdout.trim(), value)
  }
  for (const value of ['', '0', '-1', '1.5', '513', 'invalid']) {
    const result = spawnSync(
      process.execPath,
      ['--input-type=module', '-e', "import './dist/constants.js'"],
      {
        cwd: new URL('../', import.meta.url),
        encoding: 'utf8',
        env: { ...process.env, JSON_MAX_DEPTH: value },
      },
    )
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /JSON_MAX_DEPTH must be an integer between 1 and 512/)
  }
})

test('nesting errors include the active limit and local testing instructions', async () => {
  const body = `${'['.repeat(JSON_MAX_DEPTH + 1)}1${']'.repeat(JSON_MAX_DEPTH + 1)}`
  const response = await post('/echo?json', body)
  assert.equal(response.status, 400)
  const error = await response.json()
  assert.equal(error.limitDepth, JSON_MAX_DEPTH)
  assert.equal(error.documentation, `${origin}/#run-locally`)
  assert.match(error.localCommand, /docker run --rm -e JSON_MAX_DEPTH=256 -e PORT=\d+ -p \d+:\d+/)
})

test('BODY_LIMIT_BYTES validates configuration at startup', () => {
  for (const value of [
    '1',
    '102400',
    '1048576',
    '0',
    '-1',
    '1.5',
    '',
    'NaN',
    'Infinity',
    '9007199254740992',
  ]) {
    const result = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        "import { BODY_LIMIT_BYTES } from './dist/constants.js'; process.stdout.write(String(BODY_LIMIT_BYTES))",
      ],
      {
        cwd: new URL('../', import.meta.url),
        encoding: 'utf8',
        env: { ...process.env, BODY_LIMIT_BYTES: value },
      },
    )
    if (['1', '102400', '1048576'].includes(value)) {
      assert.equal(result.status, 0, result.stderr)
      assert.equal(result.stdout.trim(), value)
    } else {
      assert.notEqual(result.status, 0)
      assert.match(result.stderr, /BODY_LIMIT_BYTES must be a positive safe integer/)
    }
  }
})

test('all body parsers enforce the exact byte boundary', async () => {
  for (const prefix of ['', '/v1']) {
    for (const type of [
      'application/json',
      'text/plain',
      'application/x-www-form-urlencoded',
      'application/octet-stream',
    ]) {
      for (const extra of [0, 1]) {
        const body =
          type === 'application/json'
            ? JSON.stringify(['x'.repeat(BODY_LIMIT_BYTES - 4 + extra)])
            : type === 'application/x-www-form-urlencoded'
              ? `x=${'a'.repeat(BODY_LIMIT_BYTES - 2 + extra)}`
              : 'x'.repeat(BODY_LIMIT_BYTES + extra)
        const response = await post(`${prefix}/echo?json`, body, { 'content-type': type })
        assert.equal(response.status, extra ? 413 : 200, `${prefix} ${type} ${extra}`)
        const payload = await response.json()
        if (extra) assert.equal(payload.limitBytes, BODY_LIMIT_BYTES)
      }
    }
  }
})
