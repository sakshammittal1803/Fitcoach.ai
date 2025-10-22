# FitCoach AI - Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. **"AI not responding" or "Connection error"**

**Cause**: Gemini API key not configured or invalid

**Solution**:
```bash
# 1. Check your .env file
# Make sure it contains:
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here

# 2. Get a valid API key
# Visit: https://makersuite.google.com/app/apikey
# Create a new API key and replace the placeholder

# 3. Restart the development server
npm start
```

### 2. **"Module not found: @google/generative-ai"**

**Cause**: Package not installed

**Solution**:
```bash
npm install @google/generative-ai
```

### 3. **App crashes on startup**

**Cause**: Syntax error or missing dependencies

**Solution**:
```bash
# Check for errors
npm run build

# If build fails, check the error messages
# Common fixes:
npm install
npm start
```

### 4. **Images not uploading**

**Cause**: File size too large or unsupported format

**Solution**:
- Use images under 10MB
- Supported formats: JPG, PNG, WebP
- Try refreshing the page

### 5. **Voice input not working**

**Cause**: Browser doesn't support speech recognition

**Solution**:
- Use Chrome, Edge, or Safari
- Allow microphone permissions
- Check if HTTPS is enabled (required for speech recognition)

### 6. **API key errors in console**

**Cause**: Invalid or expired API key

**Solution**:
1. Generate a new API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update your `.env` file
3. Restart the development server

### 7. **Fallback mode (AI gives basic responses)**

**Cause**: API key not configured or API quota exceeded

**What happens**: App works with basic fitness advice
**Solution**: Configure API key for full AI features

## 🔧 Development Setup

### Environment Variables
```bash
# Required for full AI functionality
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### Dependencies
```bash
# Core dependencies
npm install @google/generative-ai
npm install react react-dom react-router-dom
```

### Build Process
```bash
# Development
npm start

# Production build
npm run build

# Test build
npm run build && serve -s build
```

## 🌐 Browser Compatibility

### Supported Browsers
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Features by Browser
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| AI Chat | ✅ | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ❌ | ✅ | ✅ |
| Image Upload | ✅ | ✅ | ✅ | ✅ |
| Responsive Design | ✅ | ✅ | ✅ | ✅ |

## 📱 Mobile Issues

### Common Mobile Problems
1. **Voice input not working**: Use Chrome or Safari on mobile
2. **Images not uploading**: Check camera permissions
3. **Layout issues**: Clear browser cache

### Mobile Optimization
- App is fully responsive
- Touch-friendly interface
- Optimized for iOS and Android
- Works in mobile browsers

## 🔍 Debugging Steps

### 1. Check Console Errors
```javascript
// Open browser developer tools (F12)
// Look for errors in Console tab
// Common errors and solutions:

// "API key not found"
// Solution: Add API key to .env file

// "Network error"
// Solution: Check internet connection

// "Quota exceeded"
// Solution: Check API usage limits
```

### 2. Verify API Key
```bash
# Test API key validity
# The app will show a setup message if key is invalid
# Check browser console for detailed error messages
```

### 3. Clear Cache
```bash
# Clear browser cache and localStorage
# Refresh the page
# Try incognito/private browsing mode
```

## 📞 Getting Help

### Before Reporting Issues
1. ✅ Check this troubleshooting guide
2. ✅ Verify API key is correctly set
3. ✅ Try in different browser
4. ✅ Check browser console for errors
5. ✅ Test with fresh incognito window

### What to Include in Bug Reports
- Browser and version
- Error messages from console
- Steps to reproduce
- Screenshots if applicable
- Whether API key is configured

## 🎯 Quick Fixes

### App Won't Start
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### AI Not Working
```bash
# Check .env file
cat .env

# Should show:
# REACT_APP_GEMINI_API_KEY=your_actual_key
```

### Build Errors
```bash
npm run build
# Fix any errors shown
# Usually missing dependencies or syntax errors
```

---

**Still having issues? The app includes fallback functionality, so you can still use basic fitness features even without the AI configured!** 💪