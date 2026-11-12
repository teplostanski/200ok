import type { RequestHandler } from 'express'
import { BASE_URL } from '../base-url.js'
import { JSON_MAX_DEPTH } from '../constants.js'
import { send } from '../utils/send.js'

export const jsonDepthLimit: RequestHandler = (req, res, next) => {
  const pending: { value: unknown; depth: number }[] = [{ value: req.body, depth: 1 }]
  while (pending.length > 0) {
    const entry = pending.pop()
    if (!entry || entry.value === null || typeof entry.value !== 'object') continue
    if (entry.depth > JSON_MAX_DEPTH) {
      const error = `JSON body exceeds the nesting limit of ${JSON_MAX_DEPTH} levels`
      const hint =
        JSON_MAX_DEPTH < 512
          ? 'For deeper JSON testing, run the service locally and configure JSON_MAX_DEPTH (1-512).'
          : 'The maximum supported JSON nesting is 512 levels. Reduce the nesting of this request.'
      const origin =
        BASE_URL ?? req.app.locals.documentationOrigin ?? `${req.protocol}://${req.get('host')}`
      const documentation = new URL('/#run-locally', origin).href
      const exampleDepth = Math.min(512, Math.max(256, JSON_MAX_DEPTH * 2))
      const localCommand = `docker run --rm -e JSON_MAX_DEPTH=${exampleDepth} -p 3000:3000 ghcr.io/teplostanski/200ok:latest`
      send({
        res,
        status: 400,
        json: { error, limitDepth: JSON_MAX_DEPTH, hint, documentation, localCommand },
        text: `${error}\n${hint}\n${localCommand}\n${documentation}`,
      })
      return
    }
    for (const value of Object.values(entry.value)) {
      if (value !== null && typeof value === 'object') {
        pending.push({ value, depth: entry.depth + 1 })
      }
    }
  }
  next()
}
