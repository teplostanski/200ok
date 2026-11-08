#!/usr/bin/env bash
set -euo pipefail

image=${1:?Provide the image to test}
run_args=()
if [ -n "${2:-}" ]; then
  run_args+=(--env "PORT=$2")
fi
container=$(docker run --detach "${run_args[@]}" "$image")
cleanup() {
  result=$?
  if [ "$result" -ne 0 ]; then
    docker logs "$container" || true
  fi
  docker rm --force "$container" >/dev/null || true
  exit "$result"
}
trap cleanup EXIT

ready=false
for attempt in {1..30}; do
  if docker exec "$container" node --env-file=.env.production -e "fetch('http://127.0.0.1:' + process.env.PORT + '/health', { signal: AbortSignal.timeout(2000) }).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"; then
    ready=true
    break
  fi
  sleep 2
done
if [ "$ready" != true ]; then
  echo 'Container failed to become ready' >&2
  exit 1
fi

docker exec --interactive "$container" node --env-file=.env.production --input-type=module <<'JS'
import assert from 'node:assert/strict'
assert.ok(process.env.PORT, 'Container must define PORT')
const origin = `http://127.0.0.1:${process.env.PORT}`
for (const path of ['/', '/ru/', '/status-codes', '/index.md', '/ru/index.md', '/llms.txt', '/llms-full.txt']) {
  const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(10000) })
  assert.equal(response.status, 200, path)
  assert.ok((await response.text()).length > 0, path)
}
const markdown = await fetch(origin, { headers: { Accept: 'text/markdown' }, signal: AbortSignal.timeout(10000) })
assert.match(markdown.headers.get('content-type'), /text\/markdown/)
for (const prefix of ['', '/v1']) {
  const response = await fetch(`${origin}${prefix}/echo?json`, {
    method: 'POST',
    signal: AbortSignal.timeout(10000),
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ smoke: true }),
  })
  assert.equal(response.status, 200)
  assert.deepEqual((await response.json()).body, { smoke: true })
}
console.log('Docker smoke test passed')
JS
