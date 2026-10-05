import { type RequestHandler, raw, text, urlencoded } from "express";
import { BODY_LIMIT_BYTES, FORMATS } from "../constants.js";

const validateContentType: RequestHandler = (req, res, next) => {
  const hasBody =
    req.headers["transfer-encoding"] !== undefined ||
    Number(req.headers["content-length"] ?? 0) > 0;

  if (
    hasBody &&
    !req.is([
      "application/json",
      "text/plain",
      "application/x-www-form-urlencoded",
      "application/octet-stream",
    ])
  ) {
    const error =
      "Unsupported Content-Type. Supported: application/json, text/plain, application/x-www-form-urlencoded, application/octet-stream";
    res.status(415);
    if (res.locals.format === FORMATS.json) {
      res.json({ error });
    } else {
      res.type("text/plain").send(error);
    }
    return;
  }

  next();
};

export const echoBody = [
  validateContentType,
  text({ limit: BODY_LIMIT_BYTES }),
  urlencoded({ extended: false, limit: BODY_LIMIT_BYTES }),
  raw({
    type: "application/octet-stream",
    limit: BODY_LIMIT_BYTES,
  }),
];
