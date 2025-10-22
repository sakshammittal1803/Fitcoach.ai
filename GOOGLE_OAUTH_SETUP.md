# Google OAuth Setup Guide

## Current Error: 400 - Malformed Request

This error occurs when Google OAuth configuration is incorrect. Follow these steps to fix it:

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Go to **APIs & Services** > **Credentials**
4. Find your OAuth 2.0 Client ID: `219698154777-pgfdc5edt6aakgi4ti00dmqvq4qlh4dm.apps.googleusercontent.com`

## Step 2: Configure Authorized Origins

In your OAuth 2.0 Client ID settings, add these **Authorized JavaScript origins**:

```
http://localhost:3000
http://127.0.0.1:3000
https://localhost:3000
```

## Step 3: Configure Authorized Redirect URIs

Add these **Authorized redirect URIs**:

```
http://localhost:3000
http://localhost:3000/
http://localhost:3000/welcome
http://localhost:3000/dashboard
http://localhost:3000/onboarding
```

## Step 4: Enable Required APIs

Make sure these APIs are enabled:
- Google+ API (Legacy) OR Google Identity Services
- People API (optional, for profile info)

## Step 5: OAuth Consent Screen

1. Go to **OAuth consent screen**
2. Set **User Type** to "External" (for testing)
3. Fill in required fields:
   - App name: "Fitcoach AI"
   - User support email: your email
   - Developer contact: your email
4. Add test users (your email) if in testing mode

## Step 6: Common Issues

### Issue: "redirect_uri_mismatch"
- Solution: Add exact URL to authorized redirect URIs

### Issue: "invalid_client"
- Solution: Check Client ID is correct in .env file

### Issue: "access_blocked"
- Solution: Add your email as test user in OAuth consent screen

## Step 7: Test Configuration

After making changes:
1. Wait 5-10 minutes for changes to propagate
2. Clear browser cache
3. Try authentication again

## Current Configuration
- Client ID: `219698154777-pgfdc5edt6aakgi4ti00dmqvq4qlh4dm.apps.googleusercontent.com`
- Domain: `localhost:3000`
- Environment: Development