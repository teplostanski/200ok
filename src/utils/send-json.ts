import type { Response } from "express";
import { FORMATS } from "../constants.js";

export const sendJson = (res: Response, body: unknown) =>
  res
    .type("application/json")
    .send(
      JSON.stringify(
        body,
        null,
        res.locals.format === FORMATS.prettyJson ? 2 : undefined,
      ),
    );
