import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    root: '.',
    publicDir: 'public',
    // This will expose all environment variables that start with VITE_ to your client-side code
    define: {
      // For Vite's import.meta.env
      'import.meta.env.VITE_BREVO_API_KEY': JSON.stringify(env.VITE_BREVO_API_KEY),
      // For direct access in non-module scripts
      'window.VITE_BREVO_API_KEY': JSON.stringify(env.VITE_BREVO_API_KEY),
      // For Vercel's environment variables
      'window.ENV': {
        VITE_BREVO_API_KEY: env.VITE_BREVO_API_KEY
      }
    },
    // Configure the development server
    server: {
      port: 3000,
      open: true
    },
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html'),
          adminLogin: resolve(__dirname, 'admin-login.html'),
          booking: resolve(__dirname, 'booking.html'),
          riderLogin: resolve(__dirname, 'rider-login.html'),
          riderDashboard: resolve(__dirname, 'rider-dashboard.html'),
          riderSignup: resolve(__dirname, 'rider-signup.html')
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]'
        }
      }
    }
  };
});
