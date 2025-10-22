import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Navigation from './Navigation';
import LogoutModal from './LogoutModal';

const Settings = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    signOut();
    setShowLogoutModal(false);
    navigate('/welcome');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleEditProfile = () => {
    navigate('/profile-edit');
  };

  const SettingItem = ({ icon, title, subtitle, action, isToggle = false, isToggled = false }) => (
    <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-base font-medium text-background-dark dark:text-background-light">{title}</p>
          {subtitle && (
            <p className="text-sm text-background-dark/60 dark:text-background-light/60">{subtitle}</p>
          )}
        </div>
      </div>
      {isToggle ? (
        <button
          onClick={action}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isToggled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isToggled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ) : (
        <button onClick={action} className="text-primary dark:text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-grow">
        <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2">
          <button 
            onClick={() => navigate('/chat')}
            className="text-black dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full bg-background-light dark:bg-background-dark shadow-sm"
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10 text-black dark:text-white">Settings</h1>
        </header>
        
        <main className="p-4 space-y-6">
          {/* Profile Section */}
          <section>
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">Profile</h2>
            <div className="bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-black dark:text-white">
                    {user?.name || userProfile?.name || 'User'}
                  </p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {user?.email || userProfile?.fitnessTrack || 'Fitness Enthusiast'}
                  </p>
                  {userProfile?.age && (
                    <p className="text-sm text-black/60 dark:text-white/60">
                      Age: {userProfile.age} • {userProfile.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section>
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">Appearance</h2>
            <div className="space-y-3">
              <SettingItem
                icon={
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                  </svg>
                }
                title="Dark Mode"
                subtitle={isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
                action={toggleTheme}
                isToggle={true}
                isToggled={isDarkMode}
              />
            </div>
          </section>

          {/* Fitness Section */}
          <section>
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">Fitness</h2>
            <div className="space-y-3">
              <SettingItem
                icon={
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                }
                title="Goals & Targets"
                subtitle="Set your fitness goals"
                action={() => {}}
              />
              <SettingItem
                icon={
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                }
                title="Progress Tracking"
                subtitle="Manage your progress data"
                action={() => navigate('/progress')}
              />
            </div>
          </section>

          {/* Account Section */}
          <section>
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">Account</h2>
            <div className="space-y-3">
              <SettingItem
                icon={
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                }
                title="Edit Profile"
                subtitle="Update your personal information"
                action={handleEditProfile}
              />
              <SettingItem
                icon={
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                }
                title="Logout"
                subtitle="Sign out of your account"
                action={handleLogout}
              />
            </div>
          </section>
        </main>
      </div>
      
      <Navigation currentPage="settings" />
      
      <LogoutModal 
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default Settings;