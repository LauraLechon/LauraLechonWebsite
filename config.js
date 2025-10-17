// config.js
console.log('Config module loaded');

// Initialize brevoConfig if it doesn't exist
if (!window.brevoConfig) {
    window.brevoConfig = {
        apiUrl: 'https://api.brevo.com/v3/smtp/email',
        apiKey: null
    };
}

// Check for Vite environment variables
if (import.meta.env && import.meta.env.VITE_BREVO_API_KEY) {
    window.brevoConfig.apiKey = import.meta.env.VITE_BREVO_API_KEY;
    console.log('Loaded Brevo API key from Vite environment variables');
}

// Log the configuration (without exposing the full key)
console.log('Brevo Config (from module):', {
    apiUrl: window.brevoConfig.apiUrl,
    hasApiKey: !!window.brevoConfig.apiKey,
    apiKeyPrefix: window.brevoConfig.apiKey ? 
        (window.brevoConfig.apiKey.substring(0, 6) + '...') : 'Not set'
});

// Export the config for other modules
export const config = window.brevoConfig;
