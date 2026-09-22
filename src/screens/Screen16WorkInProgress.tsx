import React from 'react';
import {
  Clock,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  MapPin,
  ShieldCheck,
  Pause,
  Play,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { InteractiveMapMock } from '../components/InteractiveMapMock';
import { DEMO_PARTNER } from '../data/mockRepository';

export const Screen16WorkInProgress: React.FC = () => {
  const {
    activeOrder,
    bookingDraft,
    workTimerSeconds,
    isWorkTimerActive,
    setIsWorkTimerActive,
    handleCompleteWork,
    setIsCallingOpen,
    setIsChatOpen,
    navigate,
    t,
    language,
  } = useApp();

  const partner = activeOrder?.partner || DEMO_PARTNER;
  const serviceName = activeOrder?.serviceName || bookingDraft.serviceName;

  // Format seconds into HH:MM:SS
  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours > 0 ? `${hours}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('workInProgressTitle')} showBack={false} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Active Timer Card */}
        <div className="bg-neutral-900 text-white p-5 rounded-2xl shadow-md relative overflow-hidden text-center">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE TASK IN PROGRESS</span>
            </span>
            <span className="font-mono text-[11px]">Started: 10:00 AM</span>
          </div>

          <div className="text-4xl font-black font-mono tracking-wider text-white my-3">
            {formatTimer(workTimerSeconds)}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-300">
            <span>Rate: ₹{activeOrder?.ratePerMin || 3}/min</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">
              Current Fare: ₹{Math.max(activeOrder?.baseFare || 60, Math.ceil(workTimerSeconds / 60) * (activeOrder?.ratePerMin || 3))}
            </span>
          </div>

          {/* Pause / Resume demo control */}
          <div className="mt-3.5 pt-3 border-t border-neutral-800 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsWorkTimerActive(!isWorkTimerActive)}
              className="px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 transition-colors"
            >
              {isWorkTimerActive ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>Pause Timer (Demo)</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>Resume Timer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Location Placeholder */}
        <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'hi' ? 'पार्टनर का लाइव लोकेशन' : 'Partner Live Location'}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>On-Site Verified</span>
            </span>
          </div>
          <InteractiveMapMock
            heightClass="h-36"
            showPartnerMarker={true}
            partnerName={partner.name}
            partnerEta="At Venue"
          />
        </div>

        {/* Task & Booking Details Card */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                Active Service
              </span>
              <h3 className="text-base font-black text-neutral-900 mt-1">
                {serviceName}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-neutral-900">
                Partner: {partner.name}
              </span>
              <div className="text-[10px] text-neutral-400">Rating: 4.8 ★</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600 pt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{bookingDraft.locationName}</span>
          </div>

          {bookingDraft.customTaskDescription && (
            <p className="text-xs text-neutral-600 italic bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              "{bookingDraft.customTaskDescription}"
            </p>
          )}
        </div>

        {/* Action Controls: CALL, MESSAGE, SOS */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setIsCallingOpen(true)}
            className="py-3 px-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-200 shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('callPartner')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="py-3 px-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-200 shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-neutral-700" />
            <span>{t('messagePartner')}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('sos')}
            className="py-3 px-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-red-200 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>{t('sosButton')}</span>
          </button>
        </div>

        {/* Complete Work Button */}
        <div className="pt-2">
          <button
            onClick={handleCompleteWork}
            className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>COMPLETE WORK (Screen 17)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
