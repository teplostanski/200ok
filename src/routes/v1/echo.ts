import { type Request, type Response, Router } from "express";
import { FORMATS, ROUTES } from "../../constants.js";
import { echoBody } from "../../middleware/echo-body.js";

export const echoRouter = Router();
echoRouter.use(ROUTES.echo, echoBody);

const createEchoPayload = (method: string, body: unknown) => {
  if (Buffer.isBuffer(body)) {
    const binaryPayload = {
      encoding: "base64",
      sizeBytes: body.length,
      data: body.toString("base64"),
    };

    return { method, body: binaryPayload };
  }

  return { method, body: body ?? null };
};

const formatValueToText = (value: unknown, depth: number = 0): string => {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (value === null || typeof value !== "object") {
    return String(value);
  }

  if (Object.keys(value).length === 0) {
    return Array.isArray(value) ? "[]" : "{}";
  }

  const indent = "\u0020".repeat(depth * 2);

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (
          item !== null &&
          typeof item === "object" &&
          Object.keys(item).length > 0
        ) {
          const nestedText = formatValueToText(item, depth + 1);
          return `${indent}-\n${nestedText}`;
        }

        return `${indent}- ${formatValueToText(item)}`;
      })
      .join("\n");
  }

  const lines = Object.entries(value).map(([key, nestedValue]) => {
    if (
      nestedValue !== null &&
      typeof nestedValue === "object" &&
      Object.keys(nestedValue).length > 0
    ) {
      const nestedText = formatValueToText(nestedValue, depth + 1);

      return `${indent}${key}:\n${nestedText}`;
    }

    return `${indent}${key}: ${formatValueToText(nestedValue)}`;
  });

  return lines.join("\n");
};

const handleEcho = (req: Request, res: Response) => {
  const { method, body } = createEchoPayload(req.method, req.body);

  const formatEchoAsText = (method: string, body: unknown) => {
    const bodyText = formatValueToText(body);
    return `${method}\n\n${bodyText}`;
  };

  if (res.locals.format === FORMATS.json) {
    res.json({ method, body });
  } else {
    res.type("text/plain").send(formatEchoAsText(method, body));
  }
};

echoRouter.get(ROUTES.echo, handleEcho);
echoRouter.post(ROUTES.echo, handleEcho);
echoRouter.put(ROUTES.echo, handleEcho);
echoRouter.patch(ROUTES.echo, handleEcho);
echoRouter.delete(ROUTES.echo, handleEcho);
