import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Loading from './components/Loading';
import Welcome from './components/Welcome';
import Onboarding from './components/Onboarding';

import Chat from './components/Chat';
import Progress from './components/Progress';
import Rewards from './components/Rewards';
import Settings from './components/Settings';
import ProfileEdit from './components/ProfileEdit';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="bg-background-light dark:bg-background-dark font-display">
            <Routes>
              <Route path="/" element={<Loading />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile-edit" element={<ProfileEdit />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;