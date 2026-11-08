import './environment.mjs'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'

const readConfig = overrides =>
  spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      "import { HOST, PORT, TRUST_PROXY } from './dist/runtime-config.js'; process.stdout.write(JSON.stringify({ HOST, PORT, TRUST_PROXY }))",
    ],
    {
      cwd: new URL('../', import.meta.url),
      encoding: 'utf8',
      env: { ...process.env, ...overrides },
    },
  )

test('runtime uses explicit host, port and proxy settings', () => {
  const result = readConfig({ HOST: '::1', PORT: '43191', TRUST_PROXY: 'loopback' })
  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(JSON.parse(result.stdout), { HOST: '::1', PORT: 43191, TRUST_PROXY: 'loopback' })
  const disabled = readConfig({ TRUST_PROXY: '' })
  assert.equal(disabled.status, 0, disabled.stderr)
  assert.equal(JSON.parse(disabled.stdout).TRUST_PROXY, '')
})

test('runtime rejects missing settings and invalid ports instead of supplying defaults', () => {
  for (const [overrides, message] of [
    [{ HOST: undefined }, /HOST must be set/],
    [{ PORT: undefined }, /PORT must be an integer/],
    [{ PORT: '' }, /PORT must be an integer/],
    [{ PORT: '0' }, /PORT must be an integer/],
    [{ PORT: '65536' }, /PORT must be an integer/],
    [{ PORT: '1.5' }, /PORT must be an integer/],
    [{ TRUST_PROXY: undefined }, /TRUST_PROXY must be set/],
  ]) {
    const result = readConfig(overrides)
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, message)
  }
})
