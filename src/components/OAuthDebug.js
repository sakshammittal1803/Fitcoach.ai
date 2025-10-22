import React, { useState, useEffect } from 'react';

const OAuthDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const checkConfiguration = () => {
      const info = {
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        currentUrl: window.location.origin,
        googleLoaded: !!window.google,
        googleAccounts: !!(window.google && window.google.accounts),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };
      setDebugInfo(info);
    };

    checkConfiguration();
    
    // Check again after Google script loads
    const interval = setInterval(checkConfiguration, 1000);
    setTimeout(() => clearInterval(interval), 10000);
  }, []);

  const testDirectAuth = () => {
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.initialize({
          client_id: debugInfo.clientId,
          callback: (response) => {
            console.log('Direct test response:', response);
            if (response.error) {
              alert('OAuth Error: ' + response.error + '\n\nCheck Google Cloud Console configuration.');
            } else {
              alert('OAuth Success! Check console for details.');
            }
          },
        });
        
        window.google.accounts.id.prompt((notification) => {
          console.log('Prompt notification:', notification.getMomentType());
          if (notification.isNotDisplayed()) {
            alert('Google prompt not displayed. Possible configuration issue.');
          }
        });
      } catch (error) {
        alert('Direct test failed: ' + error.message);
      }
    } else {
      alert('Google API not loaded');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm">
      <h3 className="font-bold text-sm mb-2">OAuth Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>Client ID: {debugInfo.clientId ? '✅ Set' : '❌ Missing'}</div>
        <div>Current URL: {debugInfo.currentUrl}</div>
        <div>Google API: {debugInfo.googleLoaded ? '✅ Loaded' : '❌ Not loaded'}</div>
        <div>Accounts API: {debugInfo.googleAccounts ? '✅ Available' : '❌ Not available'}</div>
      </div>
      <button 
        onClick={testDirectAuth}
        className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
      >
        Test OAuth
      </button>
      <button 
        onClick={() => window.open('/google-test.html', '_blank')}
        className="mt-2 ml-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
      >
        Standalone Test
      </button>
    </div>
  );
};

export default OAuthDebug;