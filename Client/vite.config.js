import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/uploadFoto": "http://localhost:3001",
      "/registro": "http://localhost:3001",
      "/entrada": "http://localhost:3001",
      "/downloadItem": "http://localhost:3001",
      "/deleteItem": "http://localhost:3001",
      "/videoStream": "http://localhost:3001",
    },
  },
});
