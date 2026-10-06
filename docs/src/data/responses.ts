import { type Locale, messages } from "../i18n/messages";

export interface ResponseExample {
  status: number;
  label: string;
  description: string;
  text: string;
  json: unknown;
  schema?: Record<string, unknown>;
  alwaysText?: boolean;
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
  if (path === "/v1/echo") {
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
  } else if (path === "/v1/headers") {
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
    const both = path === "/v1/ip";
    const ip = path.endsWith("/v6") ? "2001:db8::1" : "192.0.2.1";
    success = {
      status: 200,
      label: "OK",
      description: t.ipResponse,
      text: both ? "v4: 192.0.2.1\nv6: unknown" : ip,
      json: both ? { v4: ip, v6: null } : { ip },
      schema: objectSchema(
        both ? { v4: nullableIp, v6: nullableIp } : { ip: nullableIp },
      ),
    };
  }

  const responses: ResponseExample[] = [
    success,
    {
      status: 400,
      label: "Bad Request",
      description: t.formatError,
      text: "Unsupported format: xml\nValid values: text, json",
      json: null,
      alwaysText: true,
    },
  ];

  if (path === "/v1/echo") {
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
