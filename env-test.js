// Test script to check environment variables
console.log('Environment Variables Test');
console.log('------------------------');

// Check for Vite environment variables
console.log('Checking Vite environment variables...');
if (typeof import.meta !== 'undefined' && import.meta.env) {
  console.log('import.meta.env.VITE_BREVO_API_KEY exists?', 'VITE_BREVO_API_KEY' in import.meta.env);
  console.log('import.meta.env keys:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
} else {
  console.log('import.meta.env not available');
}

// Check for window environment variables
console.log('\nChecking window object for environment variables...');
console.log('window.VITE_BREVO_API_KEY exists?', 'VITE_BREVO_API_KEY' in window);
console.log('window.brevoConfig:', window.brevoConfig);

// Check for process.env (Node.js)
console.log('\nChecking process.env...');
if (typeof process !== 'undefined' && process.env) {
  console.log('process.env.VITE_BREVO_API_KEY exists?', 'VITE_BREVO_API_KEY' in process.env);
  console.log('process.env keys starting with VITE_:', 
    Object.keys(process.env).filter(k => k.startsWith('VITE_')));
} else {
  console.log('process.env not available');
}

console.log('\nCurrent brevoConfig:', window.brevoConfig || 'Not defined');
