// supabase-config.js - Supabase client configuration
// This file initializes the Supabase client with the provided URL and anon key

// Configuration
const SUPABASE_URL = 'https://bugccvyjkxevyfesivkb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Z2Njdnlqa3hldnlmZXNpdmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDI2OTIsImV4cCI6MjA2MTUxODY5Mn0.pr1GyDAKPIi4-1Jvym8DPG5AndOI5qYu44RbxeQuQ0Y';

// Initialize Supabase client
try {
    // Create Supabase client
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });

    // Attach to window object for global access
    window.supabase = supabaseClient;
    window.supabaseClient = supabaseClient;
    
    // Log successful initialization
    console.log('Supabase client initialized successfully');
    console.log('Supabase URL:', SUPABASE_URL);
    
    // Expose config
    window.supabaseConfig = {
        url: SUPABASE_URL,
        key: '••••••••••••••••••••••••••••••••', // Masked for security
        supabase: '✓ Initialized'
    };
    
} catch (error) {
    console.error('Failed to initialize Supabase:', error);
    
    // Set error state in config
    window.supabaseConfig = {
        url: '✗ Missing',
        anonKey: '✗ Missing',
        supabase: '✗ Initialization failed: ' + (error.message || 'Unknown error')
    };
}

// Helper function to update realtime headers
function updateSessionHeaders() {
    if (window.supabase?.realtime?.setHeaders) {
        window.supabase.realtime.setHeaders({
            'x-rider-session-id': localStorage.getItem('riderSessionId') || ''
        });
    }
}

// Listen for storage events to update headers
window.addEventListener('storage', (event) => {
    if (event.key === 'riderSessionId') {
        updateSessionHeaders();
    }
});
