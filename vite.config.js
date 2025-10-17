import { defineConfig } from 'vite';

export default defineConfig({
  // This will expose all environment variables that start with VITE_ to your client-side code
  define: {
    'import.meta.env.VITE_BREVO_API_KEY': JSON.stringify(process.env.VITE_BREVO_API_KEY)
  }
});
