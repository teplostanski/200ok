import { isIP } from "node:net";

export const getClientAddresses = (ip: string | undefined) => {
  const normalizedIp = ip?.replace(/^::ffff:/, "");
  const family = isIP(normalizedIp ?? "");

  const addresses = {
    v4: family === 4 ? (normalizedIp ?? null) : null,
    v6: family === 6 ? (normalizedIp ?? null) : null,
  };

  return addresses;
};
