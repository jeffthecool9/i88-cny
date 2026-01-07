import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // same as 0.0.0.0
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."), // because you don't have /src
    },
  },
});
