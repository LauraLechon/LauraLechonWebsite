import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  const rootDir = process.cwd();
  
  return {
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
          main: resolve(rootDir, 'index.html'),
          admin: resolve(rootDir, 'admin.html'),
          adminLogin: resolve(rootDir, 'admin-login.html'),
          booking: resolve(rootDir, 'booking.html'),
          riderLogin: resolve(rootDir, 'rider-login.html'),
          riderDashboard: resolve(rootDir, 'rider-dashboard.html'),
          riderSignup: resolve(rootDir, 'rider-signup.html')
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
