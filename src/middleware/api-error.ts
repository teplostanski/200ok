import { STATUS_CODES } from "node:http";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "../utils/send.js";

export const apiNotFound: RequestHandler = (req, res) => {
  const message = `Cannot ${req.method} ${req.originalUrl.split("?")[0]}`;
  send({ res, status: 404, json: { error: message }, text: message });
};

export const apiError: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const errorStatus = err?.status ?? err?.statusCode;
  const status =
    Number.isInteger(errorStatus) && errorStatus >= 400 && errorStatus <= 599
      ? errorStatus
      : 500;
  const message = STATUS_CODES[status] ?? "Internal Server Error";

  if (status >= 500) console.error(err);

  send({ res, status, json: { error: message }, text: message });
};
