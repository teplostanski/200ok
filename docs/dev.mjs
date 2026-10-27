import { dev } from "astro";
import { listen } from "listhen";
import { app } from "../src/app.ts";
import { ROOT_API_PATHS, ROUTES } from "../src/constants.ts";

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const api = await listen(app, {
  hostname: process.env.HOST ?? "127.0.0.1",
  port:
    process.env.PORT === undefined
      ? port
      : { port, alternativePortRange: [port, port], random: false },
  isProd: false,
  qr: false,
});

try {
  const address = api.address.address;
  const host =
    address === "0.0.0.0" ? "127.0.0.1" : address === "::" ? "::1" : address;
  const target = `http://${host.includes(":") ? `[${host}]` : host}:${api.address.port}`;
  await dev({
    root: new URL("./", import.meta.url),
    vite: {
      server: {
        proxy: Object.fromEntries(
          [ROUTES.apiV1, ROUTES.health, ...ROOT_API_PATHS].map((path) => [
            `^${RegExp.escape(path)}(?:/|[?]|$)`,
            target,
          ]),
        ),
      },
    },
  });
} catch (error) {
  await api.close();
  throw error;
}
