import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const APIKeyChecker = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testAPIKey = async () => {
    if (!apiKey.trim()) {
      setStatus('Please enter an API key');
      return;
    }

    setIsLoading(true);
    setStatus('Testing API key...');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const result = await model.generateContent("Hello");
      const response = await result.response;
      const text = response.text();
      
      if (text) {
        setStatus('✅ API key is valid and working!');
      } else {
        setStatus('❌ API key test failed - no response received');
      }
    } catch (error) {
      console.error('API test error:', error);
      if (error.message.includes('API_KEY_INVALID')) {
        setStatus('❌ Invalid API key - please check your key');
      } else if (error.message.includes('quota')) {
        setStatus('❌ API quota exceeded - check your usage limits');
      } else {
        setStatus(`❌ API test failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🔑 API Key Tester</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your Gemini API Key:
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIza..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={testAPIKey}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Testing...' : 'Test API Key'}
        </button>
        
        {status && (
          <div className={`p-3 rounded-md text-sm ${
            status.includes('✅') 
              ? 'bg-green-100 text-green-800' 
              : status.includes('❌')
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {status}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>💡 Get your API key from:</p>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            https://aistudio.google.com/app/apikey
          </a>
        </div>
      </div>
    </div>
  );
};

export default APIKeyChecker;