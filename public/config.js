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

    // Try multiple sources for the API key
    let apiKey = null;

    // 1. Check for Vite-injected window variable (from vite.config.js define)
    if (window.VITE_BREVO_API_KEY) {
        apiKey = window.VITE_BREVO_API_KEY;
        console.log('Loaded Brevo API key from window.VITE_BREVO_API_KEY');
    }
    // 2. Check for environment variable in window.ENV (Vercel client-side)
    else if (window.ENV && window.ENV.VITE_BREVO_API_KEY) {
        apiKey = window.ENV.VITE_BREVO_API_KEY;
        console.log('Loaded Brevo API key from window.ENV');
    }
    // 3. Check for Vite environment variables in globalThis (Vercel)
    else if (typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env && globalThis.process.env.VITE_BREVO_API_KEY) {
        apiKey = globalThis.process.env.VITE_BREVO_API_KEY;
        console.log('Loaded Brevo API key from Vercel environment variables');
    }
    // 4. Check URL parameters (for testing)
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const urlApiKey = urlParams.get('brevo_api_key');
        if (urlApiKey) {
            apiKey = urlApiKey;
            console.log('Loaded Brevo API key from URL parameter (for testing only)');
        }
    }

    // Set the API key if found
    if (apiKey && apiKey.trim()) {
        window.brevoConfig.apiKey = apiKey;
        window.brevoConfig.isConfigured = true;
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
