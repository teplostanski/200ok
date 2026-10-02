import express from "express";

export const app = express();

app.disable("x-powered-by");

if (process.env.TRUST_PROXY?.trim()) {
  app.set("trust proxy", process.env.TRUST_PROXY);
}

app.get("/", (req, res) => {
  const ip = req.ip ?? req.socket.remoteAddress;
  res.set("Cache-Control", "no-store");
  res.type("text/plain").send(ip?.replace(/^::ffff:/, "") ?? "unknown");
});
