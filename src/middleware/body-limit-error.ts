import type { ErrorRequestHandler } from "express";
import { BODY_LIMIT_BYTES } from "../constants.js";
import { send } from "../utils/send.js";

const ERROR_MESSAGE = `Request body exceeds the size limit of ${BODY_LIMIT_BYTES / 1024} KiB`;

export const bodyLimitError: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.type !== "entity.too.large") {
    next(err);
    return;
  }

  send({
    res,
    status: 413,
    json: { error: ERROR_MESSAGE, limitBytes: BODY_LIMIT_BYTES },
    text: ERROR_MESSAGE,
  });
};
