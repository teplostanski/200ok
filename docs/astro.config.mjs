import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  outDir: "../dist/docs",
  server: { port: 4321 },
  vite: {
    server: {
      proxy: {
        "/v1": "http://127.0.0.1:3000",
        "/health": "http://127.0.0.1:3000",
      },
    },
  },
});
