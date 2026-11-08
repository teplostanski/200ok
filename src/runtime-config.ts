const host = process.env.HOST
if (typeof host !== 'string' || !host.trim()) throw new Error('HOST must be set')
export const HOST = host

export const PORT = Number(process.env.PORT)
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535')
}

if (process.env.TRUST_PROXY === undefined) {
  throw new Error('TRUST_PROXY must be set; use an empty value to disable proxy trust')
}
export const TRUST_PROXY = process.env.TRUST_PROXY.trim()
