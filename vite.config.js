import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // This will load environment variables from .env files
  // and make them available in your application
  define: {
    'process.env': process.env,
    'import.meta.env.VITE_BREVO_API_KEY': JSON.stringify(process.env.VITE_BREVO_API_KEY)
  },
  resolve: {
    alias: {
      // Add any path aliases here if needed
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // Configure development server options if needed
    port: 3000,
    open: true
  },
  build: {
    // Build configuration
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
