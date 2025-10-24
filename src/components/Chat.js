import React, { useState, useEffect, useRef } from 'react';
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
  pointsPerPhoto,
  welcomeTimeout,
  avatars,
  messages: configMessages,
} = APP_CONFIG;

// --- OpenRouter Integration --- 
const API_KEY = "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";
const OPENROUTER_MODEL = "meta-llama/llama-4-maverick:free"; // Using the specified multimodal model
const SITE_URL = window.location.origin;
const SITE_NAME = "FitCoach AI";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userGender, setUserGender] = useState('male');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, loading]);

  // Load user info and show initial welcome message
  useEffect(() => {
    const name = localStorage.getItem('userName') || 'there';
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setUserGender(profile.gender || 'male');

    if (messages.length === 0) {
        setMessages([buildWelcomeMessage(profile, name)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      role: 'assistant',
      content: text,
      avatar: avatars.ai,
      timestamp: new Date().toISOString()
    };
  };

  const generateAIResponse = async (history, files) => {
    setLoading(true);
    setError(null);

    const hasImage = files.length > 0;
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const SYSTEM_PROMPT = `You are ${aiName}, a friendly, expert personal trainer for the app ${appName}.
Your client is ${profile.name || 'User'}.
Their goal is: ${profile.fitnessTrack || 'General fitness'}.
Their stats are: ${profile.height || '?'}cm, ${profile.weight || '?'}kg.

Your job is to:
- Provide encouraging and helpful advice on fitness, diet, and health.
- If an image is provided, analyze it carefully and give specific feedback (e.g., on meal contents, workout form).
- Keep responses conversational, concise (under 200 words), and use emojis naturally.
- Never say you are just a bot or AI model. You are their personal trainer, Coach.
- Use markdown for formatting if needed.`;
    
    // Construct the user message with text and images per OpenRouter spec
    const lastUserMessage = history[history.length - 1];
    const userMessageContent = [{ type: "text", text: lastUserMessage.content }];
    if (hasImage) {
        files.forEach(file => {
            userMessageContent.push({
                type: "image_url",
                image_url: { url: `data:${file.type};base64,${file.base64}` }
            });
        });
    }

    const requestMessages = history.slice(0, -1).map(m => ({ role: m.role, content: m.content }));
    requestMessages.push({ role: 'user', content: userMessageContent });

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...requestMessages,
          ],
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || "API error");
      }

      const data = await res.json();
      let reply = data.choices?.[0]?.message?.content || "(No response)";
      
      if (hasImage) {
        reply += `\n\n+${pointsPerPhoto} points for progress photo!`;
        const points = (parseInt(localStorage.getItem('userPoints') || '0') + pointsPerPhoto).toString();
        localStorage.setItem('userPoints', points);
      }

      setMessages((msgs) => [...msgs, { 
        id: Date.now(), 
        role: "assistant", 
        content: reply, 
        avatar: avatars.ai,
        timestamp: new Date().toISOString()
      }]);

    } catch (err) {
      setError(`Failed to get response: ${err.message}`);
      setMessages((msgs) => [...msgs, { 
        id: Date.now(), 
        role: "system", 
        content: `**AI Error**\n\n❌ ${err.message}`,
        avatar: avatars.ai,
        timestamp: new Date().toISOString()
       }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() && attachedFiles.length === 0) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: input || 'Sent an image',
      avatar: userGender === 'female' ? avatars.female : avatars.male,
      timestamp: new Date().toISOString(),
      files: [...attachedFiles] // show preview in user message
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    const newHistory = newMessages.filter(m => m.role === 'user' || m.role === 'assistant');
    const filesToSend = [...attachedFiles];
    setInput('');
    setAttachedFiles([]);

    setTimeout(() => generateAIResponse(newHistory, filesToSend), 500);
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
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${API_KEY.includes('sk-or-v1') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {API_KEY.includes('sk-or-v1') ? configMessages.onlineStatus : configMessages.offlineStatus}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 msg-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role !== 'user' && <img src={msg.avatar} alt="" className="w-9 h-9 rounded-full" />}
                <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : msg.role === 'system'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                   <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                   {msg.files?.map(f => (
                    <div key={f.id} className="mt-2">
                      <img src={f.url} alt="" className="max-w-full h-32 object-cover rounded-lg" />
                    </div>
                  ))}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.role === 'user' && <img src={msg.avatar} alt="" className="w-9 h-9 rounded-full" />}
              </div>
            ))}

            {loading && (
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
                        <img src={f.url} alt="" className="w-8 h-8 object-cover rounded" />
                        <span className="truncate max-w-32">{f.name}</span>
                        <button onClick={() => removeFile(f.id)} className="text-red-500">×</button>
                    </div>
                    ))}
                </div>
            )}
            {error && <div className="text-red-500 text-xs pb-2">{error}</div>}
            <div className="flex gap-2 items-end">
              <textarea
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about fitness, or attach a photo..."
                disabled={loading}
                className="flex-1 resize-none px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
               <label className="cursor-pointer p-2.5 border rounded-xl hover:bg-gray-100 disabled:opacity-50">
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} disabled={loading} className="hidden" />
                📎
              </label>
              <button
                onClick={handleSend}
                disabled={loading || (!input.trim() && attachedFiles.length === 0)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-md disabled:opacity-50"
              >
                Send
              </button>
            </div>
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
