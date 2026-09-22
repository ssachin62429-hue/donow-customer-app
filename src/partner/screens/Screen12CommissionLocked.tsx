import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { Lock, AlertOctagon, CheckCircle2, QrCode } from 'lucide-react';

export const Screen12CommissionLocked: React.FC = () => {
  const {
    navigate,
    commission,
    payCommissionUPI,
    t,
  } = usePartner();

  const [isProcessingUPI, setIsProcessingUPI] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const handlePayUPI = () => {
    setIsProcessingUPI(true);
    setTimeout(() => {
      setIsProcessingUPI(false);
      setIsPaidSuccess(true);
      payCommissionUPI();
    }, 1500);
  };

  return (
    <div className="flex-1 bg-red-950 text-white flex flex-col justify-between p-5 select-none overflow-y-auto">
      {!isPaidSuccess ? (
        <div className="space-y-5 pt-2">
          {/* Red Alert Banner: New Orders Paused */}
          <div className="bg-red-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between border border-red-400">
            <div className="flex items-center gap-2.5">
              <AlertOctagon className="w-6 h-6 shrink-0 animate-bounce" />
              <div>
                <span className="font-black text-xs tracking-wider block">
                  {t('accountLockedBanner')}
                </span>
                <span className="text-[11px] text-red-100 font-medium">
                  Dispatch Matching Suspended
                </span>
              </div>
            </div>
            <Lock className="w-5 h-5 text-red-200" />
          </div>

          {/* Locked Status Details */}
          <div className="bg-neutral-900 border-2 border-red-500/80 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-20 h-20 bg-red-500/20 rounded-3xl mx-auto flex items-center justify-center border-2 border-red-400">
              <Lock className="w-10 h-10 text-red-400" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-red-400 tracking-wider">
                Threshold Exceeded
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                {t('accountLockedTitle')}
              </h2>
            </div>

            <div className="bg-neutral-950 p-4 rounded-2xl border border-red-900/60 space-y-1">
              <span className="text-xs text-neutral-400">Total Outstanding Commission</span>
              <div className="font-mono font-black text-4xl text-amber-400">
                ₹{commission.pendingAmount || 115}
              </div>
              <span className="text-[11px] text-red-300 font-semibold block">
                (Exceeded ₹100 limit across {commission.completedOrdersCount || 3} orders)
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed text-left bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
              {t('lockedReason')}
            </p>
          </div>

          {/* Quick Mock UPI QR Container */}
          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl text-neutral-950">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Instant UPI Settlement</p>
                <p className="text-[11px] text-neutral-400">GPay, PhonePe, Paytm, BHIM</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/30">
              Zero Surcharge
            </span>
          </div>
        </div>
      ) : (
        /* UPI Payment Success & Unlocked State */
        <div className="my-auto text-center space-y-6 py-10">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl mx-auto flex items-center justify-center border-2 border-emerald-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">
              Commission Settled ✓
            </h3>
            <p className="text-xs text-emerald-300 max-w-xs mx-auto leading-relaxed">
              {t('upiSuccessNotice')}
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-xs font-mono text-neutral-300 max-w-xs mx-auto">
            Transaction ID: UPI-DN-{Math.floor(10000000 + Math.random() * 90000000)}
          </div>
        </div>
      )}

      {/* Bottom Action */}
      <div className="pt-4 pb-2">
        {!isPaidSuccess ? (
          <button
            onClick={handlePayUPI}
            disabled={isProcessingUPI}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-2xl text-base shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {isProcessingUPI ? (
              <span className="animate-pulse">Connecting UPI App...</span>
            ) : (
              <span>{t('payToUnlockBtn')}</span>
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate('partner-home')}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-base shadow-xl shadow-emerald-600/30 transition-all active:scale-[0.98]"
          >
            RETURN TO ONLINE DASHBOARD
          </button>
        )}
      </div>
    </div>
  );
};
