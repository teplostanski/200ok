export type DocumentationFormat = 'html' | 'markdown'

export const documentationFormat = (accept = '*/*'): DocumentationFormat | undefined => {
  const ranges = accept.split(',').map(part => {
    const [rawType = '', ...parameters] = part.trim().toLowerCase().split(';')
    const quality = parameters.find(parameter => parameter.trim().startsWith('q='))
    const rawQuality = quality?.trim().slice(2) ?? '1'
    const q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(rawQuality) ? Number(rawQuality) : 0
    return { type: rawType.trim(), q }
  })
  const qualityFor = (type: string) => {
    for (const candidate of [type, 'text/*', '*/*']) {
      const matches = ranges.filter(range => range.type === candidate)
      if (matches.length) return Math.max(...matches.map(range => range.q))
    }
    return 0
  }
  const html = qualityFor('text/html')
  const markdown = qualityFor('text/markdown')
  const explicitMarkdown = ranges.some(range => range.type === 'text/markdown' && range.q > 0)
  if (markdown > 0 && (markdown > html || (markdown === html && explicitMarkdown)))
    return 'markdown'
  if (html > 0) return 'html'
  return undefined
}
