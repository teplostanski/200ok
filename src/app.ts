import { fileURLToPath } from "node:url";
import express from "express";
import { ROOT_API_PATHS, ROUTES } from "./constants.js";
import { apiError, apiNotFound } from "./middleware/api-error.js";
import { responseFormat } from "./middleware/response-format.js";
import { healthRouter } from "./routes/health.js";
import { v1Router } from "./routes/v1/index.js";

export const app = express();

app.disable("x-powered-by");

if (process.env.TRUST_PROXY?.trim()) {
  app.set("trust proxy", process.env.TRUST_PROXY);
}

app.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("x-glhf", "teplostanski coded this.");
  next();
});

app.all(
  [ROUTES.headers, `${ROUTES.apiV1}${ROUTES.headers}`],
  (_req, res, next) => {
    res.removeHeader("x-glhf");
    next();
  },
);

app.use(healthRouter);
app.use(ROUTES.health, responseFormat, apiNotFound, apiError);
app.use(ROUTES.apiV1, v1Router);
app.use((req, res, next) => {
  const root = `/${req.path.split("/")[1]?.toLowerCase()}`;
  if (ROOT_API_PATHS.some((path) => path === root)) {
    v1Router(req, res, next);
    return;
  }
  next();
});

const docsDirectory = fileURLToPath(new URL("../dist/docs/", import.meta.url));
app.use(express.static(docsDirectory, { cacheControl: false }));

app.use(responseFormat);
app.use(apiNotFound);
app.use(apiError);
