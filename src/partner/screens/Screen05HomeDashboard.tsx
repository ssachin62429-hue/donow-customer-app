import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { Power, Radio, ShieldCheck, Wallet, ChevronRight, BellRing, AlertTriangle } from 'lucide-react';

export const Screen05HomeDashboard: React.FC = () => {
  const {
    navigate,
    t,
    isOnline,
    setIsOnline,
    profile,
    commission,
  } = usePartner();

  return (
    <div className="flex-1 bg-neutral-900 text-white flex flex-col justify-between p-4 select-none overflow-y-auto">
      <div className="space-y-4">
        {/* Top Bar: Profile & Online Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div
            onClick={() => navigate('partner-profile')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-amber-400 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white">{profile.name}</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border border-emerald-500/30">
                  {profile.rating} ★
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {t('verifiedBadge')}
              </span>
            </div>
          </div>

          {/* High Contrast Online / Offline Toggle Button */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 border-2 transition-all shadow-md active:scale-95 ${
              isOnline
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-600/30'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400'
            }`}
          >
            <Power className={`w-4 h-4 ${isOnline ? 'animate-pulse text-white' : 'text-neutral-500'}`} />
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>

        {/* Commission Alert Warning if > ₹70 */}
        {commission.isLocked ? (
          <div
            onClick={() => navigate('partner-commission-locked')}
            className="bg-red-600/90 text-white p-3.5 rounded-2xl border border-red-500 flex items-center justify-between cursor-pointer hover:bg-red-600 transition-colors shadow-lg shadow-red-900/40"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
              <div>
                <p className="font-extrabold text-xs">COMMISSION LOCKED — ORDERS PAUSED</p>
                <p className="text-[11px] text-red-100">₹{commission.pendingAmount} due. Tap to pay via UPI & unlock.</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>
        ) : commission.pendingAmount >= 70 ? (
          <div
            onClick={() => navigate('partner-commission-wallet')}
            className="bg-amber-500/20 text-amber-200 p-3 rounded-2xl border border-amber-500/40 flex items-center justify-between cursor-pointer hover:bg-amber-500/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-xs">Approaching Commission Limit</p>
                <p className="text-[11px] text-amber-300/80">Pending: ₹{commission.pendingAmount} (Threshold ₹100 or 3 orders)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </div>
        ) : null}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-neutral-800/90 p-3 rounded-2xl border border-neutral-700/60 text-center">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
              {t('todayEarnings')}
            </span>
            <span className="font-mono font-black text-lg text-emerald-400">
              ₹1,240
            </span>
          </div>

          <div
            onClick={() => navigate('partner-commission-wallet')}
            className="bg-neutral-800/90 p-3 rounded-2xl border border-neutral-700/60 text-center cursor-pointer hover:border-amber-500/60 transition-colors"
          >
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
              {t('pendingCommission')}
            </span>
            <span className={`font-mono font-black text-lg ${commission.pendingAmount >= 100 ? 'text-red-400' : 'text-amber-400'}`}>
              ₹{commission.pendingAmount}
            </span>
          </div>

          <div
            onClick={() => navigate('partner-performance')}
            className="bg-neutral-800/90 p-3 rounded-2xl border border-neutral-700/60 text-center cursor-pointer hover:border-blue-500/60 transition-colors"
          >
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
              {t('completedOrders')}
            </span>
            <span className="font-mono font-black text-lg text-blue-400">
              {profile.totalOrdersCompleted}
            </span>
          </div>
        </div>

        {/* Radar Searching Animation Center Card */}
        <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-6 text-center relative overflow-hidden shadow-inner">
          {/* Radar Circles */}
          <div className="w-36 h-36 mx-auto relative flex items-center justify-center my-3">
            {isOnline ? (
              <>
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" />
                <div className="absolute inset-4 rounded-full border border-emerald-500/40 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-400 z-10 shadow-lg shadow-emerald-500/30">
                  <Radio className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
              </>
            ) : (
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700 z-10">
                <Power className="w-7 h-7 text-neutral-500" />
              </div>
            )}
          </div>

          <h3 className="text-base font-extrabold text-white">
            {isOnline ? t('online') : t('offline')}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
            {isOnline ? t('searchingRadar') : t('switchToGoOnline')}
          </p>

          {/* Quick Simulation Trigger for Incoming Order (Screen 6) */}
          {isOnline && (
            <div className="mt-4 pt-3 border-t border-neutral-800/80">
              <button
                onClick={() => navigate('partner-incoming-order')}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:scale-[0.98] text-neutral-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all uppercase tracking-wider"
              >
                <BellRing className="w-4 h-4 animate-bounce" />
                <span>Simulate Incoming Order Request</span>
              </button>
            </div>
          )}
        </div>

        {/* Admin Assigned Services Section (Enforcing Rule 1: No Skill Selection) */}
        <div className="bg-neutral-800/60 p-4 rounded-2xl border border-neutral-700/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              {t('assignedServicesHeader')}
            </span>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              Admin Assigned
            </span>
          </div>

          <div className="space-y-1.5">
            {profile.assignedServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-neutral-900/90 px-3 py-2 rounded-xl flex items-center justify-between border border-neutral-800 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-neutral-200">{srv.nameEn}</span>
                </div>
                <span className="font-mono font-bold text-amber-400">
                  ₹{srv.ratePerMin}/min
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-3 border-t border-neutral-800 flex justify-between gap-2 text-xs">
        <button
          onClick={() => navigate('partner-commission-wallet')}
          className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-neutral-300 flex items-center justify-center gap-1.5"
        >
          <Wallet className="w-4 h-4 text-amber-400" />
          <span>Wallet</span>
        </button>

        <button
          onClick={() => navigate('partner-performance')}
          className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-neutral-300 flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Tier: 8/10</span>
        </button>

        <button
          onClick={() => navigate('partner-support')}
          className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-neutral-300 flex items-center justify-center gap-1.5"
        >
          <span>Support</span>
        </button>
      </div>
    </div>
  );
};
