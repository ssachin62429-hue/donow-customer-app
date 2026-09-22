import React, { useState } from 'react';
import {
  Clock,
  Phone,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Play,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { InteractiveMapMock } from '../components/InteractiveMapMock';
import { DEMO_PARTNER } from '../data/mockRepository';

export const Screen15PartnerArrived: React.FC = () => {
  const {
    activeOrder,
    handleStartWork,
    setIsCallingOpen,
    setIsChatOpen,
    partnerArrivedEarly,
    setPartnerArrivedEarly,
    navigate,
    t,
    language,
  } = useApp();

  const partner = activeOrder?.partner || DEMO_PARTNER;

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('partnerArrivedTitle')} showBack={false} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Arrival Announcement Banner */}
        <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <div className="text-base font-black flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>{t('partnerArrivedTitle')}</span>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              <span className="font-bold">{partner.name}</span> {t('partnerArrivedSub')}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 px-2.5 py-1 rounded-full font-bold">
              {t('arrivalDistanceNotice')}
            </span>
          </div>
        </div>

        {/* Map with 50-metre Verified Arrival Ring */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xs relative">
          <InteractiveMapMock
            heightClass="h-44"
            showPartnerMarker={true}
            showArrivalRadius={true}
            partnerName={partner.name}
            partnerEta="Arrived at Gate"
          />
        </div>

        {/* CRITICAL BUSINESS RULE: TIMER & SCHEDULED START TIME */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                {t('scheduledTimeLabel')}
              </span>
              <span className="text-sm font-black text-neutral-900">
                10:00 AM – 12:00 PM
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Arrival Recorded
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                09:55 AM (Early)
              </span>
            </div>
          </div>

          {/* Early vs Late Arrival Simulation Toggle */}
          <div className="bg-neutral-100 p-2.5 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-700">
              {language === 'hi' ? 'आगमन स्थिति परीक्षण:' : 'Test Arrival Case:'}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setPartnerArrivedEarly(true)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  partnerArrivedEarly
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                9:45 AM (Early)
              </button>
              <button
                type="button"
                onClick={() => setPartnerArrivedEarly(false)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  !partnerArrivedEarly
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                10:15 AM (Late)
              </button>
            </div>
          </div>

          {/* Rule explanation card */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-900 leading-snug">
              <span className="font-bold">Important Timer Rule: </span>
              {partnerArrivedEarly ? (
                <span>
                  Partner arrived at 9:55 AM. <strong>Timer does NOT start before 10:00 AM scheduled time.</strong> Customer is not billed for early waiting.
                </span>
              ) : (
                <span>
                  Partner arrived at 10:15 AM. <strong>Timer begins at 10:15 AM and customer receives full 120 minutes booked duration</strong> without reduction.
                </span>
              )}
            </div>
          </div>

          {/* Ready Timer Indicator */}
          <div className="p-3.5 bg-neutral-900 text-white rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">Service Timer Standby</span>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-300">
              {partnerArrivedEarly ? 'Starts at 10:00 AM' : 'Ready to Start'}
            </span>
          </div>
        </div>

        {/* Contact Buttons & SOS */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setIsCallingOpen(true)}
            className="py-2.5 px-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-200 shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('callPartner')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="py-2.5 px-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-200 shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-neutral-700" />
            <span>{t('messagePartner')}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('sos')}
            className="py-2.5 px-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-red-200 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>SOS</span>
          </button>
        </div>

        {/* Start Work Action */}
        <div className="pt-2">
          <button
            onClick={handleStartWork}
            className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START WORK TIMER (Screen 16)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
