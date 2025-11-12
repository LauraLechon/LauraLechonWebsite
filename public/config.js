// config.js - Configuration loader for Vite/Vercel environment
(function() {
    'use strict';

    console.log('Config loader initialized');

    // Initialize brevoConfig if it doesn't exist
    window.brevoConfig = window.brevoConfig || {
        apiUrl: 'https://api.brevo.com/v3/smtp/email',
        apiKey: null,
        isConfigured: false
    };

    // Check for Vite environment variables in globalThis (Vercel)
    if (typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env && globalThis.process.env.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = globalThis.process.env.VITE_BREVO_API_KEY;
        window.brevoConfig.isConfigured = true;
        console.log('Loaded Brevo API key from Vercel environment variables');
    }
    // Check for environment variable in window.ENV (Vercel client-side)
    else if (window.ENV && window.ENV.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = window.ENV.VITE_BREVO_API_KEY;
        window.brevoConfig.isConfigured = true;
        console.log('Loaded Brevo API key from window.ENV');
    }
    // Check for direct window variable (for direct script injection)
    else if (window.VITE_BREVO_API_KEY) {
        window.brevoConfig.apiKey = window.VITE_BREVO_API_KEY;
        window.brevoConfig.isConfigured = true;
        console.log('Loaded Brevo API key from window.VITE_BREVO_API_KEY');
    }
    // Check URL parameters (for testing)
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const apiKey = urlParams.get('brevo_api_key');
        if (apiKey) {
            window.brevoConfig.apiKey = apiKey;
            window.brevoConfig.isConfigured = true;
            console.log('Loaded Brevo API key from URL parameter (for testing only)');
        }
    }

    // Log the configuration (without exposing the full key)
    console.log('Brevo Config:', {
        apiUrl: window.brevoConfig.apiUrl,
        hasApiKey: !!window.brevoConfig.apiKey,
        apiKeyPrefix: window.brevoConfig.apiKey ? 
            (window.brevoConfig.apiKey.substring(0, 6) + '...') : 'Not set',
        source: 'config.js',
        isConfigured: window.brevoConfig.isConfigured
    });
})();
