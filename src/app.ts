import express from "express";
import { ROUTES } from "./constants.js";
import { healthRouter } from "./routes/health.js";
import { v1Router } from "./routes/v1/index.js";

export const app = express();

app.disable("x-powered-by");
app.set("json spaces", 2);

if (process.env.TRUST_PROXY?.trim()) {
  app.set("trust proxy", process.env.TRUST_PROXY);
}

app.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(healthRouter);
app.use(ROUTES.apiV1, v1Router);
