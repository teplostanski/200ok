import type { RequestHandler } from "express";
import { FORMATS } from "../constants.js";

export const responseFormat: RequestHandler = (req, res, next) => {
  if (Object.hasOwn(req.query, FORMATS.prettyJson)) {
    res.locals.format = FORMATS.prettyJson;
  } else if (Object.hasOwn(req.query, FORMATS.json)) {
    res.locals.format = FORMATS.json;
  } else {
    res.locals.format = FORMATS.plainText;
  }

  next();
};
