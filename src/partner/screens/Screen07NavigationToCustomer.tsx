import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import {
  Phone,
  MessageSquare,
  Shield,
  ChevronRight,
  Navigation,
  LocateFixed,
  X,
  Send,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  AlertTriangle,
  Radio,
  CheckCircle2,
} from 'lucide-react';

export const Screen07NavigationToCustomer: React.FC = () => {
  const {
    navigate,
    incomingOrder,
    markArrived,
    distanceMetres,
    setDistanceMetres,
    t,
  } = usePartner();

  const [slideVal, setSlideVal] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callSpeaker, setCallSpeaker] = useState(false);
  const [callDuration, setCallDuration] = useState(6);

  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'partner',
      text: 'Namaste! Main nikal chuka hoon, agle 5 minute mein spot par pahunch raha hoon.',
      time: 'Just now',
    },
    {
      sender: 'customer',
      text: 'Theek hai bhai, main Gate 2 reception ke pass blue shirt mein khada hoon.',
      time: 'Just now',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const [showSosModal, setShowSosModal] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSlideVal(val);
    if (val >= 90) {
      markArrived();
      setSlideVal(0);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'partner',
        text: newMessage.trim(),
        time: 'Just now',
      },
    ]);
    setNewMessage('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'customer',
          text: 'Ji theek hai, main yahin dekh raha hoon.',
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  const sendQuickReply = (msg: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'partner',
        text: msg,
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className="flex-1 bg-neutral-900 text-white flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top Floating Navigation Header */}
      <div className="p-4 z-20 bg-neutral-950/95 border-b border-neutral-800 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500 text-neutral-950">
              <Navigation className="w-5 h-5 fill-current" />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block">
                {t('navigatingTitle')}
              </span>
              <h3 className="text-sm font-black text-white">
                Turn Right in 200m on Shah Mina Rd
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('partner-sos')}
              className="px-2.5 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600/60 text-red-400 border border-red-500/50 text-[10px] font-black uppercase flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>SOS</span>
            </button>
            <div className="text-right">
              <span className="font-mono font-bold text-emerald-400 text-base">
                {incomingOrder.etaMins} mins
              </span>
              <span className="block text-[10px] text-neutral-400">
                {(distanceMetres / 1000).toFixed(1)} km
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Interactive Route Map */}
      <div className="flex-1 relative bg-neutral-800 flex items-center justify-center overflow-hidden">
        {/* Stylized Street Grid Canvas */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* Route Line SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
          <path
            d="M 200 420 L 200 280 L 140 280 L 140 140 L 220 140"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8 4"
            className="animate-pulse"
          />
          {/* 50m Geofence circle around customer destination */}
          <circle cx="220" cy="140" r="45" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
        </svg>

        {/* Customer Destination Pin */}
        <div className="absolute top-[115px] left-[195px] z-10 flex flex-col items-center">
          <div className="bg-emerald-500 text-neutral-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg border border-emerald-300">
            Customer ({incomingOrder.customerFirstName})
          </div>
          <div className="w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Partner Current Location Pin */}
        <div className="absolute bottom-[65px] left-[185px] z-10 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 border-2 border-white flex items-center justify-center shadow-xl">
            <Navigation className="w-4 h-4 fill-current rotate-45" />
          </div>
          <div className="bg-neutral-900 text-amber-400 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-400 mt-1 shadow-md">
            You ({distanceMetres}m away)
          </div>
        </div>

        {/* GPS Geofence Quick Simulator Pill for Reviewer */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setDistanceMetres(distanceMetres > 50 ? 35 : 350)}
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-950/90 text-amber-300 border border-amber-500/50 shadow-lg flex items-center gap-1.5 hover:bg-neutral-900"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>GPS: {distanceMetres}m ({distanceMetres <= 50 ? 'Within 50m' : '>50m'})</span>
          </button>
        </div>
      </div>

      {/* Customer Info Card & Masked Call Controls */}
      <div className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-3 z-20">
        <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              {t('customerLabel')} (First Name Only)
            </span>
            <h4 className="text-base font-black text-white">
              {incomingOrder.customerFirstName}
            </h4>
            <span className="text-xs text-neutral-400 block max-w-[200px] truncate">
              {incomingOrder.locationName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('partner-call')}
              className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{t('callMaskedBtn')}</span>
            </button>

            <button
              onClick={() => navigate('partner-chat')}
              className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl border border-neutral-700 active:scale-95 transition-all relative cursor-pointer"
              title="Chat with Customer"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-neutral-900" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 bg-neutral-900/50 px-2 py-1.5 rounded-lg border border-neutral-800">
          <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{t('privacyNoticePhone')}</span>
        </div>

        {/* Bottom Slider: "SLIDE TO MARK ARRIVED" */}
        <div className="relative bg-neutral-900 border-2 border-amber-500 rounded-2xl h-16 flex items-center px-2 overflow-hidden shadow-xl">
          <div
            className="absolute inset-y-0 left-0 bg-amber-500 transition-all pointer-events-none rounded-xl"
            style={{ width: `${Math.max(slideVal, 15)}%` }}
          />

          <span className="w-full text-center font-black text-xs uppercase tracking-wider text-amber-300 z-10 flex items-center justify-center gap-1 pointer-events-none">
            <span>{t('slideToArrive')}</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={slideVal}
            onChange={handleSlideChange}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
          />

          <div
            className="w-12 h-12 bg-white text-neutral-950 rounded-xl flex items-center justify-center font-black shadow-md z-30 transition-transform pointer-events-none"
            style={{ transform: `translateX(${(slideVal / 100) * 260}px)` }}
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </div>
        </div>
      </div>

      {/* 1. MASKED CALL MODAL / DIALER OVERLAY */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                DoNow Virtual Bridge Active
              </span>
            </div>
            <button
              onClick={() => setShowCallModal(false)}
              className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-4 my-auto">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-emerald-600/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                <Phone className="w-10 h-10 fill-current" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">
                {incomingOrder.customerFirstName} (Customer)
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Virtual Proxy: +91 522 491 8820
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-emerald-400">
                Connected • 00:{callDuration < 10 ? `0${callDuration}` : callDuration}
              </span>
            </div>

            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-left text-xs text-neutral-400 max-w-xs mx-auto space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Masked Call Protection</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Neither customer nor partner can see each other's real mobile numbers. Call is recorded for safety.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setCallMuted(!callMuted)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                  callMuted
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                }`}
              >
                {callMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                <span className="text-[10px] font-bold">{callMuted ? 'Muted' : 'Mute'}</span>
              </button>

              <button
                onClick={() => setCallSpeaker(!callSpeaker)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                  callSpeaker
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                }`}
              >
                <Volume2 className="w-6 h-6" />
                <span className="text-[10px] font-bold">{callSpeaker ? 'Speaker On' : 'Speaker'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <PhoneOff className="w-5 h-5 fill-current" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. IN-APP CHAT MODAL OVERLAY */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col justify-between">
          {/* Chat Header */}
          <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                {incomingOrder.customerFirstName.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{incomingOrder.customerFirstName}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[11px] text-neutral-400 truncate max-w-[200px]">
                  {incomingOrder.locationName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowChatModal(false);
                  setShowCallModal(true);
                }}
                className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
              >
                <Phone className="w-4 h-4 fill-current" />
              </button>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-center">
              <span className="text-[10px] text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                🔒 In-app conversation protected by DoNow Trust & Safety
              </span>
            </div>

            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'partner' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'partner'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'bg-neutral-800 text-neutral-100 rounded-bl-none border border-neutral-700'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-neutral-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Replies & Input */}
          <div className="p-3 bg-neutral-900 border-t border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => sendQuickReply('Main Gate par pahunch gaya hoon!')}
                className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px]"
              >
                📍 Gate par pahunch gaya hoon
              </button>
              <button
                onClick={() => sendQuickReply('Aap kis jagah khade hain?')}
                className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px]"
              >
                ❓ Aap kahan khade hain?
              </button>
              <button
                onClick={() => sendQuickReply('2 minute jam mein hoon, aa raha hoon.')}
                className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px]"
              >
                ⏳ 2 minute jam mein hoon
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type message to customer..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. EMERGENCY SOS MODAL OVERLAY */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black text-red-500 uppercase tracking-widest">
                EMERGENCY SOS DESK
              </span>
            </div>
            <button
              onClick={() => setShowSosModal(false)}
              className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-4 my-auto">
            <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto text-red-500 animate-pulse">
              <AlertTriangle className="w-12 h-12" />
            </div>

            <h3 className="text-2xl font-black text-white">
              {sosSent ? '🚨 112 DISPATCH NOTIFIED' : 'EMERGENCY ASSISTANCE'}
            </h3>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto">
              {sosSent
                ? 'Your live GPS coordinates (26.8687° N, 80.9126° E - KGMU Chowk) and order ID have been transmitted to UP Police 112 Control Room & DoNow Safety Team.'
                : 'Pressing confirm will immediately broadcast your live GPS location to UP Police 112 and initiate an emergency callback.'}
            </p>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-left space-y-2 max-w-xs mx-auto text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Live GPS</span>
                <span className="font-mono text-amber-400 font-bold">26.8687° N, 80.9126° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Nearest Station</span>
                <span className="text-neutral-200 font-bold">Chowk Police Station, Lucknow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Audio Recording</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {!sosSent ? (
              <button
                onClick={() => setSosSent(true)}
                className="w-full py-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black rounded-2xl text-base shadow-xl shadow-red-950 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <AlertTriangle className="w-5 h-5 fill-current" />
                <span>CONFIRM & DISPATCH 112 SOS</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center text-xs text-emerald-400 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dispatched! Safety Officer is calling your phone now.</span>
              </div>
            )}

            <button
              onClick={() => setShowSosModal(false)}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold rounded-2xl text-xs uppercase tracking-wider border border-neutral-800"
            >
              Cancel / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
