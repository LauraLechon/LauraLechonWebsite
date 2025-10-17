// config.js - Universal configuration loader
(function() {
    'use strict';

    console.log('Config loader initialized');

    // Initialize brevoConfig if it doesn't exist
    if (!window.brevoConfig) {
        window.brevoConfig = {
            apiUrl: 'https://api.brevo.com/v3/smtp/email',
            apiKey: null,
            isConfigured: false
        };
    }

    // Check for environment variables (set by Vite or other build tools)
    function loadFromEnvironment() {
        try {
            // Check for Vite environment variables
            if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BREVO_API_KEY) {
                window.brevoConfig.apiKey = import.meta.env.VITE_BREVO_API_KEY;
                console.log('Loaded Brevo API key from Vite environment variables');
                return true;
            }
            // Check for Vercel environment variables
            else if (process && process.env && process.env.VITE_BREVO_API_KEY) {
                window.brevoConfig.apiKey = process.env.VITE_BREVO_API_KEY;
                console.log('Loaded Brevo API key from process.env');
                return true;
            }
        } catch (e) {
            console.warn('Error loading from environment:', e.message);
        }
        return false;
    }

    // Try to load from environment variables first
    const envLoaded = loadFromEnvironment();
    
    // If not loaded from environment, try to use a default config
    if (!envLoaded && window.defaultBrevoConfig) {
        Object.assign(window.brevoConfig, window.defaultBrevoConfig);
        console.log('Loaded default Brevo configuration');
    }

    // Mark as configured
    window.brevoConfig.isConfigured = true;

    // Log the configuration (without exposing the full key)
    console.log('Brevo Config:', {
        apiUrl: window.brevoConfig.apiUrl,
        hasApiKey: !!window.brevoConfig.apiKey,
        apiKeyPrefix: window.brevoConfig.apiKey ? 
            (window.brevoConfig.apiKey.substring(0, 6) + '...') : 'Not set',
        source: envLoaded ? 'environment' : 'default'
    });
})();
