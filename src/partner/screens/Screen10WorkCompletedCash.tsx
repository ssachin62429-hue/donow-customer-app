import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { CheckCircle, Banknote, ChevronRight, Info } from 'lucide-react';

export const Screen10WorkCompletedCash: React.FC = () => {
  const {
    actualDurationMins,
    baseFareEarning,
    tipAmount,
    totalCashToCollect,
    confirmCashCollected,
    t,
  } = usePartner();

  const [slideVal, setSlideVal] = useState(0);

  const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSlideVal(val);
    if (val >= 90) {
      confirmCashCollected();
    }
  };

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div className="space-y-4 pt-1">
        {/* Success Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center border-2 border-emerald-300">
            <CheckCircle className="w-9 h-9 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-neutral-950">
            {t('taskCompletedTitle')}
          </h2>
          <span className="inline-block bg-neutral-100 text-neutral-700 text-xs font-mono font-bold px-3 py-1 rounded-full border border-neutral-200">
            Total Duration: {actualDurationMins} Minutes (2.5 hrs)
          </span>
        </div>

        {/* Fare Calculation Itemized Breakdown */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2.5 text-xs">
          <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider block">
            Bill & Fare Calculation
          </span>

          <div className="flex justify-between items-center">
            <span className="text-neutral-600">Base Service Rate (150m @ ₹3/min)</span>
            <span className="font-mono font-bold text-neutral-900 text-sm">₹{baseFareEarning}</span>
          </div>

          <div className="flex justify-between items-center text-emerald-700 font-semibold bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-200">
            <span>Customer Generosity Tip (100% Yours)</span>
            <span className="font-mono font-bold text-sm">+₹{tipAmount}</span>
          </div>

          <div className="pt-2 border-t border-neutral-200 flex justify-between items-center text-neutral-500 text-[11px]">
            <span>DoNow Commission (Deducted via Wallet later)</span>
            <span className="font-mono">15% included in settlement</span>
          </div>
        </div>

        {/* MASSIVE CASH COLLECTION DISPLAY CARD */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 text-center space-y-3 shadow-2xl border-4 border-amber-400">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-neutral-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Banknote className="w-4 h-4" />
            <span>{t('collectCashHeader')}</span>
          </div>

          <div className="font-mono font-black text-6xl text-amber-400 tracking-tight">
            ₹{totalCashToCollect}
          </div>

          <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
            {t('cashCollectNotice')}
          </p>

          <div className="bg-neutral-900 rounded-xl p-2.5 text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 border border-neutral-800">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Do not leave without collecting full cash amount.</span>
          </div>
        </div>
      </div>

      {/* Action Slider: Cash Collected Confirmation */}
      <div className="pt-4 pb-2 space-y-2">
        <div className="relative bg-emerald-950 border-2 border-emerald-500 rounded-2xl h-16 flex items-center px-2 overflow-hidden shadow-lg">
          <div
            className="absolute inset-y-0 left-0 bg-emerald-600 transition-all pointer-events-none rounded-xl"
            style={{ width: `${Math.max(slideVal, 15)}%` }}
          />

          <span className="w-full text-center font-black text-xs uppercase tracking-wider text-emerald-200 z-10 flex items-center justify-center gap-1 pointer-events-none">
            <span>{t('slideCashCollected')}</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={slideVal}
            onChange={handleSlide}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
          />

          <div
            className="w-12 h-12 bg-white text-emerald-950 rounded-xl flex items-center justify-center font-black shadow-md z-30 transition-transform pointer-events-none"
            style={{ transform: `translateX(${(slideVal / 100) * 260}px)` }}
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </div>
        </div>

        <button
          onClick={confirmCashCollected}
          className="w-full py-2 text-center text-xs font-bold text-neutral-500 hover:text-neutral-900"
        >
          Click here if touch slider is difficult (Demo)
        </button>
      </div>
    </div>
  );
};
