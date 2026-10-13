import { fileURLToPath } from "node:url";
import express from "express";
import { ROUTES } from "./constants.js";
import { defaultLocale, localeFromPath } from "./locales.js";
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

const docsDirectory = fileURLToPath(new URL("../dist/docs/", import.meta.url));
app.use(express.static(docsDirectory, { cacheControl: false }));

app.use((req, res, next) => {
  if (
    (req.method !== "GET" && req.method !== "HEAD") ||
    req.path === ROUTES.apiV1 ||
    req.path.startsWith(`${ROUTES.apiV1}/`)
  ) {
    next();
    return;
  }

  const locale = localeFromPath(req.path);
  const page =
    locale === defaultLocale ? "404.html" : `${locale}/404/index.html`;
  res.status(404).sendFile(page, { root: docsDirectory }, (error) => {
    if (error) next(error);
  });
});
