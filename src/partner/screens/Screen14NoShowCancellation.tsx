import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { UserX, Clock, Phone, AlertCircle, ArrowLeft, FastForward } from 'lucide-react';

export const Screen14NoShowCancellation: React.FC = () => {
  const {
    navigate,
    incomingOrder,
    noShowSecondsRemaining,
    isNoShowButtonEnabled,
    skipNoShowTimerDemo,
    markCustomerNoShow,
    t,
  } = usePartner();

  const mins = Math.floor(noShowSecondsRemaining / 60);
  const secs = noShowSecondsRemaining % 60;
  const timeFormatted = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-navigation')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Cancellation Protocol
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-neutral-950">
            {t('noShowTitle')}
          </h2>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            {t('noShowInstructions')}
          </p>
        </div>

        {/* 10-Minute Waiting Timer Card */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 text-center space-y-4 shadow-xl border-2 border-neutral-800">
          <div className="w-16 h-16 bg-amber-500/20 rounded-2xl mx-auto flex items-center justify-center border-2 border-amber-400">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">
              {t('timerWaitLabel')}
            </span>
            <div className="font-mono font-black text-5xl text-amber-400 mt-1 tracking-tight">
              {timeFormatted}
            </div>
            <span className="text-[11px] text-neutral-400 block mt-1">
              {isNoShowButtonEnabled
                ? 'Mandatory 10-minute waiting period complete ✓'
                : 'Please stay within 50m of meeting point'}
            </span>
          </div>

          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Customer {incomingOrder.customerFirstName}: Called 2 times</span>
          </div>
        </div>

        {/* Mandatory Policy Warning */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Fairness & Verification Policy</span>
          </div>
          <p className="text-neutral-700 leading-relaxed">
            {t('timerRunningHint')} DoNow verifies GPS timestamp and masked call logs before approving no-show fee compensation.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 pb-2 space-y-2.5">
        {/* Demo Fast-Forward Button */}
        {!isNoShowButtonEnabled && (
          <button
            onClick={skipNoShowTimerDemo}
            className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-neutral-300 transition-colors"
          >
            <FastForward className="w-4 h-4 text-amber-600" />
            <span>{t('skipTimerDemo')}</span>
          </button>
        )}

        {/* Submit No-Show Button (Active only after 10 mins) */}
        <button
          onClick={markCustomerNoShow}
          disabled={!isNoShowButtonEnabled}
          className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
            isNoShowButtonEnabled
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          <UserX className="w-5 h-5" />
          <span>
            {isNoShowButtonEnabled
              ? t('markNoShowBtn')
              : t('waitingPeriodActive')}
          </span>
        </button>
      </div>
    </div>
  );
};
