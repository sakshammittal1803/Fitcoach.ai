import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [showShortcuts, setShowShortcuts] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const totalSteps = 11;



  const questions = [
    {
      id: 'name',
      title: "What's your name?",
      type: 'text',
      placeholder: 'Enter your name',
      field: 'name'
    },
    {
      id: 'age',
      title: "What's your age?",
      type: 'number',
      placeholder: 'Enter your age',
      field: 'age'
    },
    {
      id: 'gender',
      title: "What's your gender?",
      type: 'select',
      field: 'gender',
      options: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    {
      id: 'weight',
      title: "What's your current weight?",
      type: 'number',
      placeholder: 'Weight in kg',
      field: 'weight'
    },
    {
      id: 'height',
      title: "What's your height?",
      type: 'number',
      placeholder: 'Height in cm',
      field: 'height'
    },
    {
      id: 'medicalConditions',
      title: "Any medical conditions we should know about?",
      type: 'textarea',
      placeholder: 'Enter any medical conditions or type "None"',
      field: 'medicalConditions'
    },
    {
      id: 'fitnessTrack',
      title: "Which fitness track interests you?",
      type: 'select',
      field: 'fitnessTrack',
      options: [
        'Fat loss',
        'Muscle gain',
        'Bodybuilding',
        'Calisthenics',
        'Yoga & Flexibility',
        'Endurance & Stamina',
        'Sports-specific training',
        'General fitness & health maintenance'
      ]
    },
    {
      id: 'dietType',
      title: "What's your diet type?",
      type: 'select',
      field: 'dietType',
      options: [
        'Vegetarian',
        'Non-Vegetarian',
        'Vegan',
        'Keto / High Protein / Low Carb',
        'Jain',
        'Other'
      ]
    },
    {
      id: 'foodAllergies',
      title: "Any food allergies or restrictions?",
      type: 'textarea',
      placeholder: 'Enter any food allergies or restrictions, or type "None"',
      field: 'foodAllergies'
    },
    {
      id: 'dietBudget',
      title: "What's your daily diet budget?",
      type: 'select',
      field: 'dietBudget',
      options: [
        'Low ',
        'Moderate',
        'Flexible'
      ]
    },
    {
      id: 'workoutLocation',
      title: "Where do you usually work out?",
      type: 'select',
      field: 'workoutLocation',
      options: [
        'Home',
        'Gym',
        'Outdoor (park, track, etc.)'
      ]
    }
  ];

  const currentQuestion = questions[currentStep - 1];

  const handleInputChange = (value) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.field]: value
    }));
  };

  const handleContinue = () => {
    const currentValue = formData[currentQuestion.field];
    if (!currentValue || currentValue.trim() === '') {
      return; // Don't proceed if current field is empty
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Store all form data in localStorage
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent shortcuts when typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleContinue();
        }
        return;
      }

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          handleContinue();
          break;
        case 'Backspace':
          event.preventDefault();
          handleBack();
          break;
        case 'Escape':
          setShowShortcuts(!showShortcuts);
          break;
        case '?':
          event.preventDefault();
          setShowShortcuts(!showShortcuts);
          break;
        default:
          // Handle number keys for select options
          if (currentQuestion.type === 'select') {
            const num = parseInt(event.key);
            if (num >= 1 && num <= currentQuestion.options.length) {
              event.preventDefault();
              handleInputChange(currentQuestion.options[num - 1]);
            }
          }

          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, currentQuestion, formData]);

  // Auto-focus input fields
  useEffect(() => {
    if (inputRef.current && (currentQuestion.type === 'text' || currentQuestion.type === 'number' || currentQuestion.type === 'textarea')) {
      inputRef.current.focus();
    }
  }, [currentStep, currentQuestion.type]);

  const renderInput = () => {
    const currentValue = formData[currentQuestion.field];

    switch (currentQuestion.type) {
      case 'text':
      case 'number':
        return (
          <div className="mb-6">
            <div className="relative">
              <input
                ref={inputRef}
                className="w-full h-12 sm:h-16 px-4 sm:px-6 text-base sm:text-lg bg-background-light dark:bg-background-dark border-2 border-background-dark/10 dark:border-background-light/10 rounded-xl focus:ring-primary focus:border-primary text-background-dark dark:text-background-light placeholder-background-dark/40 dark:placeholder-background-light/40"
                placeholder={currentQuestion.placeholder}
                type={currentQuestion.type}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleContinue();
                  }
                }}
              />
              {currentQuestion.type === 'text' && (
                <button className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-background-dark/60 dark:text-background-light/60">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">mic</span>
                </button>
              )}
            </div>

          </div>
        );

      case 'textarea':
        return (
          <div className="mb-6">
            <textarea
              ref={inputRef}
              className="w-full h-24 sm:h-32 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-background-light dark:bg-background-dark border-2 border-background-dark/10 dark:border-background-light/10 rounded-xl focus:ring-primary focus:border-primary text-background-dark dark:text-background-light placeholder-background-dark/40 dark:placeholder-background-light/40 resize-none"
              placeholder={currentQuestion.placeholder}
              value={currentValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  e.preventDefault();
                  handleContinue();
                }
              }}
            />


            <p className="text-xs text-background-dark/50 dark:text-background-light/50 mt-2">
              Press Ctrl+Enter to continue
            </p>
          </div>
        );

      case 'select':
        return (
          <div className="mb-6 space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInputChange(option)}
                className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-200 relative ${currentValue === option
                  ? 'border-primary bg-primary/10 text-primary dark:text-primary'
                  : 'border-background-dark/10 dark:border-background-light/10 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light hover:border-primary/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-medium pr-2">{option}</span>
                  <span className="text-xs bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary px-2 py-1 rounded flex-shrink-0">
                    {index + 1}
                  </span>
                </div>
              </button>
            ))}

            <p className="text-xs text-background-dark/50 dark:text-background-light/50 text-center mt-4">
              Press 1-{currentQuestion.options.length} to select • Enter to continue • ? for help
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="flex items-center justify-between p-4 sm:p-6">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="text-background-dark/80 dark:text-background-light/80 p-2 hover:scale-105 transition-transform"
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
        )}
        <h1 className="text-lg sm:text-xl font-bold text-background-dark dark:text-background-light grow text-center">
          fitcoach AI
        </h1>
        <button className="text-background-dark/80 dark:text-background-light/80 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-2xl sm:text-3xl">help_center</span>
        </button>
      </header>

      <main className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs sm:text-sm font-medium text-background-dark/60 dark:text-background-light/60">
              Step {currentStep}/{totalSteps}
            </p>
          </div>
          <div className="w-full bg-background-dark/10 dark:bg-background-light/10 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-2xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-background-dark dark:text-background-light mb-6 sm:mb-8 text-center leading-tight">
            {currentQuestion.title}
          </h2>
          {renderInput()}
        </div>

        <div className="flex gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-background-dark/10 dark:bg-background-light/10 text-background-dark dark:text-background-light font-bold py-3 sm:py-4 px-4 rounded-xl text-base sm:text-lg hover:bg-background-dark/20 dark:hover:bg-background-light/20 transition-colors duration-300"
            >
              Back
            </button>
          )}
          <button
            onClick={handleContinue}
            disabled={!formData[currentQuestion.field] || formData[currentQuestion.field].trim() === ''}
            className="flex-1 bg-primary text-white font-bold py-3 sm:py-4 px-4 rounded-xl text-base sm:text-lg hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      </main>

      {/* Keyboard Shortcuts Help Overlay */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background-light dark:bg-background-dark rounded-xl p-6 max-w-md w-full border border-primary/20 dark:border-primary/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-background-dark dark:text-background-light">
                ⌨️ Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-background-dark/60 dark:text-background-light/60 hover:text-primary"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-background-dark/70 dark:text-background-light/70">Continue to next step</span>
                <kbd className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded text-xs">Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-background-dark/70 dark:text-background-light/70">Go back</span>
                <kbd className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded text-xs">Backspace</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-background-dark/70 dark:text-background-light/70">Select options</span>
                <kbd className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded text-xs">1-9</kbd>
              </div>

              <div className="flex justify-between">
                <span className="text-background-dark/70 dark:text-background-light/70">Toggle help</span>
                <kbd className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded text-xs">?</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-background-dark/70 dark:text-background-light/70">Continue from textarea</span>
                <kbd className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded text-xs">Ctrl+Enter</kbd>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
              <p className="text-xs text-background-dark/60 dark:text-background-light/60">
                💡 Tip: Use number keys for option selection and Enter to navigate faster!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating help button */}
      <button
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        <span className="text-lg">?</span>
      </button>
    </div>
  );
};

export default Onboarding;