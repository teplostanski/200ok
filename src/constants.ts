export const ROUTES = {
  root: "/",
  health: "/health",
  apiV1: "/v1",
  ip: "/ip",
  ipV4: "/ip/v4",
  ipV6: "/ip/v6",
} as const;

export const FORMATS = {
  plainText: "text",
  json: "json",
} as const;
