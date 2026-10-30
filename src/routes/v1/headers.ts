import { Router } from "express";
import { ROUTES } from "../../constants.js";
import { send } from "../../utils/send.js";

export const headersRouter = Router();

headersRouter.get(ROUTES.headers, (req, res) => {
  const headers = req.headers;

  const text = Object.entries(headers)
    .map(([key, value]) => `${key}:  ${value}`)
    .join("\n\n");

  send({ res, json: headers, text });
});
