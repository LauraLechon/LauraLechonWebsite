// config.js - Configuration loader for Vite/Vercel environment
function() {
    'use strict';

    console.log('Config loader initialized');

    // Initialize brevoConfig if it doesn't exist
    window.brevoConfig = window.brevoConfig || {
        apiUrl: 'https://api.brevo.com/v3/smtp/email',
        apiKey: null,
        isConfigured: false
    };

    // Check for Vite environment variables (works in Vercel)
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = import.meta.env.VITE_BREVO_API_KEY;
        window.brevoConfig.isConfigured = true;
        console.log('Loaded Brevo API key from Vite environment variables');
    }
    // Fallback to window variables (for non-module scripts)
    else if (window.ENV && window.ENV.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = window.ENV.VITE_BREVO_API_KEY;
        window.brevoConfig.isConfigured = true;
        console.log('Loaded Brevo API key from window.ENV');
    }
    // Direct window variable (for Vercel server-side)
    else if (window.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = window.VITE_BREVO_API_KEY;
        console.log('Loaded Brevo API key from window.VITE_BREVO_API_KEY');
    }

    // Mark as configured
    window.brevoConfig.isConfigured = true;

    // Log the configuration (without exposing the full key)
    console.log('Brevo Config:', {
        apiUrl: window.brevoConfig.apiUrl,
        hasApiKey: !!window.brevoConfig.apiKey,
        apiKeyPrefix: window.brevoConfig.apiKey ? 
            (String(window.brevoConfig.apiKey).substring(0, 6) + '...') : 'Not set',
        source: window.brevoConfig.apiKey ? 'environment' : 'default'
    });
})();
