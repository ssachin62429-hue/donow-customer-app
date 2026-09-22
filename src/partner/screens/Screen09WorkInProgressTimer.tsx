import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import {
  AlertOctagon,
  Wifi,
  WifiOff,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  X,
  Send,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  AlertTriangle,
  Radio,
  Shield,
} from 'lucide-react';

export const Screen09WorkInProgressTimer: React.FC = () => {
  const {
    navigate,
    timerSeconds,
    isOfflineMode,
    setIsOfflineMode,
    scheduledStartTime,
    endWorkAndGenerateBill,
    incomingOrder,
    t,
  } = usePartner();

  const [showSosModal, setShowSosModal] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  const [showCallModal, setShowCallModal] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callSpeaker, setCallSpeaker] = useState(false);
  const [callDuration, setCallDuration] = useState(12);

  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'customer',
      text: 'Bhai counter number 3 par token lena hai.',
      time: '10:05 AM',
    },
    {
      sender: 'partner',
      text: 'Ji Amit ji, token le liya hai. Main line mein khada hoon.',
      time: '10:07 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs < 10 ? `0${hrs}` : hrs}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
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
          text: 'Theek hai, dhanyawad! Jaise hi number aaye batana.',
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
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between p-5 select-none overflow-y-auto relative">
      <div className="space-y-4">
        {/* Top Status & Network Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-black border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>JOB IN PROGRESS</span>
          </div>

          {/* CRITICAL BUSINESS RULE 5: Offline Mode Badge */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              isOfflineMode
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/30 border border-amber-300'
                : 'bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>OFFLINE MODE (LOCAL TIMER)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>Online (Tap to test Offline)</span>
              </>
            )}
          </button>
        </div>

        {/* Offline Mode Banner when active */}
        {isOfflineMode && (
          <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-2xl p-3 text-xs text-amber-300 flex items-start gap-2.5">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t('offlineModeActive')}
            </p>
          </div>
        )}

        {/* BIG BOLD TIMER DISPLAY */}
        <div className="bg-neutral-900 border-2 border-neutral-800 rounded-3xl p-6 text-center space-y-3 shadow-2xl relative overflow-hidden">
          <span className="text-[11px] font-extrabold uppercase text-neutral-400 tracking-wider block">
            {t('liveTimerLabel')}
          </span>

          <div className="font-mono font-black text-5xl sm:text-6xl text-emerald-400 tracking-tight drop-shadow-md">
            {formatTimer(timerSeconds + 9000)} {/* Preloaded to show ~2.5 hrs active */}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-950 rounded-full text-xs text-neutral-300 border border-neutral-800">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Rate: ₹3/min • Base Fare: ₹450 (150m)</span>
          </div>

          {/* CRITICAL SCHEDULED START TIME NOTICE */}
          <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800 text-left text-xs space-y-1 mt-3">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Scheduled Start Time Protected
            </span>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Partner arrived early at 09:55 AM. Billing began strictly at <strong>{scheduledStartTime}</strong> per DoNow fairness policy.
            </p>
          </div>
        </div>

        {/* Task Details Card with Customer Contact Shortcuts */}
        <div className="bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Assigned Task</span>
            <span className="font-bold text-white">{incomingOrder.serviceEn}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <div>
              <span className="text-neutral-400 block">Customer</span>
              <span className="font-bold text-neutral-200">{incomingOrder.customerFirstName}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('partner-call')}
                className="px-2.5 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call</span>
              </button>
              <button
                onClick={() => navigate('partner-chat')}
                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 rounded-xl transition-all active:scale-95 cursor-pointer"
                title="Chat with Customer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Location</span>
            <span className="font-bold text-neutral-300 text-right max-w-[200px] truncate">
              {incomingOrder.locationName}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons: SOS and End Work */}
      <div className="space-y-3 pt-4 pb-1">
        <button
          onClick={endWorkAndGenerateBill}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black rounded-2xl text-base shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition-all uppercase tracking-wider cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>{t('endWorkBtn')}</span>
        </button>

        <button
          onClick={() => navigate('partner-sos')}
          className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md shadow-red-950 cursor-pointer"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>{t('sosEmergencyBtn')}</span>
        </button>
      </div>

      {/* EMERGENCY SOS POPUP MODAL */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black text-red-500 uppercase tracking-widest">
                UP 112 EMERGENCY POLICE DESK
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
              {sosSent ? '🚨 112 DISPATCH NOTIFIED' : 'EMERGENCY SOS DESK'}
            </h3>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto">
              {sosSent
                ? 'Your live GPS coordinates (26.8687° N, 80.9126° E - KGMU Chowk, Lucknow) and Partner ID have been broadcast to UP Police 112 Control Room & DoNow Safety Team.'
                : 'Pressing confirm will immediately broadcast your live GPS location to UP Police 112 and initiate an emergency priority callback.'}
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

      {/* MASKED CALL MODAL */}
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
            <div className="w-24 h-24 rounded-full bg-emerald-600/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
              <Phone className="w-10 h-10 fill-current" />
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

      {/* CHAT MODAL */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col justify-between">
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

          <div className="p-3 bg-neutral-900 border-t border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => sendQuickReply('Token mil gaya hai, line mein hoon.')}
                className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px]"
              >
                🎫 Token mil gaya
              </button>
              <button
                onClick={() => sendQuickReply('Counter par 3 log aage hain.')}
                className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px]"
              >
                ⏳ 3 log aage hain
              </button>
              <button
                onClick={() => sendQuickReply('Aadhaar / Form ki photo bhej dijiye.')}
                className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 whitespace-nowrap text-[11px]"
              >
                📄 Form / Photo bhejein
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
    </div>
  );
};

