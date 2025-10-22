// src/config.js
export const APP_CONFIG = {
  appName: "FitCoach AI",
  aiName: "Alex",
  aiModel: "gemini-1.5-flash", // Current stable model
  pointsPerPhoto: 200,
  welcomeTimeout: 800,

  avatars: {
    ai: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIwLGQjCiRzwfkMCnvZlrEaZcsSH7y6xzt6cBfNC3hed8LEfFTJr0k0aVFaU9FSjfEQvpH7lqVhVdDKeDHz16k1CZW0y-OIv1VQzJhfLLh10yWnF6yVx81OwsYcMPufior-2JP-PzFoekV0Cbf15eIL72Q6cYxUzLtsJjQ3UdxYVRg_Nu5yC3eKzTwMLOofNRizZlJoXhvABMdLkKrbLE-3gYaecLreR_OubFux8MXxYCMeY_5nE_xEiuIx_EmTg6FVcg9M3gHxNFV",
    male: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    female: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
  },

  messages: {
    apiKeyMissing: `
**Gemini API Key Required**

Hi there! To chat with **{{aiName}}**, add your free API key:

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key
3. Add to \`.env\`:  
   \`\`\`
   REACT_APP_GEMINI_API_KEY=your_key_here
   \`\`\`
4. Restart app

Ready when you are!
    `.trim(),

    welcome: `
Hey **{{name}}**! I'm **{{aiName}}**, your AI fitness coach!

{{profile}}

**I can help with:**
• Custom workout plans
• Meal planning & nutrition
• Form analysis (upload a photo!)
• Goal tracking & motivation

What would you like to work on today?
    `.trim(),

    profileSummary: `
**Your Profile:**
{{stats}}
`.trim(),

    aiTyping: "thinking...",
    sendButton: "Send",
    fileButton: "Attach",
    voiceButton: "Voice",
    onlineStatus: "Online",
    offlineStatus: "Setup Required"
  },

  links: {
    apiKey: "https://aistudio.google.com/app/apikey"
  }
};