import { STATUS_CODES } from "node:http";
import type { ErrorRequestHandler, RequestHandler } from "express";

import { FORMATS } from "../constants.js";

export const apiNotFound: RequestHandler = (_req, res) => {
  res.status(404);

  if (res.locals.format === FORMATS.json) {
    res.json({ error: "Not Found" });
  } else {
    res.type("text/plain").send("Not Found");
  }
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

  res.status(status);

  if (res.locals.format === FORMATS.json) {
    res.json({ error: message });
  } else {
    res.type("text/plain").send(message);
  }
};
