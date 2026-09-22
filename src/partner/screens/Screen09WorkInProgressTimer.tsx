import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { AlertOctagon, Wifi, WifiOff, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Screen09WorkInProgressTimer: React.FC = () => {
  const {
    timerSeconds,
    isOfflineMode,
    setIsOfflineMode,
    scheduledStartTime,
    endWorkAndGenerateBill,
    incomingOrder,
    t,
  } = usePartner();

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs < 10 ? `0${hrs}` : hrs}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between p-5 select-none overflow-y-auto">
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

        {/* Task Details Card */}
        <div className="bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 space-y-2.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Assigned Task</span>
            <span className="font-bold text-white">{incomingOrder.serviceEn}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Customer Name</span>
            <span className="font-bold text-neutral-200">{incomingOrder.customerFirstName}</span>
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
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black rounded-2xl text-base shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
        >
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>{t('endWorkBtn')}</span>
        </button>

        <button
          onClick={() => alert('EMERGENCY SOS: 112 Emergency Dispatch and DoNow 24x7 Safety Command Centre alerted with live GPS coordinates.')}
          className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md shadow-red-950"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>{t('sosEmergencyBtn')}</span>
        </button>
      </div>
    </div>
  );
};
