import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(), // inlines all JS/CSS into a single HTML file
  ],
  root: "presenter",
  build: {
    outDir: "../out/presenter",
    emptyOutDir: true,
    // viteSingleFile requires inlining dynamic imports
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
