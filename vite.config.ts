import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

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
  ],
  resolve: {
    tsconfigPaths: true,
  },
}));
