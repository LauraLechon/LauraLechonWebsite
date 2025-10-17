// config.js - Simple configuration loader
(function() {
    'use strict';

    console.log('Config loader initialized');

    // Initialize brevoConfig if it doesn't exist
    window.brevoConfig = window.brevoConfig || {
        apiUrl: 'https://api.brevo.com/v3/smtp/email',
        apiKey: null,
        isConfigured: false
    };

    // Check for environment variable in window.ENV
    if (window.ENV && window.ENV.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = window.ENV.VITE_BREVO_API_KEY;
        console.log('Loaded Brevo API key from window.ENV');
    }
    // Check for direct environment variable (for Vercel)
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
