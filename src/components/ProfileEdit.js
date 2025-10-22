import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    medicalConditions: '',
    fitnessTrack: '',
    dietType: '',
    foodAllergies: '',
    dietBudget: '',
    workoutLocation: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load existing profile data
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      setFormData(profileData);
    } else if (user) {
      // If no profile but user exists, use Google data
      setFormData(prev => ({
        ...prev,
        name: user.name || ''
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('userName', formData.name);
    
    setSuccessMessage('Profile updated successfully!');
    setIsLoading(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/settings');
    }, 2000);
  };

  const FormField = ({ label, field, type = 'text', options = null, placeholder = '' }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-background-dark dark:text-white mb-2">
        {label}
      </label>
      {type === 'select' ? (
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleInputChange(field, option)}
              className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                formData[field] === option
                  ? 'border-primary bg-primary/10 text-primary dark:text-primary'
                  : 'border-background-dark/20 dark:border-white/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-white hover:border-primary/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : type === 'textarea' ? (
        <textarea
          className="w-full h-24 px-4 py-3 rounded-lg border border-background-dark/20 dark:border-white/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-white placeholder-background-dark/50 dark:placeholder-white/50 focus:ring-2 focus:ring-primary focus:border-primary resize-none"
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="w-full h-12 px-4 rounded-lg border border-background-dark/20 dark:border-white/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-white placeholder-background-dark/50 dark:placeholder-white/50 focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between p-4 border-b border-background-dark/10 dark:border-white/10">
        <button 
          onClick={() => navigate('/settings')}
          className="text-background-dark dark:text-white p-2"
        >
          <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <h1 className="text-lg font-bold text-background-dark dark:text-white">Edit Profile</h1>
        <div className="w-8"></div>
      </header>

      {successMessage && (
        <div className="mx-4 mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
          <p className="text-green-800 dark:text-green-200 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-6">
          <FormField
            label="Name"
            field="name"
            placeholder="Enter your name"
          />

          <FormField
            label="Age"
            field="age"
            type="number"
            placeholder="Enter your age"
          />

          <FormField
            label="Gender"
            field="gender"
            type="select"
            options={['Male', 'Female', 'Other', 'Prefer not to say']}
          />

          <FormField
            label="Weight (kg)"
            field="weight"
            type="number"
            placeholder="Enter your weight"
          />

          <FormField
            label="Height (cm)"
            field="height"
            type="number"
            placeholder="Enter your height"
          />

          <FormField
            label="Medical Conditions"
            field="medicalConditions"
            type="textarea"
            placeholder="Enter any medical conditions or type 'None'"
          />

          <FormField
            label="Fitness Track"
            field="fitnessTrack"
            type="select"
            options={[
              'Fat loss',
              'Muscle gain',
              'Bodybuilding',
              'Calisthenics',
              'Yoga & Flexibility',
              'Endurance & Stamina',
              'Sports-specific training',
              'General fitness & health maintenance'
            ]}
          />

          <FormField
            label="Diet Type"
            field="dietType"
            type="select"
            options={[
              'Vegetarian',
              'Non-Vegetarian',
              'Vegan',
              'Keto / High Protein / Low Carb',
              'Jain',
              'Other'
            ]}
          />

          <FormField
            label="Food Allergies & Restrictions"
            field="foodAllergies"
            type="textarea"
            placeholder="Enter any food allergies or restrictions, or type 'None'"
          />

          <FormField
            label="Daily Diet Budget"
            field="dietBudget"
            type="select"
            options={[
              'Low',
              'Moderate',
              'Flexible'
            ]}
          />

          <FormField
            label="Workout Location"
            field="workoutLocation"
            type="select"
            options={[
              'Home',
              'Gym',
              'Outdoor (park, track, etc.)'
            ]}
          />
        </div>
      </main>

      <footer className="p-4 border-t border-background-dark/10 dark:border-white/10">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            onClick={() => navigate('/settings')}
            className="flex-1 py-3 px-4 rounded-lg border border-background-dark/20 dark:border-white/20 text-background-dark dark:text-white font-medium hover:bg-background-dark/5 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !formData.name.trim()}
            className="flex-1 py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProfileEdit;