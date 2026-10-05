export const ROUTES = {
  root: "/",
  health: "/health",
  apiV1: "/v1",
  ip: "/ip",
  ipV4: "/ip/v4",
  ipV6: "/ip/v6",
  echo: "/echo",
} as const;

export const FORMATS = {
  plainText: "text",
  json: "json",
} as const;

export const BODY_LIMIT_BYTES = 102_400;
