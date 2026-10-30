import { type RequestHandler, raw, text, urlencoded } from "express";
import { BODY_LIMIT_BYTES } from "../constants.js";
import { send } from "../utils/send.js";

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
    send({ res, status: 415, json: { error }, text: error });
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
