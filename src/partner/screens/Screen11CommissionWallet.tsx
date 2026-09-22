import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { Wallet, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

export const Screen11CommissionWallet: React.FC = () => {
  const {
    navigate,
    commission,
    payCommissionUPI,
    toggleCommissionLockDemo,
    t,
  } = usePartner();

  const isNearLimit = commission.pendingAmount >= 70 || commission.completedOrdersCount >= 2;

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-home')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Platform Wallet
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-neutral-950">
            {t('commissionWalletTitle')}
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Cash order commission settlement ledger
          </p>
        </div>

        {/* Current Pending Amount Card */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 shadow-xl border-2 border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-amber-400" />
              {t('pendingCommissionAmount')}
            </span>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              Limit: ₹100
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-mono font-black text-5xl text-amber-400">
              ₹{commission.pendingAmount}
            </span>
            <span className="text-xs text-neutral-400">
              across <strong className="text-white font-mono">{commission.completedOrdersCount} orders</strong>
            </span>
          </div>

          {/* Limit Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-neutral-400">Commission Used</span>
              <span className={commission.pendingAmount >= 100 ? 'text-red-400' : 'text-amber-400'}>
                ₹{commission.pendingAmount} / ₹100
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  commission.pendingAmount >= 100 ? 'bg-red-500' : 'bg-amber-400'
                }`}
                style={{ width: `${Math.min(100, (commission.pendingAmount / 100) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* CRITICAL BUSINESS RULE 4: WARNING CARD */}
        <div className={`p-4 rounded-2xl border-2 space-y-2 text-xs ${
          isNearLimit
            ? 'bg-red-50 border-red-300 text-red-950'
            : 'bg-neutral-50 border-neutral-200 text-neutral-800'
        }`}>
          <div className="flex items-center gap-2 font-black text-red-700">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="text-sm">Threshold Lock Rule</span>
          </div>
          <p className="leading-relaxed text-neutral-700">
            {t('walletWarningRule')}
          </p>
          <p className="font-bold text-red-700">
            {t('thresholdNotice')}
          </p>
        </div>

        {/* Recent Orders Commission Breakdown */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs">
          <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider block">
            Unsettled Cash Orders
          </span>
          <div className="flex justify-between items-center py-1.5 border-b border-neutral-200">
            <div>
              <p className="font-bold text-neutral-900">Hospital Assistance (DN-8921)</p>
              <p className="text-[11px] text-neutral-500">Collected Cash: ₹340</p>
            </div>
            <span className="font-mono font-bold text-red-600">₹45.00</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <div>
              <p className="font-bold text-neutral-900">Event & Party Help (DN-9942)</p>
              <p className="text-[11px] text-neutral-500">Collected Cash: ₹490</p>
            </div>
            <span className="font-mono font-bold text-red-600">₹40.00</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 pb-2 space-y-2.5">
        <button
          onClick={() => {
            payCommissionUPI();
            alert('Mock UPI payment of ₹' + commission.pendingAmount + ' successful! Commission cleared to ₹0.');
            navigate('partner-home');
          }}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>{t('payCommissionBtn')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Simulator Button: Toggle to Screen 12 Commission Locked */}
        <button
          onClick={() => {
            toggleCommissionLockDemo();
            navigate('partner-commission-locked');
          }}
          className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl border border-neutral-300 transition-colors"
        >
          Simulate Threshold Reached (Locked State ₹115) →
        </button>
      </div>
    </div>
  );
};
