// supabase-config.js - safe client init
// NOTE: Supabase anon keys are safe to expose in client-side code when RLS is properly configured
// They only provide limited access based on your Row Level Security policies

// Load configuration from environment or config files
const SUPABASE_URL = window.env?.VITE_SUPABASE_URL || 'https://bugccvyjkxevyfesivkb.supabase.co';
const SUPABASE_KEY = window.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Z2Njdnlqa3hldnlmZXNpdmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDI2OTIsImV4cCI6MjA2MTUxODY5Mn0.pr1GyDAKPIi4-1Jvym8DPG5AndOI5qYu44RbxeQuQ0Y';

// Note: Brevo API key is initialized in config.js
// Do not initialize here to avoid conflicts

// Wait for @supabase/supabase-js to load, then create client once
(async function initSupabaseSafe() {
  const waitForSdk = () =>
    new Promise((resolve, reject) => {
      let attempts = 0;
      const check = () => {
        // Some CDN builds attach `Supabase` or `supabase`. Try both.
        if (window.supabase && typeof window.supabase.createClient === 'function') return resolve(window.supabase);
        if (window.Supabase && typeof window.Supabase.createClient === 'function') return resolve(window.Supabase);
        if (attempts++ > 50) return reject(new Error('Supabase SDK not loaded'));
        setTimeout(check, 100);
      };
      check();
    });

  try {
    await waitForSdk();

    // prefer existing namespace createClient (some builds export createClient on supabase/Supabase)
    const createClient =
      (window.supabase && window.supabase.createClient) ||
      (window.Supabase && window.Supabase.createClient);

    if (!createClient) throw new Error('Supabase createClient not available');

    if (!window.__supabase_client__) {
      window.__supabase_client__ = createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      // attach for convenience
      window.supabaseClient = window.__supabase_client__;
      // also attach to window.supabase to preserve existing code using window.supabase
      window.supabase = window.__supabase_client__;
      console.log('Supabase client initialized (safe).');
    } else {
      // already created earlier
      window.supabase = window.__supabase_client__;
      window.supabaseClient = window.__supabase_client__;
      console.log('Supabase client already initialized.');
    }

  } catch (err) {
    console.error('Failed to initialize Supabase:', err);
  }
})();

// helper to update realtime headers (if you use realtime header changes)
function updateSessionHeaders() {
  if (window.supabase && window.supabase.realtime && typeof window.supabase.realtime.setHeaders === 'function') {
    window.supabase.realtime.setHeaders({
      'x-rider-session-id': localStorage.getItem('riderSessionId') || ''
    });
  }
}

window.addEventListener('storage', (e) => {
  if (e.key === 'riderSessionId') updateSessionHeaders();
});
