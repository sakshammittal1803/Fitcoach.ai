// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navigation from './Navigation';
import { APP_CONFIG } from './config';

// Inject animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  .msg-in { animation: slideIn 0.3s ease-out; }
  .typing span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #999; animation: pulse 1.4s infinite; }
  .typing span:nth-child(1) { animation-delay: 0s; }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
`;
document.head.appendChild(style);

const {
  appName,
  aiName,
  aiModel,
  pointsPerPhoto,
  welcomeTimeout,
  avatars,
  messages: configMessages,
  links
} = APP_CONFIG;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [userGender, setUserGender] = useState('male');
  const [genAI, setGenAI] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  // Initialize Gemini
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY?.trim();
    console.log('🔑 Checking API Key...');
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    console.log('API Key prefix:', apiKey?.substring(0, 10) + '...');
    
    if (!apiKey || apiKey.length < 20 || apiKey.includes('your_')) {
      console.warn('❌ Gemini API key not configured properly');
      return;
    }
    try {
      console.log('✅ Initializing Gemini AI...');
      setGenAI(new GoogleGenerativeAI(apiKey));
      console.log('✅ Gemini AI initialized successfully!');
    } catch (err) {
      console.error('❌ Gemini init failed:', err);
    }
  }, []);

  // Load user & show welcome
  useEffect(() => {
    const name = localStorage.getItem('userName') || 'there';
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setUserGender(profile.gender || 'male');

    if (!localStorage.getItem('chatInitialized')) {
      const welcome = genAI ? buildWelcomeMessage(profile, name) : buildApiKeyMessage();
      setMessages([welcome]);
      localStorage.setItem('chatInitialized', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genAI]);

  const buildApiKeyMessage = () => ({
    id: Date.now(),
    sender: 'system',
    text: configMessages.apiKeyMissing.replace('{{aiName}}', aiName),
    avatar: avatars.ai,
    timestamp: new Date().toISOString()
  });

  const buildWelcomeMessage = (profile, name) => {
    let text = configMessages.welcome
      .replace('{{name}}', name)
      .replace('{{aiName}}', aiName);

    if (Object.keys(profile).length > 0) {
      const bmi = profile.weight && profile.height
        ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
        : null;

      let stats = '';
      if (profile.age) stats += `• Age: ${profile.age}\n`;
      if (profile.height && profile.weight) {
        stats += `• ${profile.height}cm, ${profile.weight}kg`;
        if (bmi) stats += ` (BMI: ${bmi})`;
        stats += `\n`;
      }
      if (profile.fitnessTrack) stats += `• Goal: ${profile.fitnessTrack}\n`;

      text = text.replace('{{profile}}', configMessages.profileSummary.replace('{{stats}}', stats.trim()));
    } else {
      text = text.replace('{{profile}}', '');
    }

    return {
      id: Date.now(),
      sender: 'ai',
      text,
      avatar: avatars.ai,
      timestamp: new Date().toISOString()
    };
  };

  const generateAIResponse = async (userText, files) => {
    if (!genAI) return;
    setIsAiTyping(true);

    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const hasImage = files.some(f => f.isImage);

    try {
      const model = genAI.getGenerativeModel({ model: aiModel });

      const prompt = `You are ${aiName}, a friendly, expert personal trainer.
Client: ${profile.name || 'User'}
Goal: ${profile.fitnessTrack || 'General fitness'}
Stats: ${profile.height || '?'}cm, ${profile.weight || '?'}kg

Message: "${userText}"

${hasImage ? 'They uploaded a photo – give specific, encouraging feedback!' : ''}

