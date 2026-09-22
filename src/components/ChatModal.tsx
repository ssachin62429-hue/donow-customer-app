import React, { useState } from 'react';
import { X, Send, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_PARTNER } from '../data/mockRepository';

export const ChatModal: React.FC = () => {
  const { isChatOpen, setIsChatOpen, language } = useApp();
  const [messages, setMessages] = useState<{ id: string; sender: 'partner' | 'user'; text: string; time: string }[]>([
    {
      id: 'm1',
      sender: 'partner',
      text: language === 'hi' ? 'नमस्ते! मैं 8 मिनट में KGMU गेट नंबर 2 पर पहुंच रहा हूँ।' : 'Hello! I am on my way and will reach KGMU Gate 2 in about 8 minutes.',
      time: '09:52 AM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: language === 'hi' ? 'जी, मैं रिसेप्शन काउंटर के पास पीले बोर्ड के पास खड़ा हूँ।' : 'Great, I will be waiting near the main OPD reception under the yellow board.',
      time: '09:53 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Mock partner auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'partner' as const,
          text: language === 'hi' ? 'ठीक है, मैं पहुंच गया हूँ!' : 'Noted, I have arrived and located the spot!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md h-[90vh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center border border-neutral-600">
              <User className="w-5 h-5 text-neutral-300" />
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                <span>{DEMO_PARTNER.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>In-App Masked Chat</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Masking Alert */}
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-[11px] text-amber-800 text-center font-medium">
          {language === 'hi'
            ? 'सुरक्षा: आपकी गोपनीयता के लिए फोन नंबर छिपाए गए हैं।'
            : 'Privacy Shield: Phone numbers are masked. Chat within DoNow for full assistance coverage.'}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200 rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'hi' ? 'संदेश लिखें...' : 'Type a message...'}
            className="flex-1 px-3.5 py-2.5 text-xs bg-neutral-100 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 active:scale-95 transition-all disabled:opacity-50"
            disabled={!inputText.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
