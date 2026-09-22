import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import {
  ArrowLeft,
  AlertTriangle,
  Radio,
  Shield,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export const Screen19EmergencySOS: React.FC = () => {
  const { incomingOrder, goBack, t } = usePartner();
  const [sosDispatched, setSosDispatched] = useState(false);
  const [dispatchTime, setDispatchTime] = useState<string>('');

  const handleDispatchSOS = () => {
    setSosDispatched(true);
    setDispatchTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  return (
    <div className="flex-1 bg-black text-white flex flex-col justify-between p-6 select-none overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={goBack}
          className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-black tracking-wider uppercase">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>UP 112 EMERGENCY DESK</span>
        </div>

        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Main Alert Beacon & Status */}
      <div className="text-center space-y-4 my-auto py-2">
        <div className="relative inline-block mx-auto">
          <div className="w-28 h-28 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-red-500 animate-pulse shadow-2xl shadow-red-900/50">
            <AlertTriangle className="w-14 h-14" />
          </div>
          <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-black">
            !
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {sosDispatched ? '🚨 SOS ALARM DISPATCHED' : 'EMERGENCY SOS DESK'}
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed mt-1">
            {sosDispatched
              ? `Live distress signal broadcast at ${dispatchTime}. UP Police 112 Control Room & DoNow Safety Officers are responding.`
              : 'Pressing the emergency button immediately shares your live GPS telemetry, audio recording, and order details with UP Police 112.'}
          </p>
        </div>

        {/* Live Telemetry Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 text-left space-y-2.5 max-w-sm mx-auto text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Live GPS Coordinates
            </span>
            <span className="font-mono text-amber-400 font-bold">26.8687° N, 80.9126° E</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Nearest Police Station</span>
            <span className="font-bold text-neutral-200">Chowk Thana, Lucknow (600m)</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Active Task ID</span>
            <span className="font-mono font-bold text-emerald-400">#ORD-KGMU-88219</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              Audio Evidence Recording
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Streaming to Safety Cloud
            </span>
          </div>
        </div>

        {sosDispatched && (
          <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl max-w-sm mx-auto flex items-center gap-3 text-left">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-300">Safety Officer Assigned</p>
              <p className="text-[11px] text-neutral-400">
                Command Centre executive Inspector R. Sharma is dialing your phone right now.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {!sosDispatched ? (
          <button
            onClick={handleDispatchSOS}
            className="w-full py-4 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-black rounded-2xl text-base shadow-xl shadow-red-950 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
          >
            <ShieldAlert className="w-5 h-5 fill-current" />
            <span>CONFIRM & DISPATCH 112 SOS</span>
          </button>
        ) : (
          <a
            href="tel:112"
            className="w-full py-4 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-black rounded-2xl text-base shadow-xl shadow-red-950 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
          >
            <PhoneCall className="w-5 h-5 fill-current" />
            <span>CALL 112 DIRECTLY NOW</span>
          </a>
        )}

        <button
          onClick={goBack}
          className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold rounded-2xl text-xs uppercase tracking-wider border border-neutral-800 transition-colors"
        >
          Cancel / Return to Job
        </button>
      </div>
    </div>
  );
};
