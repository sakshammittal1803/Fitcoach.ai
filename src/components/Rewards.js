import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState('');
  const [claimedRewards, setClaimedRewards] = useState([]);
  const navigate = useNavigate();

  // Initialize user data and check daily login
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') || 'User';
    const storedPoints = localStorage.getItem('userPoints') || '150';
    const storedClaimedRewards = JSON.parse(localStorage.getItem('claimedRewards') || '[]');
    
    setUserName(storedUserName);
    setUserPoints(parseInt(storedPoints));
    setClaimedRewards(storedClaimedRewards);
    
    // Check and update login streak
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastLogin !== today) {
      // Check if login streak should continue or reset
      if (lastLogin === yesterday.toDateString()) {
        // Consecutive day, maintain streak
        const currentStreak = getLoginStreak();
        localStorage.setItem('loginStreak', (currentStreak + 1).toString());
      } else if (lastLogin && lastLogin !== yesterday.toDateString()) {
        // Missed a day, reset streak
        localStorage.setItem('loginStreak', '1');
      } else if (!lastLogin) {
        // First time login
        localStorage.setItem('loginStreak', '1');
      }
      
      // Update last login date
      localStorage.setItem('lastLoginDate', today);
    }
  }, []);

  // Check if user has logged in today
  const hasLoggedInToday = () => {
    const lastLogin = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();
    return lastLogin === today;
  };

  // Check login streak
  const getLoginStreak = () => {
    return parseInt(localStorage.getItem('loginStreak') || '0');
  };

  // Check last monthly pic upload
  const getLastPicUpload = () => {
    const lastUpload = localStorage.getItem('lastPicUpload');
    return lastUpload ? new Date(lastUpload) : null;
  };

  // Check if monthly pic is due
  const isPicUploadDue = () => {
    const lastUpload = getLastPicUpload();
    if (!lastUpload) return true;
    
    const now = new Date();
    const daysSinceUpload = Math.floor((now - lastUpload) / (1000 * 60 * 60 * 24));
    return daysSinceUpload >= 30;
  };

  // Get referral count
  const getReferralCount = () => {
    return parseInt(localStorage.getItem('referralCount') || '0');
  };

  // Reward categories
  const rewardCategories = [
    {
      id: 'daily',
      title: 'Daily Login Rewards',
      icon: '📅',
      rewards: [
        { 
          id: 1, 
          title: 'Daily Login Bonus', 
          points: 10, 
          claimed: hasLoggedInToday(), 
          type: 'daily',
          description: 'Login every day to earn points'
        },
        { 
          id: 2, 
          title: '7-Day Login Streak', 
          points: 100, 
          claimed: getLoginStreak() >= 7, 
          type: 'streak',
          description: `Current streak: ${getLoginStreak()} days`
        },
        { 
          id: 3, 
          title: '30-Day Login Streak', 
          points: 500, 
          claimed: getLoginStreak() >= 30, 
          type: 'streak',
          description: `Current streak: ${getLoginStreak()} days`
        }
      ]
    },
    {
      id: 'monthly',
      title: 'Monthly Progress Photos',
      icon: '📸',
      rewards: [
        { 
          id: 4, 
          title: 'Upload Monthly Progress Photo', 
          points: 200, 
          claimed: !isPicUploadDue(), 
          type: 'monthly',
          description: 'Upload your monthly transformation photo',
          action: 'upload'
        },
        { 
          id: 5, 
          title: '3-Month Photo Consistency', 
          points: 750, 
          claimed: false, 
          type: 'consistency',
          description: 'Upload photos for 3 consecutive months'
        },
        { 
          id: 6, 
          title: '6-Month Transformation', 
          points: 1500, 
          claimed: false, 
          type: 'milestone',
          description: 'Complete 6 months of progress tracking'
        }
      ]
    },
    {
      id: 'referral',
      title: 'Referral Program',
      icon: '👥',
      rewards: [
        { 
          id: 7, 
          title: 'Refer a Friend', 
          points: 300, 
          claimed: false, 
          type: 'referral',
          description: 'Invite friends to join FitCoach AI',
          action: 'refer'
        },
        { 
          id: 8, 
          title: '5 Successful Referrals', 
          points: 2000, 
          claimed: getReferralCount() >= 5, 
          type: 'referral_milestone',
          description: `Current referrals: ${getReferralCount()}/5`
        },
        { 
          id: 9, 
          title: '10 Referral Champion', 
          points: 5000, 
          claimed: getReferralCount() >= 10, 
          type: 'referral_champion',
          description: `Current referrals: ${getReferralCount()}/10`
        }
      ]
    }
  ];

  // Shop items that can be purchased with points
  const shopCategories = [
    {
      id: 'supplements',
      title: 'Supplements & Nutrition',
      icon: '💊',
      items: [
        { id: 1, name: 'FitCoach Premium (1 Month)', cost: 500, icon: '🎯', description: '1-month premium app access coupon' },
        { id: 2, name: 'Optimum Nutrition 20% Off', cost: 300, icon: '🥤', description: 'Discount on whey protein & supplements' },
        { id: 3, name: 'Dymatize ISO100 Coupon', cost: 250, icon: '💪', description: '15% off premium whey isolate' },
        { id: 4, name: 'BSN Supplements Deal', cost: 200, icon: '⚡', description: '25% off pre-workout & creatine' },
        { id: 5, name: 'MuscleTech Bundle Offer', cost: 350, icon: '🔥', description: '30% off protein + pre-workout combo' },
        { id: 6, name: 'Cellucor C4 Energy Discount', cost: 180, icon: '⚡', description: '20% off C4 pre-workout series' },
        { id: 7, name: 'Quest Nutrition Bars', cost: 150, icon: '🍫', description: '15% off protein bars & snacks' }
      ]
    },
    {
      id: 'fitness',
      title: 'Fitness & Equipment',
      icon: '🏋️',
      items: [
        { id: 8, name: 'Nike Training Gear 15% Off', cost: 400, icon: '👟', description: 'Discount on Nike fitness apparel' },
        { id: 9, name: 'Adidas Workout Clothes', cost: 350, icon: '👕', description: '20% off Adidas activewear' },
        { id: 10, name: 'Under Armour Gear Deal', cost: 300, icon: '🎽', description: '25% off UA performance wear' },
        { id: 11, name: 'Bowflex Equipment Coupon', cost: 800, icon: '🏋️', description: '$100 off home gym equipment' },
        { id: 12, name: 'Resistance Bands Set', cost: 120, icon: '🔗', description: 'Free premium resistance band set' },
        { id: 13, name: 'Yoga Mat Premium', cost: 100, icon: '🧘', description: 'High-quality eco-friendly yoga mat' }
      ]
    }
  ];

  const claimReward = (reward) => {
    if (!claimedRewards.includes(reward.id)) {
      const newPoints = userPoints + reward.points;
      const newClaimedRewards = [...claimedRewards, reward.id];
      
      setUserPoints(newPoints);
      setClaimedRewards(newClaimedRewards);
      
      // Save to localStorage
      localStorage.setItem('userPoints', newPoints.toString());
      localStorage.setItem('claimedRewards', JSON.stringify(newClaimedRewards));
      
      // Handle daily login
      if (reward.type === 'daily') {
        const today = new Date().toDateString();
        localStorage.setItem('lastLoginDate', today);
        
        // Update login streak
        const currentStreak = getLoginStreak();
        localStorage.setItem('loginStreak', (currentStreak + 1).toString());
      }
    }
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Save upload date
        const today = new Date().toISOString();
        localStorage.setItem('lastPicUpload', today);
        
        // Award points
        const newPoints = userPoints + 200;
        setUserPoints(newPoints);
        localStorage.setItem('userPoints', newPoints.toString());
        
        // Mark as claimed
        const newClaimedRewards = [...claimedRewards, 4];
        setClaimedRewards(newClaimedRewards);
        localStorage.setItem('claimedRewards', JSON.stringify(newClaimedRewards));
        
        alert('Photo uploaded successfully! +200 points earned!');
      }
    };
    input.click();
  };

  const handleReferral = () => {
    const referralCode = `FITCOACH${userName.toUpperCase()}${Math.random().toString(36).substr(2, 4)}`;
    const referralLink = `https://fitcoach.ai/join?ref=${referralCode}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(referralLink).then(() => {
      alert(`Referral link copied to clipboard!\n\nShare this link: ${referralLink}\n\nYou'll earn 300 points for each friend who joins!`);
      
      // For demo purposes, simulate a referral
      const currentReferrals = getReferralCount();
      localStorage.setItem('referralCount', (currentReferrals + 1).toString());
      
      // Award points
      const newPoints = userPoints + 300;
      setUserPoints(newPoints);
      localStorage.setItem('userPoints', newPoints.toString());
    }).catch(() => {
      alert(`Your referral link: ${referralLink}\n\nShare this with friends to earn 300 points each!`);
    });
  };

  const purchaseItem = (item) => {
    if (userPoints >= item.cost) {
      const newPoints = userPoints - item.cost;
      setUserPoints(newPoints);
      localStorage.setItem('userPoints', newPoints.toString());
      
      // Show success message (you could add a toast notification here)
      alert(`Successfully purchased ${item.name}!`);
    }
  };

  const getPointsColor = (points) => {
    if (points >= 1000) return 'text-purple-600';
    if (points >= 500) return 'text-blue-600';
    if (points >= 100) return 'text-green-600';
    return 'text-orange-600';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 max-w-6xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/chat')}
            className="text-gray-600 dark:text-gray-300 p-2 hover:scale-105 hover:text-primary transition-all duration-200 ease-out active:scale-95"
          >
            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" className="sm:w-6 sm:h-6">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Rewards</h1>
          <div className="w-8 sm:w-10"></div>
        </div>
      </header>

      {/* Points Display */}
      <div className="p-3 sm:p-4">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-medium opacity-90">Hey {userName}!</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-bold">{userPoints.toLocaleString()}</span>
                <span className="text-base sm:text-lg opacity-90">points</span>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl">🏅</div>
          </div>
          <div className="mt-3 sm:mt-4 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min((userPoints / 1000) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm opacity-90 mt-2">
            {userPoints < 1000 ? `${1000 - userPoints} points to next level` : 'Max level reached!'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Reward Categories */}
        {rewardCategories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">{category.icon}</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">{category.title}</h3>
            </div>
            
            <div className="space-y-3">
              {category.rewards.map((reward) => {
                const isClaimed = claimedRewards.includes(reward.id);
                return (
                  <div
                    key={reward.id}
                    className={`flex items-center justify-between p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                      isClaimed
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isClaimed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {isClaimed && (
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm sm:text-base ${isClaimed ? 'text-green-700 dark:text-green-300' : 'text-gray-800 dark:text-white'}`}>
                          {reward.title}
                        </p>
                        <p className={`text-xs sm:text-sm ${getPointsColor(reward.points)} font-semibold`}>
                          +{reward.points} points
                        </p>
                        {reward.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {reward.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      {!isClaimed && reward.action === 'upload' && (
                        <button
                          onClick={handlePhotoUpload}
                          className="px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Upload Photo</span>
                          <span className="sm:hidden">Upload</span>
                        </button>
                      )}
                      
                      {!isClaimed && reward.action === 'refer' && (
                        <button
                          onClick={handleReferral}
                          className="px-2 sm:px-4 py-1.5 sm:py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          <span className="hidden sm:inline">Share Link</span>
                          <span className="sm:hidden">Share</span>
                        </button>
                      )}
                      
                      {!isClaimed && !reward.action && (
                        <button
                          onClick={() => claimReward(reward)}
                          className="px-2 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-xs sm:text-sm"
                        >
                          Claim
                        </button>
                      )}
                      
                      {isClaimed && (
                        <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1 text-xs sm:text-sm">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Claimed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Points Shop */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl">🛍️</span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Points Shop</h3>
          </div>
          
          {shopCategories.map((category) => (
            <div key={category.id} className="mb-6 sm:mb-8 last:mb-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl">{category.icon}</span>
                <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200">{category.title}</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4 hover:border-primary transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <span className="text-lg sm:text-2xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-800 dark:text-white text-xs sm:text-sm leading-tight">{item.name}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm sm:text-lg font-bold text-primary">{item.cost} pts</span>
                      <button
                        onClick={() => purchaseItem(item)}
                        disabled={userPoints < item.cost}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
                          userPoints >= item.cost
                            ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {userPoints >= item.cost ? 'Purchase' : 'Need more pts'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Navigation currentPage="rewards" />
    </div>
  );
};

export default Rewards;