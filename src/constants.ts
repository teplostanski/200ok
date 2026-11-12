export const ROUTES = {
  health: '/health',
  apiV1: '/v1',
  ip: '/ip',
  ipV4: '/ip/v4',
  ipV6: '/ip/v6',
  echo: '/echo',
  headers: '/headers',
  statusRoot: '/status',
  status: '/status/:code',
} as const

export const ROOT_API_PATHS = [ROUTES.ip, ROUTES.echo, ROUTES.headers, ROUTES.statusRoot] as const

export const FORMATS = {
  plainText: 'text',
  json: 'json',
  prettyJson: 'pretty',
} as const

export const BODY_LIMIT_BYTES = Number(process.env.BODY_LIMIT_BYTES ?? 102_400)
if (!Number.isSafeInteger(BODY_LIMIT_BYTES) || BODY_LIMIT_BYTES < 1) {
  throw new Error('BODY_LIMIT_BYTES must be a positive safe integer')
}

export const JSON_MAX_DEPTH = Number(process.env.JSON_MAX_DEPTH ?? 64)
if (!Number.isInteger(JSON_MAX_DEPTH) || JSON_MAX_DEPTH < 1 || JSON_MAX_DEPTH > 512) {
  throw new Error('JSON_MAX_DEPTH must be an integer between 1 and 512')
}
