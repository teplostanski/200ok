import type { ErrorRequestHandler } from "express";
import { BODY_LIMIT_BYTES, FORMATS } from "../constants.js";

const ERROR_MESSAGE = `Request body exceeds the size limit of ${BODY_LIMIT_BYTES / 1024} KiB`;

export const bodyLimitError: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.type !== "entity.too.large") {
    next(err);
    return;
  }

  res.status(413);

  if (res.locals.format === FORMATS.json) {
    res.json({
      error: ERROR_MESSAGE,
      limitBytes: BODY_LIMIT_BYTES,
    });
  } else {
    res.type("text/plain").send(ERROR_MESSAGE);
  }
};
