import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 5174,

    // ✅ IMPORTANT: allow wildcard subdomains
    allowedHosts: [
      ".lvh.me",          // allows *.lvh.me
      ".event.lvh.me",    // allows *.event.lvh.me
    ],

    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
