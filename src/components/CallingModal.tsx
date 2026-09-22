import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_PARTNER } from '../data/mockRepository';

export const CallingModal: React.FC = () => {
  const { isCallingOpen, setIsCallingOpen, language } = useApp();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callStatus, setCallStatus] = useState<'Connecting...' | 'Connected' | 'Ended'>('Connecting...');

  useEffect(() => {
    let timer: any = null;
    if (isCallingOpen) {
      setCallStatus('Connecting...');
      setCallDuration(0);
      const connectTimeout = setTimeout(() => {
        setCallStatus('Connected');
      }, 1500);

      timer = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);

      return () => {
        clearTimeout(connectTimeout);
        clearInterval(timer);
      };
    }
  }, [isCallingOpen]);

  if (!isCallingOpen) return null;

  const formatSecs = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex flex-col justify-between p-6 text-white animate-in fade-in duration-200">
      {/* Top Bar with Privacy Shield */}
      <div className="pt-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Number Masked • Direct Privacy Call</span>
        </div>
        <div className="text-xs text-neutral-400 font-mono">
          Via DoNow Secure Relay (+91 080-4568-XXXX)
        </div>
      </div>

      {/* Partner Info */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="w-28 h-28 rounded-full bg-neutral-800 border-4 border-neutral-700 flex items-center justify-center mb-4 shadow-2xl relative overflow-hidden">
          <User className="w-14 h-14 text-neutral-400" />
          {callStatus === 'Connected' && (
            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-900 animate-pulse" />
          )}
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{DEMO_PARTNER.name}</h2>
        <p className="text-neutral-400 text-sm mt-1">
          DoNow Verified Partner • Hospital & Event Specialist
        </p>
        <div className="mt-4 text-emerald-400 font-mono font-medium text-sm">
          {callStatus === 'Connecting...' ? (
            <span className="animate-pulse">Connecting securely...</span>
          ) : (
            <span>Connected {formatSecs(callDuration)}</span>
          )}
        </div>
      </div>

      {/* Privacy reminder */}
      <div className="text-center px-4 py-2 bg-neutral-900/80 rounded-xl border border-neutral-800 mb-6">
        <p className="text-[11px] text-neutral-400">
          {language === 'hi'
            ? 'सुरक्षा नियम: बातचीत केवल कार्य समन्वय तक सीमित रखें। व्यक्तिगत नंबर साझा न करें।'
            : 'Safety Rule: Keep call focused on task coordination. Never exchange personal phone numbers.'}
        </p>
      </div>

      {/* Call Actions */}
      <div className="pb-8 flex items-center justify-around max-w-xs mx-auto w-full">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full transition-all ${
            isMuted ? 'bg-red-600/30 text-red-400' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={() => {
            setCallStatus('Ended');
            setTimeout(() => setIsCallingOpen(false), 300);
          }}
          className="p-5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl active:scale-95 transition-transform"
        >
          <PhoneOff className="w-7 h-7" />
        </button>

        <button
          onClick={() => setIsSpeaker(!isSpeaker)}
          className={`p-4 rounded-full transition-all ${
            isSpeaker ? 'bg-emerald-600/30 text-emerald-400' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
