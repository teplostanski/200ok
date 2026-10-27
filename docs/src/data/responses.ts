import { type Locale, messages } from "../i18n/messages";

export interface ResponseExample {
  status: number;
  label: string;
  description: string;
  text: string;
  json: unknown;
  schema?: Record<string, unknown>;
}

const nullableIp = { type: ["string", "null"] };
const objectSchema = (properties: Record<string, unknown>) => ({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});

export function responsesFor(
  path: string,
  locale: Locale = "en",
): ResponseExample[] {
  const t = messages[locale];
  let success: ResponseExample;
  if (path === "/echo") {
    success = {
      status: 200,
      label: "OK",
      description: t.echoResponse,
      text: "GET\n\nnull",
      json: { method: "GET", body: null },
      schema: objectSchema({
        method: { type: "string" },
        body: {
          description: t.bodySchema,
          type: ["object", "array", "string", "number", "boolean", "null"],
        },
      }),
    };
  } else if (path === "/headers") {
    success = {
      status: 200,
      label: "OK",
      description: t.headersResponse,
      text: "host:  localhost:3000\n\naccept:  */*",
      json: { host: "localhost:3000", accept: "*/*" },
      schema: {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        type: "object",
        additionalProperties: {
          anyOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
          ],
        },
      },
    };
  } else {
    const ip = path.endsWith("/v6") ? "2001:db8::1" : "192.0.2.1";
    success = {
      status: 200,
      label: "OK",
      description: path === "/ip" ? t.ipCurrent : t.ipResponse,
      text: ip,
      json: { ip },
      schema: objectSchema({
        ip:
          path === "/ip"
            ? { type: "string", description: t.ipCurrent }
            : nullableIp,
      }),
    };
  }

  const responses: ResponseExample[] = [success];

  if (path === "/echo") {
    const error = "Request body exceeds the size limit of 100 KiB";
    const unsupported =
      "Unsupported Content-Type. Supported: application/json, text/plain, application/x-www-form-urlencoded, application/octet-stream";
    responses.push(
      {
        status: 413,
        label: "Payload Too Large",
        description: t.limitError,
        text: error,
        json: { error, limitBytes: 102400 },
        schema: objectSchema({
          error: { type: "string" },
          limitBytes: { type: "integer", const: 102400 },
        }),
      },
      {
        status: 415,
        label: "Unsupported Media Type",
        description: t.contentTypeError,
        text: unsupported,
        json: { error: unsupported },
        schema: objectSchema({ error: { type: "string" } }),
      },
    );
  }
  return responses;
}
