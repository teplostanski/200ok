import { type Locale, messages } from "../i18n/messages";

export function requestExamples(
  path: string,
  format: string,
  origin = "http://localhost:3000",
  locale: Locale = "en",
): { label: string; command: string }[] {
  const t = messages[locale];
  const url = `${origin}${path}${format === "json" ? "?format=json" : ""}`;
  if (path === "/v1/echo") {
    return [
      {
        label: "POST · JSON",
        command: `curl '${url}' \\\n  -H 'Content-Type: application/json' \\\n  --data-binary '{"name":"Bob"}'`,
      },
      {
        label: `POST · ${t.plainText}`,
        command: `curl '${url}' \\\n  -H 'Content-Type: text/plain' \\\n  --data-binary 'Hello!'`,
      },
      {
        label: `POST · ${t.form}`,
        command: `curl '${url}' \\\n  --data-urlencode 'name=Bob' \\\n  --data-urlencode 'age=42'`,
      },
      {
        label: `POST · ${t.binaryFile}`,
        command: `curl '${url}' \\\n  -H 'Content-Type: application/octet-stream' \\\n  --data-binary '@./file.bin'`,
      },
    ];
  }
  if (path === "/v1/headers") {
    return [
      {
        label: t.customHeader,
        command: `curl '${url}' \\\n  -H 'X-Test: hello'`,
      },
    ];
  }
  return [{ label: "GET", command: `curl '${url}'` }];
}
