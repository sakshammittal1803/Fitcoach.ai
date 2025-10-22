import React, { useEffect, useState } from 'react';

const GoogleAuthTest = () => {
    const [status, setStatus] = useState('Checking Google OAuth...');
    const [logs, setLogs] = useState([]);

    const addLog = (message) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    useEffect(() => {
        testGoogleOAuth();
    }, []);

    const testGoogleOAuth = async () => {
        addLog('Starting Google OAuth test...');

        // Check if Google script is loaded
        if (window.google) {
            addLog('✅ Google Identity Services already loaded');
            setStatus('Google loaded - ready to test');
        } else {
            addLog('⏳ Loading Google Identity Services...');
            setStatus('Loading Google script...');

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;

            script.onload = () => {
                addLog('✅ Google Identity Services loaded successfully');
                setStatus('Google loaded - ready to test');
                initializeGoogle();
            };

            script.onerror = () => {
                addLog('❌ Failed to load Google Identity Services');
                setStatus('Failed to load Google script');
            };

            document.head.appendChild(script);
        }
    };

    const initializeGoogle = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        addLog(`Using Client ID: ${clientId}`);

        if (window.google && window.google.accounts) {
            try {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });
                addLog('✅ Google OAuth initialized successfully');
                setStatus('Ready for authentication');
            } catch (error) {
                addLog(`❌ Error initializing Google OAuth: ${error.message}`);
                setStatus('Initialization failed');
            }
        } else {
            addLog('❌ Google accounts API not available');
            setStatus('Google API not available');
        }
    };

    const handleGoogleResponse = (response) => {
        addLog('🎉 Google authentication successful!');
        addLog(`Received credential: ${response.credential ? 'Yes' : 'No'}`);

        if (response.credential) {
            try {
                const userInfo = parseJwt(response.credential);
                addLog(`User: ${userInfo.name} (${userInfo.email})`);
                setStatus('Authentication successful!');
            } catch (error) {
                addLog(`❌ Error parsing user info: ${error.message}`);
            }
        }
    };

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    };

    const testGoogleLogin = () => {
        addLog('🔄 Attempting Google sign-in...');

        if (window.google && window.google.accounts) {
            window.google.accounts.id.prompt((notification) => {
                addLog(`Prompt result: ${notification.getMomentType()}`);

                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    addLog('⚠️ Prompt not displayed, rendering button...');
                    renderGoogleButton();
                }
            });
        } else {
            addLog('❌ Google not available for sign-in');
        }
    };

    const renderGoogleButton = () => {
        const buttonContainer = document.getElementById('test-google-button');
        if (buttonContainer && window.google) {
            buttonContainer.innerHTML = '';
            window.google.accounts.id.renderButton(buttonContainer, {
                theme: 'outline',
                size: 'large',
                width: '300',
            });
            addLog('✅ Google button rendered');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Google OAuth Test</h2>

            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold">Status: {status}</p>
            </div>

            <div className="mb-4 space-x-4">
                <button
                    onClick={testGoogleLogin}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Test Google Login
                </button>
                <button
                    onClick={() => setLogs([])}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Clear Logs
                </button>
            </div>

            <div id="test-google-button" className="mb-4"></div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Debug Logs:</h3>
                <div className="text-sm font-mono space-y-1 max-h-60 overflow-y-auto">
                    {logs.map((log, index) => (
                        <div key={index} className="text-gray-700 dark:text-gray-300">
                            {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthTest;