import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://200ok.hacks.run",
  output: "static",
  outDir: "../dist/docs",
  server: { port: 4321 },
  vite: {
    plugins: [tailwindcss()],
  },
});
