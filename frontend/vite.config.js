import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // ⬅️ This allows access via LAN (e.g., 192.168.x.x)
    port: 5173, // Optional: default Vite port
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/uploads/videos": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
