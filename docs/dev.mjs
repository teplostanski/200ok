import { dev } from 'astro'
import { listen } from 'listhen'
import { app } from '../src/app.ts'
import { ROOT_API_PATHS, ROUTES } from '../src/constants.ts'

import { HOST, PORT } from '../src/runtime-config.ts'

const api = await listen(app, {
  hostname: HOST,
  port: { port: PORT, alternativePortRange: [PORT, PORT], random: false },
  isProd: false,
  qr: false,
})

try {
  const address = api.address.address
  const host = address === '0.0.0.0' ? '127.0.0.1' : address === '::' ? '::1' : address
  const target = `http://${host.includes(':') ? `[${host}]` : host}:${api.address.port}`
  const docs = await dev({
    root: new URL('./', import.meta.url),
    vite: {
      server: {
        proxy: Object.fromEntries(
          [ROUTES.apiV1, ROUTES.health, ...ROOT_API_PATHS].map(path => [
            `^${RegExp.escape(path)}(?:/|[?]|$)`,
            target,
          ]),
        ),
      },
    },
  })
  app.locals.documentationOrigin =
    docs.resolvedUrls.local[0] ??
    `http://${docs.address.family === 'IPv6' ? `[${docs.address.address}]` : docs.address.address}:${docs.address.port}`
} catch (error) {
  await api.close()
  throw error
}
