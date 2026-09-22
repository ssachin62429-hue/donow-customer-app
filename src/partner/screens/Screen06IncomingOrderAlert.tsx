import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { MapPin, Clock, ShieldCheck, HeartHandshake, PhoneCall, ChevronRight } from 'lucide-react';

export const Screen06IncomingOrderAlert: React.FC = () => {
  const { incomingOrder, acceptIncomingOrder, rejectIncomingOrder, t } = usePartner();
  const [sliderPos, setSliderPos] = useState(0);

  const handleSliderDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPos(val);
    if (val >= 90) {
      acceptIncomingOrder();
    }
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between p-5 select-none relative overflow-hidden">
      {/* Pulsing ring visual background simulation for incoming call alert */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Top Header: Urgent Full-Screen Incoming Alert Badge */}
      <div className="pt-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-black tracking-wider animate-pulse uppercase border border-red-400 shadow-md">
          <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
          <span>{t('incomingOrderAlert')}</span>
        </div>
        <div className="bg-neutral-800/80 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-neutral-300">
          Order #DN-9942
        </div>
      </div>

      {/* Main Order Card */}
      <div className="my-auto space-y-4 z-10 py-2">
        {/* Service & Time */}
        <div className="bg-neutral-900 border-2 border-neutral-800 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block">
                {t('serviceType')}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                {incomingOrder.serviceEn}
              </h2>
            </div>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-mono font-bold px-2.5 py-1 rounded-xl border border-amber-500/30">
              {incomingOrder.expectedDurationMins} Mins
            </span>
          </div>

          {/* Location & Scheduled Slot */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-neutral-200 block text-sm">
                  {incomingOrder.locationName}
                </span>
                <span className="text-neutral-400 text-[11px]">
                  {incomingOrder.distanceKm} km away • ETA {incomingOrder.etaMins} mins
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-neutral-300">
                {incomingOrder.scheduledTimeRange} (Today)
              </span>
            </div>
          </div>

          {/* CRITICAL BUSINESS RULE 2: Earning Transparency
              Show ONLY the Partner's Earning + Customer Tip.
              Do NOT show the customer's total charge or platform commission here. */}
          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 rounded-2xl p-4 border-2 border-emerald-500/50 shadow-inner space-y-2.5">
            <div className="flex items-center justify-between text-neutral-300 text-xs">
              <span>{t('yourEarningLabel')}</span>
              <span className="font-mono font-bold text-white text-base">
                ₹{incomingOrder.partnerBaseEarning}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs bg-amber-500/15 text-amber-300 p-2.5 rounded-xl border border-amber-500/30">
              <div className="flex items-center gap-1.5 font-bold">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>{t('customerTipLabel')}</span>
              </div>
              <span className="font-mono font-black text-base text-amber-300">
                +₹{incomingOrder.customerTip}
              </span>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-neutral-400 tracking-wider">
                {t('totalEarningLabel')}
              </span>
              <div className="text-right">
                <span className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
                  ₹{incomingOrder.totalPartnerEarning}
                </span>
                <span className="block text-[10px] text-neutral-500">
                  Guaranteed Take-Home
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{t('earningTransparencyNotice')}</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Swipe Right to ACCEPT, Tap to REJECT */}
      <div className="space-y-3 z-10 pb-2">
        {/* Swipe Right to Accept Slider */}
        <div className="relative bg-emerald-950/80 border-2 border-emerald-500 rounded-2xl h-16 flex items-center px-2 overflow-hidden shadow-lg shadow-emerald-900/40">
          <div
            className="absolute inset-y-0 left-0 bg-emerald-600 transition-all pointer-events-none rounded-xl"
            style={{ width: `${Math.max(sliderPos, 15)}%` }}
          />

          <span className="w-full text-center font-black text-xs uppercase tracking-wider text-emerald-300 z-10 flex items-center justify-center gap-1 pointer-events-none">
            <span>{t('swipeToAccept')}</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={handleSliderDrag}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
          />

          <div
            className="w-12 h-12 bg-white text-emerald-900 rounded-xl flex items-center justify-center font-black shadow-md z-30 transition-transform pointer-events-none"
            style={{ transform: `translateX(${(sliderPos / 100) * 260}px)` }}
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </div>
        </div>

        {/* Quick Click Fallback for desktop mouse test */}
        <div className="flex gap-2">
          <button
            onClick={rejectIncomingOrder}
            className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-bold rounded-xl text-xs border border-neutral-800 transition-colors uppercase"
          >
            {t('tapToReject')}
          </button>

          <button
            onClick={acceptIncomingOrder}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition-colors uppercase flex items-center justify-center gap-1"
          >
            <span>Click Accept (Demo)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
