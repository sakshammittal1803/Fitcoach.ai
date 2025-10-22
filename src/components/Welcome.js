import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        navigate('/chat');
      } else {
        navigate('/onboarding');
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Load Google Identity Services and initialize immediately
    const loadAndInitGoogle = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('Google script loaded, initializing...');
        // Wait a moment for Google to be ready
        setTimeout(() => {
          if (window.google && window.google.accounts) {
            console.log('Google is ready!');
            // Pre-initialize Google OAuth
            try {
              window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
              });
              console.log('Google OAuth pre-initialized');
            } catch (error) {
              console.error('Pre-initialization failed:', error);
            }
          }
        }, 1000);
      };
      
      document.head.appendChild(script);
    };

    loadAndInitGoogle();
  }, []);

  // Separate callback function (like standalone)
  const handleCredentialResponse = (response) => {
    console.log('Google credential received:', response);
    
    if (response.credential) {
      try {
        // Parse JWT token (exact same as standalone)
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64).split('').map(c => 
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          ).join('')
        );
        const userInfo = JSON.parse(jsonPayload);
        
        console.log('User info:', userInfo);
        
        // Save user data
        const userData = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
        };
        
        localStorage.setItem('googleUser', JSON.stringify(userData));
        localStorage.setItem('userName', userData.name);
        
        console.log('User data saved, redirecting...');
        
        // Redirect based on profile completion
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
          navigate('/chat');
        } else {
          navigate('/onboarding');
        }
      } catch (error) {
        console.error('Error processing credential:', error);
        alert('Login processing failed: ' + error.message);
      }
    } else {
      console.error('No credential in response');
      alert('No credential received from Google');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    
    // Try the direct method first
    if (window.google && window.google.accounts) {
      try {
        // Re-initialize (like standalone does)
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        
        console.log('Showing Google prompt...');
        
        // Show prompt (exact same as standalone)
        window.google.accounts.id.prompt((notification) => {
          console.log('Prompt notification:', notification.getMomentType());
          
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Prompt not displayed, trying popup method...');
            handleGoogleLoginPopup();
          }
        });
        
      } catch (error) {
        console.error('Direct Google login error:', error);
        console.log('Falling back to popup method...');
        handleGoogleLoginPopup();
      }
    } else {
      console.log('Google not ready, using popup method...');
      handleGoogleLoginPopup();
    }
  };

  const handleGoogleLoginPopup = () => {
    // Open the working standalone OAuth in a popup
    const popup = window.open(
      '/google-oauth-popup.html',
      'googleLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );
    
    // Check if popup was blocked
    if (!popup) {
      alert('Popup blocked! Please allow popups for this site and try again.');
      return;
    }
    
    // Monitor popup for completion
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        console.log('Popup closed, checking for login...');
        
        // Check if user was logged in
        const savedUser = localStorage.getItem('googleUser');
        if (savedUser) {
          console.log('Login detected, redirecting...');
          const userProfile = localStorage.getItem('userProfile');
          if (userProfile) {
            navigate('/chat');
          } else {
            navigate('/onboarding');
          }
        }
      }
    }, 1000);
    
    // Timeout after 5 minutes
    setTimeout(() => {
      if (!popup.closed) {
        popup.close();
        clearInterval(checkClosed);
      }
    }, 300000);
  };



  const handleGuestLogin = () => {
    navigate('/onboarding');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute h-full w-full bg-gradient-to-br from-primary/10 via-transparent to-primary/10 dark:from-primary/20 dark:via-transparent dark:to-primary/20"></div>
      </div>
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <div className="mb-12 text-center text-gray-800 dark:text-white">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">
            Welcome to <span className="text-primary">Fitcoach AI</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Your Personal AI Fitness Coach</p>
        </div>
        <div className="w-full space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-6 py-4 text-base font-bold text-white transition-transform duration-200 hover:scale-105 neon-glow"
          >
            <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
            </svg>
            <span>Login with Google</span>
          </button>
          
          <button 
            onClick={handleGuestLogin}
            className="flex w-full items-center justify-center rounded-lg bg-primary/20 px-6 py-4 text-base font-bold text-primary transition-transform duration-200 hover:scale-105 dark:bg-primary/30 dark:text-white"
          >
            Continue as Guest
          </button>
          
          {/* Hidden Google button fallback */}
          <div id="hidden-google-button" style={{display: 'none'}} className="w-full"></div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Fitcoach AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;