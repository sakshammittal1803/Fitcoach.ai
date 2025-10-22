# Fitcoach AI - React Application

A React-based fitness coaching application converted from HTML pages, featuring a complete user journey from onboarding to progress tracking.

## Features

- **Animated Loading Screen**: Fitness-themed loading page with treadmill GIF and progress tracking
- **Light/Dark Theme**: Default light theme with toggle in settings
- **Welcome Page**: Login with Google or continue as guest
- **Enhanced Onboarding**: 10-step comprehensive user profile setup including:
  - Personal details (name, age, gender, weight, height)
  - Medical conditions assessment
  - Fitness track selection (Fat loss, Muscle gain, Bodybuilding, etc.)
  - Diet preferences and restrictions
  - Budget and workout location preferences
- **Personalized Dashboard**: Dynamic hub showing calculated BMI and personalized plans
- **Chat Interface**: AI trainer chat with workout and diet recommendations
- **Progress Tracking**: Weight tracking, progress comparison, goals, and achievements
- **Settings Page**: Theme toggle, profile management, and account settings
- **Navigation**: Bottom navigation bar connecting all pages

## Project Structure

```
src/
├── components/
│   ├── Loading.js          # Animated loading screen with treadmill GIF
│   ├── Welcome.js          # Landing/login page
│   ├── Onboarding.js       # Enhanced multi-step onboarding
│   ├── Dashboard.js        # Personalized dashboard
│   ├── Chat.js            # AI trainer chat
│   ├── Progress.js        # Progress tracking
│   ├── Settings.js        # Settings page with theme toggle
│   └── Navigation.js      # Bottom navigation component
├── context/
│   └── ThemeContext.js    # Theme management context
├── App.js                 # Main app with routing and theme provider
└── index.js              # React entry point
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Google OAuth:
   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create a new project or select existing one
   - Enable Google Identity Services
   - Create OAuth 2.0 credentials
   - Add your domain (http://localhost:3000) to authorized origins
   - Copy the Client ID to `.env` file:
   ```bash
   REACT_APP_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## User Flow

1. **Loading Screen** (`/`) - Animated fitness-themed loading with progress bar
2. **Welcome** (`/welcome`) - Login options with Google or guest access
3. **Enhanced Onboarding** (`/onboarding`) - 10-step comprehensive setup:
   - Step 1: Name
   - Step 2: Age
   - Step 3: Gender
   - Step 4: Weight
   - Step 5: Height
   - Step 6: Medical conditions
   - Step 7: Fitness track selection
   - Step 8: Diet type
   - Step 9: Food allergies/restrictions
   - Step 10: Diet budget
   - Step 11: Workout location
4. **Personalized Dashboard** (`/dashboard`) - Dynamic hub with calculated BMI and personalized plans
5. **Chat** (`/chat`) - AI trainer conversations
6. **Progress** (`/progress`) - Track weight, goals, and achievements
7. **Settings** (`/settings`) - Theme toggle, profile management, and account options

## Technologies Used

- React 18
- React Router DOM
- Google Identity Services (OAuth 2.0)
- Tailwind CSS (via CDN)
- Inter Font Family
- Material Symbols Icons

## Styling

The app uses Tailwind CSS with a custom configuration including:
- Primary color: `#137fec`
- Light background: `#f6f7f8`
- Dark background: `#101922`
- Inter font family
- Custom border radius values
- Dark mode support

## Key Features

- **Google OAuth Integration**: Secure authentication with Google Sign-In
- **Animated Loading**: Treadmill GIF loading screen with progress tracking
- **Theme System**: Light theme by default with dark mode toggle in settings
- **User Authentication**: Google profile integration with avatar and email
- **Responsive Design**: Mobile-first approach
- **Context-based Management**: React Context for theme and authentication state
- **Multi-step Onboarding**: Progressive form with validation and back navigation
- **Dynamic Content**: Personalized dashboard based on user profile
- **BMI Calculator**: Automatic calculation from user height/weight
- **Settings Management**: Comprehensive settings page with profile and theme options
- **Secure Logout**: Complete session cleanup and Google sign-out
- **Navigation**: Persistent bottom navigation
- **State Management**: Local storage for user profile and theme preferences
- **Interactive Elements**: Multiple input types (text, select, textarea)
- **Progress Visualization**: Charts and progress bars
- **Form Validation**: Required field validation with disabled states

## Development Notes

- All original HTML styling has been preserved
- Components are modular and reusable
- Navigation state is managed through props
- User name is stored in localStorage
- Chat functionality includes message state management
- Progress charts use SVG for scalability