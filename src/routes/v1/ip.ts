import { Router } from "express";
import { FORMATS, ROUTES } from "../../constants.js";
import { getClientAddresses } from "../../utils/client-addresses.js";
import { getClientIp } from "../../utils/client-ip.js";
import { sendJson } from "../../utils/send-json.js";

export const ipRouter = Router();

ipRouter.get(ROUTES.ip, (req, res) => {
  const ip = getClientIp(req);

  if (
    res.locals.format === FORMATS.json ||
    res.locals.format === FORMATS.prettyJson
  ) {
    sendJson(res, { ip });
  } else {
    res.type("text/plain").send(ip);
  }
});

ipRouter.get(ROUTES.ipV4, (req, res) => {
  const ip = getClientIp(req);
  const addresses = getClientAddresses(ip);

  if (
    res.locals.format === FORMATS.json ||
    res.locals.format === FORMATS.prettyJson
  ) {
    sendJson(res, { ip: addresses.v4 });
  } else {
    res.type("text/plain").send(addresses.v4 ?? "unknown");
  }
});

ipRouter.get(ROUTES.ipV6, (req, res) => {
  const ip = getClientIp(req);
  const addresses = getClientAddresses(ip);

  if (
    res.locals.format === FORMATS.json ||
    res.locals.format === FORMATS.prettyJson
  ) {
    sendJson(res, { ip: addresses.v6 });
  } else {
    res.type("text/plain").send(addresses.v6 ?? "unknown");
  }
});
