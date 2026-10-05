import { Router } from "express";
import { FORMATS, ROUTES } from "../../constants.js";

export const headersRouter = Router();

headersRouter.get(ROUTES.headers, (req, res) => {
  const headers = req.headers;

  if (res.locals.format === FORMATS.json) {
    res.json(headers);
  } else {
    res.type("text/plain").send(
      Object.entries(headers)
        .map(([key, value]) => `${key}:  ${value}`)
        .join("\n\n"),
    );
  }
});
