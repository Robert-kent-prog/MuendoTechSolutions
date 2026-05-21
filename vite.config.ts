import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    process.env.VERCEL
      ? nitro({
          vercel: {
            functions: {
              runtime: "nodejs22.x",
            },
          },
        })
      : undefined,
    react(),
    tailwindcss(),
    tsConfigPaths(),
    command === "build" && !process.env.VERCEL ? cloudflare() : undefined,
  ],
}));
