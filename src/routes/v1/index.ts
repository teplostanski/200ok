import { Router } from "express";
import { responseFormat } from "../../middleware/response-format.js";
import { ipRouter } from "./ip.js";

export const v1Router = Router();

v1Router.use(responseFormat);
v1Router.use(ipRouter);
