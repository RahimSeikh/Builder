import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tanstack/react-start": path.resolve(__dirname, "./src/_spa-shims/start.ts"),
      "@tanstack/react-start/server-entry": path.resolve(__dirname, "./src/_spa-shims/empty.ts"),
      "@tanstack/start": path.resolve(__dirname, "./src/_spa-shims/start.ts"),
    },
  },
  build: { outDir: "dist", emptyOutDir: true, cssMinify: "esbuild" },
});
