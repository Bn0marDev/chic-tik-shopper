
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Allow connections from all network interfaces
    port: 8080,
    strictPort: false, // Allow fallback to other ports if 8080 is in use
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: [], // Exclude problematic dependencies if needed
  },
  build: {
    target: 'es2015', // Ensure better compatibility with older JS engines
    minify: 'terser',
    terserOptions: {
      compress: {
        // Reduce memory usage during build
        keep_infinity: true,
        passes: 1
      }
    }
  }
}));
