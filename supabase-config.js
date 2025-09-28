// Supabase configuration
const SUPABASE_URL = 'https://bugccvyjkxevyfesivkb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Z2Njdnlqa3hldnlmZXNpdmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDI2OTIsImV4cCI6MjA2MTUxODY5Mn0.pr1GyDAKPIi4-1Jvym8DPG5AndOI5qYu44RbxeQuQ0Y';

// Initialize Supabase client without shadowing the global namespace
(function initSupabase() {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('Supabase library not loaded before supabase-config.js');
    return;
  }
  const { createClient } = window.supabase;
  // Replace the supabase namespace (which contains createClient) with the client instance
  window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
})();

// Function to update headers when session changes
function updateSessionHeaders() {
  if (window.supabase && window.supabase.realtime && typeof window.supabase.realtime.setHeaders === 'function') {
    window.supabase.realtime.setHeaders({
      'x-admin-session-id': localStorage.getItem('adminSessionId') || '',
      'x-rider-session-id': localStorage.getItem('riderSessionId') || ''
    });
  }
}

// Listen for storage changes to update headers
window.addEventListener('storage', function(e) {
  if (e.key === 'adminSessionId' || e.key === 'riderSessionId') {
    updateSessionHeaders();
  }
});