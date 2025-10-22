// Simple API test function for debugging
const testGeminiAPI = async () => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_new_api_key_here') {
    console.error('❌ No API key found');
    return false;
  }

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    console.log('🧪 Testing API...');
    const result = await model.generateContent("Say 'Hello from Gemini!'");
    const response = result.response;
    const text = await response.text();
    
    console.log('✅ API Works:', text);
    return true;
  } catch (error) {
    console.error('❌ API Failed:', error.message);
    return false;
  }
};

// Call this in your browser console to test
window.testGeminiAPI = testGeminiAPI;