// Simple Gemini API Test
// Run with: node test-api.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyAGvt6ak1UqioahAl8ciRcLAChQDdA41_0';

async function testGeminiAPI() {
  console.log('🔑 Testing Gemini API with SDK...');
  console.log('API Key:', apiKey.substring(0, 10) + '...');
  console.log('');

  try {
    // Initialize the SDK (same way as in your React app)
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ SDK initialized');
    
    // Get the model - try different model names
    console.log('Trying models...');
    const modelsToTry = [
      'gemini-pro',
      'models/gemini-pro',
      'gemini-1.5-flash',
      'models/gemini-1.5-flash'
    ];
    
    let model;
    let workingModel;
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`  Testing: ${modelName}...`);
        model = genAI.getGenerativeModel({ model: modelName });
        const testResult = await model.generateContent('Hi');
        const testResponse = await testResult.response;
        testResponse.text();  // This will throw if model doesn't work
        workingModel = modelName;
        console.log(`  ✅ ${modelName} works!`);
        break;
      } catch (err) {
        console.log(`  ❌ ${modelName} failed`);
      }
    }
    
    if (!workingModel) {
      throw new Error('No working model found. Your API key might not have access to Gemini models.');
    }
    
    console.log('');
    console.log(`✅ Model loaded: ${workingModel}`);
    console.log('');
    
    console.log('📤 Sending test message...');
    const result = await model.generateContent('Say hello in 5 words');
    const response = await result.response;
    const text = response.text();
    
    console.log('');
    console.log('✅ SUCCESS! API is working!');
    console.log('');
    console.log('📥 AI Response:', text);
    console.log('');
    console.log('🎉 Your Gemini API key is valid and working perfectly!');
    
  } catch (error) {
    console.error('');
    console.error('❌ ERROR:', error.message);
    console.error('');
    
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
      console.error('Solution: Generate a new API key at https://aistudio.google.com/app/apikey');
    } else if (error.message.includes('quota')) {
      console.error('Solution: API quota exceeded, wait 24 hours or upgrade quota');
    } else {
      console.error('Error details:', error);
    }
    
    process.exit(1);
  }
}

testGeminiAPI();