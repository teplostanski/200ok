import { isIP } from "node:net";

export const getClientAddresses = (ip: string) => {
  const family = isIP(ip);

  const addresses = {
    v4: family === 4 ? ip : null,
    v6: family === 6 ? ip : null,
  };

  return addresses;
};
