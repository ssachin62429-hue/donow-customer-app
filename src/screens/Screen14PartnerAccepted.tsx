import React from 'react';
import {
  Star,
  Award,
  Navigation,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { InteractiveMapMock } from '../components/InteractiveMapMock';
import { DEMO_PARTNER } from '../data/mockRepository';

export const Screen14PartnerAccepted: React.FC = () => {
  const {
    activeOrder,
    handlePartnerArrive,
    setIsCallingOpen,
    setIsChatOpen,
    navigate,
    t,
    language,
  } = useApp();

  const partner = activeOrder?.partner || DEMO_PARTNER;

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('partnerFoundTitle')} showBack={false} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Status Header */}
        <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <div className="text-base font-black flex items-center gap-2">
              <span>{t('partnerFoundTitle')}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-emerald-100 mt-0.5 leading-snug">
              {t('partnerFoundSub')}
            </p>
          </div>
          <div className="text-right font-mono font-bold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            ETA {partner.etaMins} min
          </div>
        </div>

        {/* Live Location Map Placeholder */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xs relative">
          <InteractiveMapMock
            heightClass="h-48"
            showPartnerMarker={true}
            partnerName={partner.name}
            partnerEta={`${partner.etaMins}m away`}
          />
        </div>

        {/* Partner Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Photo Placeholder */}
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 border-2 border-emerald-500/50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs relative">
                <User className="w-8 h-8 text-neutral-400" />
                <span className="absolute bottom-0 inset-x-0 bg-emerald-700 text-white text-[8px] font-bold text-center py-0.2">
                  VERIFIED
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-neutral-900">
                    {partner.name}
                  </h3>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-600" />
                    <span>{partner.performanceBadge}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mt-1 text-xs text-neutral-600">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{partner.rating}</span>
                    <span className="text-neutral-400 font-normal">({partner.totalRatingsCount})</span>
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Navigation className="w-3 h-3 text-emerald-600" />
                    <span>{partner.distanceKm} km away</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Masked Call & Chat Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setIsCallingOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors active:scale-95"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{t('callPartner')}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-300 transition-colors active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-neutral-700" />
              <span>{t('messagePartner')}</span>
            </button>
          </div>

          {/* Privacy Notice on Masked Numbers */}
          {/* IMPORTANT: Personal phone number should NOT be displayed directly */}
          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2 text-[11px] text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('privacyMaskNotice')}</span>
          </div>
        </div>

        {/* Action: Next Step Simulation (Partner Arrived) */}
        <div className="pt-2">
          <button
            onClick={handlePartnerArrive}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>Simulate Partner Arrived (Screen 15)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
