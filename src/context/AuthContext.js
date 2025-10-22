import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Only keep real Google users, remove demo users
        if (userData.id === 'demo-user-123' || userData.email === 'demo@fitcoach.ai') {
          localStorage.removeItem('googleUser');
          localStorage.removeItem('userName');
          localStorage.removeItem('userProfile');
        } else {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('googleUser');
        localStorage.removeItem('userName');
      }
    }
    setIsLoading(false);
  }, []);

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('googleUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfile');
    
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.disableAutoSelect();
      } catch (error) {
        console.error('Error disabling Google auto-select:', error);
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};