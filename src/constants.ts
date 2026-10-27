export const ROUTES = {
  root: "/",
  health: "/health",
  apiV1: "/v1",
  ip: "/ip",
  ipV4: "/ip/v4",
  ipV6: "/ip/v6",
  echo: "/echo",
  headers: "/headers",
} as const;

export const ROOT_API_PATHS = [ROUTES.ip, ROUTES.echo, ROUTES.headers] as const;

export const FORMATS = {
  plainText: "text",
  json: "json",
  prettyJson: "pretty",
} as const;

export const BODY_LIMIT_BYTES = 102_400;
