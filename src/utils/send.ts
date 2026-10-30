import type { Response } from "express";
import { FORMATS } from "../constants.js";
import { sendJson } from "./send-json.js";

type SendParam = {
  res: Response;
  json: unknown;
  text: string;
  status?: number;
};

export const send = ({ res, json, text, status = 200 }: SendParam) => {
  if (
    res.locals.format === FORMATS.json ||
    res.locals.format === FORMATS.prettyJson
  ) {
    sendJson(res, json, status);
  } else {
    res.status(status).type("text/plain").send(text);
  }
};
