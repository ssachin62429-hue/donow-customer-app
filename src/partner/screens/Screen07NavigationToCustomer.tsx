import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { Phone, MessageSquare, Shield, ChevronRight, Navigation, LocateFixed } from 'lucide-react';

export const Screen07NavigationToCustomer: React.FC = () => {
  const {
    incomingOrder,
    markArrived,
    distanceMetres,
    setDistanceMetres,
    t,
  } = usePartner();

  const [slideVal, setSlideVal] = useState(0);

  const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSlideVal(val);
    if (val >= 90) {
      markArrived();
      setSlideVal(0);
    }
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
              onClick={() => alert('Simulating secure masked call via DoNow virtual bridge. Customer phone number remains protected.')}
              className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{t('callMaskedBtn')}</span>
            </button>

            <button
              onClick={() => alert('In-app chat opened with customer Amit.')}
              className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl border border-neutral-700 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
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
    </div>
  );
};
