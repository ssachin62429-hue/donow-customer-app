import React, { useState, useEffect } from 'react';
import { usePartner } from '../context/PartnerContext';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  Pause,
  Play,
  Shield,
  Clock,
  Radio,
} from 'lucide-react';

export const Screen17CallPartner: React.FC = () => {
  const { incomingOrder, goBack, navigate, t } = usePartner();

  const [callDuration, setCallDuration] = useState(14);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callStatus, setCallStatus] = useState<'Connected' | 'On Hold' | 'Call Ended'>('Connected');

  useEffect(() => {
    if (callStatus !== 'Connected') return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatSecs = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${s < 10 ? `0${s}` : s}`;
  };

  const toggleHold = () => {
    if (isOnHold) {
      setIsOnHold(false);
      setCallStatus('Connected');
    } else {
      setIsOnHold(true);
      setCallStatus('On Hold');
    }
  };

  const handleEndCall = () => {
    setCallStatus('Call Ended');
    setTimeout(() => {
      goBack();
    }, 600);
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between p-6 select-none relative overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={goBack}
          className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DoNow Masked Call Bridge</span>
          </div>
          <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
            Relay: +91 522 491 8820
          </p>
        </div>

        <button
          onClick={() => navigate('partner-chat')}
          className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 active:scale-95 transition-all"
          title="Open Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Center: Customer Avatar, Name, Status, Waveform */}
      <div className="text-center space-y-4 my-auto">
        <div className="relative inline-block mx-auto">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-3xl font-black text-white">
              {incomingOrder.customerFirstName.charAt(0)}
            </div>
          </div>
          {callStatus === 'Connected' && (
            <span className="absolute bottom-1 right-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-neutral-950 animate-ping" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-black text-white">
            {incomingOrder.customerFirstName} (Customer)
          </h2>
          <p className="text-xs text-neutral-400 max-w-[260px] mx-auto truncate mt-0.5">
            {incomingOrder.locationName}
          </p>

          <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-sm font-bold text-emerald-400">
              {callStatus === 'Call Ended' ? 'Call Ended' : isOnHold ? 'Call on Hold' : formatSecs(callDuration)}
            </span>
          </div>
        </div>

        {/* Audio Pulse Visualizer Simulation */}
        <div className="flex items-center justify-center gap-1.5 h-8">
          {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 35].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isOnHold
                  ? 'bg-neutral-700 h-2'
                  : 'bg-emerald-500 animate-pulse'
              }`}
              style={{
                height: isOnHold ? '6px' : `${Math.max(8, (h * (isMuted ? 0.2 : 1)))}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>

        {/* Privacy & Safety Badge */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 max-w-xs mx-auto text-left space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span>100% Privacy Protected</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Your personal phone number is completely shielded. All calls are routed securely through DoNow's cloud telephony bridge.
          </p>
        </div>
      </div>

      {/* In-Call Action Control Grid */}
      <div className="space-y-6 pt-2">
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-1.5 active:scale-95 transition-all ${
              isMuted
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            <span className="text-[10px] font-bold">{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          {/* Speaker Toggle */}
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-1.5 active:scale-95 transition-all ${
              isSpeaker
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            {isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            <span className="text-[10px] font-bold">{isSpeaker ? 'Speaker On' : 'Speaker'}</span>
          </button>

          {/* Hold Toggle */}
          <button
            onClick={toggleHold}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-1.5 active:scale-95 transition-all ${
              isOnHold
                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            {isOnHold ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
            <span className="text-[10px] font-bold">{isOnHold ? 'Resume' : 'Hold'}</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-full py-4 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-black rounded-2xl text-base shadow-xl shadow-red-950 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
        >
          <PhoneOff className="w-6 h-6 fill-current" />
          <span>{callStatus === 'Call Ended' ? 'Call Ended' : 'End Call'}</span>
        </button>
      </div>
    </div>
  );
};
