import { Router } from "express";
import { ROUTES } from "../constants.js";

export const healthRouter = Router();

healthRouter.get(ROUTES.health, (_req, res) => {
  res.json({ status: "ok" });
});
