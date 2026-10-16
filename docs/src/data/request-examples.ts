import { type Locale, messages } from '../i18n/messages'

export const requestExamples = (
  path: string,
  format: string,
  origin: string,
  locale: Locale = 'en',
): { label: string; command: string }[] => {
  const t = messages[locale]
  const host = origin.replace(/^http:\/\//, '')
  const url = `${host}${path}${format === 'json' || format === 'pretty' ? `?${format}` : ''}`
  const target = format !== 'text' ? `'${url}'` : url
  if (path === '/echo') {
    return [
      {
        label: 'POST · JSON',
        command: `curl ${target} \\\n  -H 'Content-Type: application/json' \\\n  --data-binary '{"name":"Bob"}'`,
      },
      {
        label: `POST · ${t.plainText}`,
        command: `curl ${target} \\\n  -H 'Content-Type: text/plain' \\\n  --data-binary 'Hello!'`,
      },
      {
        label: `POST · ${t.form}`,
        command: `curl ${target} \\\n  --data-urlencode 'name=Bob' \\\n  --data-urlencode 'age=42'`,
      },
      {
        label: `POST · ${t.binaryFile}`,
        command: `curl ${target} \\\n  -H 'Content-Type: application/octet-stream' \\\n  --data-binary '@./file.bin'`,
      },
    ]
  }
  if (path === '/headers') {
    return [
      {
        label: t.customHeader,
        command: `curl ${target} \\\n  -H 'X-Test: hello'`,
      },
    ]
  }
  return [{ label: 'GET', command: `curl ${target}` }]
}
