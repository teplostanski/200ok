import type { RequestHandler } from "express";
import { FORMATS } from "../constants.js";

export const responseFormat: RequestHandler = (req, res, next) => {
  const format = req.query.format;
  const json = req.query.json;
  const message =
    typeof format === "string"
      ? `Unsupported format: ${format}`
      : "Expected a single format value";

  if (format === undefined) {
    if (json === "") {
      res.locals.format = FORMATS.json;
    } else {
      res.locals.format = FORMATS.plainText;
    }
  } else if (format === FORMATS.plainText) {
    res.locals.format = FORMATS.plainText;
  } else if (format === FORMATS.json) {
    res.locals.format = FORMATS.json;
  } else {
    res
      .status(400)
      .type("text/plain")
      .send(`${message}. Valid values: ${FORMATS.plainText}, ${FORMATS.json}`);
    return;
  }

  next();
};
