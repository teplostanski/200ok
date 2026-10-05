import { Router } from "express";
import { FORMATS, ROUTES } from "../../constants.js";
import { getClientAddresses } from "../../utils/client-addresses.js";

export const ipRouter = Router();

ipRouter.get(ROUTES.ip, (req, res) => {
  const ip = req.ip ?? req.socket.remoteAddress;
  const addresses = getClientAddresses(ip);

  if (res.locals.format === FORMATS.json) {
    res.json(addresses);
  } else {
    res
      .type("text/plain")
      .send(
        `v4: ${addresses.v4 ?? "unknown"}\nv6: ${addresses.v6 ?? "unknown"}`,
      );
  }
});

ipRouter.get(ROUTES.ipV4, (req, res) => {
  const ip = req.ip ?? req.socket.remoteAddress;
  const addresses = getClientAddresses(ip);

  if (res.locals.format === FORMATS.json) {
    res.json({ ip: addresses.v4 });
  } else {
    res.type("text/plain").send(addresses.v4 ?? "unknown");
  }
});

ipRouter.get(ROUTES.ipV6, (req, res) => {
  const ip = req.ip ?? req.socket.remoteAddress;
  const addresses = getClientAddresses(ip);

  if (res.locals.format === FORMATS.json) {
    res.json({ ip: addresses.v6 });
  } else {
    res.type("text/plain").send(addresses.v6 ?? "unknown");
  }
});
