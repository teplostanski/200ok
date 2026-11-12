export const parseBaseUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined
  const url = new URL(value)
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'BASE_URL must be an HTTP(S) origin without credentials, path, query or fragment',
    )
  }
  return url.origin
}

export const BASE_URL = parseBaseUrl(process.env.BASE_URL)
