# 🔑 Gemini API Key Setup Guide

## Step-by-Step Instructions

### 1. **Get Your API Key**
1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Choose **"Create API key in new project"** (recommended)
5. **Copy the generated API key** (it looks like: `AIzaSyC...`)

### 2. **Add API Key to Your Project**
1. Open the `.env` file in your project root
2. Replace the placeholder with your actual key:
   ```
   REACT_APP_GEMINI_API_KEY=AIzaSyC-your-actual-key-here
   ```
3. Save the file

### 3. **Restart the Development Server**
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

### 4. **Verify It's Working**
- Open the browser console (F12)
- Look for: `✅ Gemini AI initialized successfully`
- Test by sending a message in the chat

## 🚨 Troubleshooting

### Problem: "API key not found"
**Solution**: Check your `.env` file format:
```bash
# ✅ Correct format:
REACT_APP_GEMINI_API_KEY=AIzaSyC-your-key-here

# ❌ Wrong formats:
REACT_APP_GEMINI_API_KEY = AIzaSyC-your-key-here  # No spaces
REACT_APP_GEMINI_API_KEY="AIzaSyC-your-key-here"  # No quotes
```

### Problem: "API Test Failed"
**Possible causes**:
1. **Invalid API key** - Generate a new one
2. **Quota exceeded** - Check your usage limits
3. **Network issues** - Check internet connection
4. **API key restrictions** - Ensure no IP restrictions

### Problem: App shows setup message even with API key
**Solution**:
1. Clear browser cache and localStorage
2. Restart the development server
3. Check browser console for error messages

## 🔍 Debugging Steps

### 1. Check Console Messages
Open browser console (F12) and look for:
```
✅ Gemini AI initialized successfully
🧪 API Test Result: API Working
```

### 2. Verify Environment Variable
Add this temporarily to check if the key is loaded:
```javascript
console.log('API Key:', process.env.REACT_APP_GEMINI_API_KEY);
```

### 3. Test API Key Manually
Visit [Google AI Studio](https://aistudio.google.com/app/prompts/new_chat) and test your key there.

## 📋 Checklist

- [ ] ✅ Got API key from https://aistudio.google.com/app/apikey
- [ ] ✅ Added key to `.env` file (no spaces, no quotes)
- [ ] ✅ Restarted development server (`npm start`)
- [ ] ✅ Checked browser console for success messages
- [ ] ✅ Tested by sending a chat message

## 🆓 Free Tier Limits

Google's Gemini API includes:
- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

This is more than enough for personal use!

## 🔒 Security Notes

- ✅ The `.env` file is in `.gitignore` (won't be committed)
- ✅ API key is only used client-side for this demo
- ✅ For production apps, use server-side API calls

## 🎯 Expected Behavior

### With Valid API Key:
- Personalized fitness coaching
- Detailed exercise instructions
- Progress photo analysis
- Smart nutrition advice

### Without API Key:
- Basic fitness tips
- General exercise guidance
- Setup instructions
- Fallback responses

---

**Need help? Check the browser console for detailed error messages!** 🔧