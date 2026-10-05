import { json, Router } from "express";
import { BODY_LIMIT_BYTES } from "../../constants.js";
import { bodyLimitError } from "../../middleware/body-limit-error.js";
import { responseFormat } from "../../middleware/response-format.js";
import { echoRouter } from "./echo.js";
import { ipRouter } from "./ip.js";

export const v1Router = Router();

v1Router.use(responseFormat);
v1Router.use(json({ limit: BODY_LIMIT_BYTES }));
v1Router.use(ipRouter);
v1Router.use(echoRouter);
v1Router.use(bodyLimitError);
