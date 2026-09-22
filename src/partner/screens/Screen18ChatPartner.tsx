import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import {
  ArrowLeft,
  Phone,
  Send,
  Shield,
  CheckCheck,
  Paperclip,
  Smile,
  Mic,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'partner' | 'customer';
  text: string;
  time: string;
}

export const Screen18ChatPartner: React.FC = () => {
  const { incomingOrder, goBack, navigate, t } = usePartner();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'customer',
      text: 'Bhai counter number 3 par token lena hai KGMU Gate 2 par.',
      time: '10:04 AM',
    },
    {
      id: '2',
      sender: 'partner',
      text: 'Ji Amit ji, main KGMU Chowk pahunch gaya hoon, 2 minute mein counter par hoon.',
      time: '10:06 AM',
    },
    {
      id: '3',
      sender: 'customer',
      text: 'Theek hai, main OPD parchi lekar wahin aa raha hoon.',
      time: '10:07 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'partner',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated auto-reply from customer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'customer',
          text: 'Dhanyawad bhai! Main gate par wait kar raha hoon.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const sendQuickReply = (text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'partner',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between select-none overflow-hidden">
      {/* Top App Bar */}
      <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black flex items-center justify-center text-sm shadow-md">
              {incomingOrder.customerFirstName.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>{incomingOrder.customerFirstName}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-neutral-400 truncate max-w-[170px]">
                {incomingOrder.locationName}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Masked Call Shortcut */}
        <button
          onClick={() => navigate('partner-call')}
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>Call</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-neutral-900/60 px-4 py-1.5 border-b border-neutral-800/80 flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
        <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
        <span>In-app chat is encrypted & monitored for safety</span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => {
          const isMe = m.sender === 'partner';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                  isMe
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-neutral-900 text-neutral-100 rounded-bl-xs border border-neutral-800'
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                <span className="text-[10px] text-neutral-500">{m.time}</span>
                {isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Reply Template Chips */}
      <div className="p-2.5 bg-neutral-900 border-t border-neutral-800 space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => sendQuickReply('Main gate par khada hoon.')}
            className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px] font-medium"
          >
            📍 Main gate par hoon
          </button>
          <button
            onClick={() => sendQuickReply('Token number kya hai aapka?')}
            className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px] font-medium"
          >
            🎫 Token number?
          </button>
          <button
            onClick={() => sendQuickReply('5 minute mein counter par pahunch raha hoon.')}
            className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px] font-medium"
          >
            ⏳ 5 min mein
          </button>
          <button
            onClick={() => sendQuickReply('Aadhaar / Parchi photo bhej dijiye.')}
            className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px] font-medium"
          >
            📄 Photo bhejein
          </button>
        </div>

        {/* Text Input Row */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type message to customer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