Respond conversationally, under 250 words, use emojis naturally.`;

      const result = await model.generateContent([
        prompt,
        ...files.filter(f => f.isImage).map(f => ({
          inlineData: { data: f.base64, mimeType: f.type }
        }))
      ]);

      let response = result.response.text();

      if (hasImage) {
        response += `\n\n+${pointsPerPhoto} points for progress photo!`;
        const points = (parseInt(localStorage.getItem('userPoints') || '0') + pointsPerPhoto).toString();
        localStorage.setItem('userPoints', points);
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: response,
        avatar: avatars.ai,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      let errorMessage = '**AI Error**\n\n';
      
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
        errorMessage += '❌ Invalid API key. Please check your key at:\nhttps://aistudio.google.com/app/apikey';
      } else if (error.message.includes('quota') || error.message.includes('429')) {
        errorMessage += '❌ Daily API limit reached. Try again tomorrow or upgrade your quota.';
      } else if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed to fetch')) {
        errorMessage += '❌ Network error. Check your internet connection.\n\nTry:\n• Refreshing the page\n• Checking your firewall\n• Using a VPN if blocked';
      } else if (error.message.includes('CORS')) {
        errorMessage += '❌ CORS error. This is a browser security issue.\n\nThe API key works, but browser is blocking the request.';
      } else {
        errorMessage += `❌ Connection failed.\n\nError: ${error.message}\n\nPlease check:\n• Internet connection\n• API key is valid\n• No firewall blocking requests`;
      }
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'system',
        text: errorMessage,
        avatar: avatars.ai,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim() && attachedFiles.length === 0) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: message || 'Sent files',
      avatar: userGender === 'female' ? avatars.female : avatars.male,
      timestamp: new Date().toISOString(),
      files: [...attachedFiles]
    };

    setMessages(prev => [...prev, userMsg]);
    const text = message;
    const files = [...attachedFiles];
    setMessage('');
    setAttachedFiles([]);
    setInterimTranscript('');

    setTimeout(() => generateAIResponse(text, files), welcomeTimeout);
  };

  const handleFileUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          isImage: file.type.startsWith('image/'),
          url: URL.createObjectURL(file),
          base64: reader.result.split(',')[1]
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id) => setAttachedFiles(prev => prev.filter(f => f.id !== id));

  // Speech Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Speech not supported');

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (e) => {
      let final = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        e.results[i].isFinal ? final += t + ' ' : interim += t;
      }
      if (final) setMessage(prev => prev + final);
      setInterimTranscript(interim);
    };

    recognition.onerror = recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setInterimTranscript('');
  };

  useEffect(() => {
    if (isListening && message) stopListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {appName} Chat
              <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-1 rounded-full">
                {aiName}
              </span>
            </h1>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${genAI ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {genAI ? configMessages.onlineStatus : configMessages.offlineStatus}
            </span>
          </div>
          {!genAI && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <a href={links.apiKey} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                Get free API key →
              </a>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 msg-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender !== 'user' && <img src={msg.avatar} alt="" className="w-9 h-9 rounded-full" />}
                <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : msg.sender === 'system'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                  {msg.files?.map(f => (
                    <div key={f.id} className="mt-2">
                      {f.isImage ? <img src={f.url} alt="" className="max-w-full h-32 object-cover rounded-lg" /> : 
                       <div className="text-xs bg-white/30 px-2 py-1 rounded">File: {f.name}</div>}
                    </div>
                  ))}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.sender === 'user' && <img src={msg.avatar} alt="" className="w-9 h-9 rounded-full" />}
              </div>
            ))}

            {isAiTyping && (
              <div className="flex gap-3">
                <img src={avatars.ai} alt="" className="w-9 h-9 rounded-full" />
                <div className="bg-gray-100 px-4 py-3 rounded-2xl typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t bg-gray-50 p-4">
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {attachedFiles.map(f => (
                  <div key={f.id} className="flex items-center gap-2 bg-white border rounded-lg px-3 py-1 text-sm">
                    {f.isImage ? <img src={f.url} alt="" className="w-8 h-8 object-cover rounded" /> : 'File'}
                    <span className="truncate max-w-32">{f.name}</span>
                    <button onClick={() => removeFile(f.id)} className="text-red-500">×</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={message + interimTranscript}
                onChange={(e) => setMessage(e.target.value.replace(interimTranscript, ''))}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder={genAI ? "Ask about fitness, diet, form..." : "API key required"}
                disabled={!genAI}
                className="flex-1 px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />

              <label className="cursor-pointer p-2.5 border rounded-xl hover:bg-gray-100 disabled:opacity-50">
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} disabled={!genAI} className="hidden" />
                📎
              </label>

              <button
                onClick={genAI ? (isListening ? stopListening : startListening) : undefined}
                disabled={!genAI}
                className={`p-2.5 border rounded-xl ${isListening ? 'bg-red-500 text-white' : 'hover:bg-gray-100'} disabled:opacity-50`}
              >
                🎤
              </button>

              <button
                onClick={handleSend}
                disabled={!genAI || (!message.trim() && attachedFiles.length === 0)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-md disabled:opacity-50"
              >
                Send
              </button>
            </div>

            {interimTranscript && (
              <p className="text-xs text-gray-500 mt-2 animate-pulse">Listening: {interimTranscript}</p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <Navigation currentPage="chat" />
      </div>
    </div>
  );
};

export default Chat;