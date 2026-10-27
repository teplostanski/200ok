import { app } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const server = app.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`);
});
server.on("error", (error) => {
  console.error("Server failed:", error.message);
  process.exitCode = 1;
});

let shuttingDown = false;
const shutdown = () => {
  if (shuttingDown) return;
  shuttingDown = true;
  setTimeout(() => process.exit(1), 10_000).unref();
  server.close((error) => process.exit(error ? 1 : 0));
};
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
