import { Router } from "express";
import { ROUTES } from "../../constants.js";
import { getClientAddresses } from "../../utils/client-addresses.js";
import { getClientIp } from "../../utils/client-ip.js";
import { send } from "../../utils/send.js";

export const ipRouter = Router();

ipRouter.get(ROUTES.ip, (req, res) => {
  const ip = getClientIp(req);

  send({ res, json: { ip }, text: ip });
});

ipRouter.get(ROUTES.ipV4, (req, res) => {
  const ip = getClientIp(req);
  const addresses = getClientAddresses(ip);

  send({ res, json: { ip: addresses.v4 }, text: addresses.v4 ?? "unknown" });
});

ipRouter.get(ROUTES.ipV6, (req, res) => {
  const ip = getClientIp(req);
  const addresses = getClientAddresses(ip);

  send({ res, json: { ip: addresses.v6 }, text: addresses.v6 ?? "unknown" });
});
