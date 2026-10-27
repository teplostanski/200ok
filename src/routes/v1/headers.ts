import { Router } from "express";
import { FORMATS, ROUTES } from "../../constants.js";
import { sendJson } from "../../utils/send-json.js";

export const headersRouter = Router();

headersRouter.get(ROUTES.headers, (req, res) => {
  const headers = req.headers;

  if (
    res.locals.format === FORMATS.json ||
    res.locals.format === FORMATS.prettyJson
  ) {
    sendJson(res, headers);
  } else {
    res.type("text/plain").send(
      Object.entries(headers)
        .map(([key, value]) => `${key}:  ${value}`)
        .join("\n\n"),
    );
  }
});
