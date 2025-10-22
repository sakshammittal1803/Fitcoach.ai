# FitCoach AI - Gemini Integration Setup

## 🚀 Overview

FitCoach AI now uses Google's Gemini AI to provide intelligent fitness coaching, personalized workout recommendations, nutrition advice, and progress photo analysis.

## 🔑 Getting Your Gemini API Key

1. **Visit Google AI Studio**: Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

2. **Sign in**: Use your Google account to sign in

3. **Create API Key**: 
   - Click "Create API Key"
   - Choose "Create API key in new project" or select an existing project
   - Copy the generated API key

4. **Add to Environment**:
   - Open the `.env` file in your project root
   - Replace `your_gemini_api_key_here` with your actual API key:
   ```
   REACT_APP_GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
   ```

## 🤖 AI Features

### 1. **Personalized Onboarding**
- AI analyzes user profile from onboarding
- Provides initial workout and nutrition recommendations
- Customizes advice based on goals, location, and preferences

### 2. **Exercise Form Guidance**
- Ask "how should I do [exercise name]" for detailed instructions
- Step-by-step form breakdowns
- Common mistakes and corrections
- Modifications for different fitness levels

### 3. **Progress Photo Analysis**
- Upload monthly progress photos
- AI analyzes body composition and posture
- Provides constructive feedback and recommendations
- Tracks transformation over time

### 4. **Nutrition Coaching**
- Personalized meal recommendations
- Considers diet type, allergies, and budget
- Macro and calorie guidance
- Recipe suggestions

### 5. **Workout Planning**
- Custom workout routines based on goals
- Equipment-specific exercises (home/gym)
- Progressive overload recommendations
- Recovery and rest day guidance

## 💬 How to Use

### Basic Conversations
```
"Hi" - Get personalized welcome and profile summary
"Create a workout plan" - Get custom routine
"What should I eat for breakfast?" - Nutrition advice
"How should I do squats?" - Exercise form guidance
```

### Progress Photos
1. Click the attachment button (📎)
2. Select your progress photo
3. AI will automatically suggest analysis message
4. Get detailed feedback on your transformation

### Exercise Form Help
```
"How should I do deadlifts?"
"Show me proper push-up form"
"What's the correct way to do bicep curls?"
```

## 🎯 AI Capabilities

### **Workout Recommendations**
- Exercise selection based on goals
- Sets, reps, and rest periods
- Progressive overload strategies
- Equipment alternatives

### **Nutrition Guidance**
- Meal planning and prep
- Macro calculations
- Food substitutions
- Hydration reminders

### **Progress Tracking**
- Body composition analysis
- Posture assessment
- Transformation feedback
- Goal adjustment recommendations

### **Form Correction**
- Detailed exercise breakdowns
- Safety considerations
- Common mistake prevention
- Modification suggestions

## 🔒 Privacy & Security

- API key is stored locally in environment variables
- Conversation history is maintained for context
- Progress photos are processed but not stored by Google
- All data remains on your device

## 🛠 Troubleshooting

### API Key Issues
- Ensure API key is correctly added to `.env` file
- Restart the development server after adding the key
- Check that the key has proper permissions in Google Cloud Console

### AI Not Responding
- Check internet connection
- Verify API key is valid and not expired
- Look for error messages in browser console

### Image Upload Issues
- Ensure images are in supported formats (JPG, PNG, WebP)
- Check file size (should be under 10MB)
- Try refreshing the page if uploads fail

## 📱 Mobile Optimization

The AI chat is fully responsive and works on:
- Mobile phones (iOS/Android)
- Tablets
- Desktop computers
- All modern browsers

## 🎉 Getting Started

1. Complete the onboarding process
2. Add your Gemini API key to `.env`
3. Start chatting with your AI fitness coach
4. Upload progress photos monthly
5. Ask specific questions about exercises and nutrition

## 💡 Pro Tips

- Be specific in your questions for better responses
- Upload progress photos monthly for best tracking
- Ask follow-up questions for clarification
- Use the voice input feature for hands-free interaction
- Take advantage of the rewards system for consistency

---

**Ready to transform your fitness journey with AI? Start chatting with FitCoach AI today! 💪**