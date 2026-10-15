import type { Request } from "express";

export const getClientIp = (req: Request): string => {
  const ip = req.ip ?? req.socket.remoteAddress;

  if (ip === undefined) {
    throw new Error("Client IP address is unavailable");
  }

  return ip.replace(/^::ffff:/, "");
};
