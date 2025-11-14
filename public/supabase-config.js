// supabase-config.js - Safe Supabase client initialization
// NOTE: Supabase anon keys are safe to expose in client-side code when RLS is properly configured

// Supabase configuration
const SUPABASE_URL = 'https://bugccvyjkxevyfesivkb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Z2Njdnlqa3hldnlmZXNpdmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDI2OTIsImV4cCI6MjA2MTUxODY5Mn0.pr1GyDAKPIi4-1Jvym8DPG5AndOI5qYu44RbxeQuQ0Y';

// Initialize Supabase client
let supabaseClient = null;

// Function to get or create Supabase client
function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }
  
  try {
    // Check if Supabase is available
    if (window.supabase && window.supabase.createClient) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      
      console.log('Supabase client initialized successfully');
      return supabaseClient;
    } else {
      console.error('Supabase client not found. Make sure to include the Supabase JS client library.');
      return null;
    }
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    return null;
  }
}

// Initialize when running in browser
if (typeof window !== 'undefined') {
  // Create a single instance of the Supabase client
  if (!window.supabase) {
    window.supabase = getSupabaseClient();
  }
  
  // Helper to update realtime headers
  function updateSessionHeaders() {
    if (window.supabase?.realtime?.setHeaders) {
      window.supabase.realtime.setHeaders({
        'x-rider-session-id': localStorage.getItem('riderSessionId') || ''
      });
    }
  }
  
  // Listen for session ID changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'riderSessionId') updateSessionHeaders();
  });
  
  // Initial headers update
  updateSessionHeaders();
}

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { supabase: window.supabase };
}
