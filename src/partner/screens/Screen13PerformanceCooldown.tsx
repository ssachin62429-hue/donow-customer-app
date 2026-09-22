import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { ShieldCheck, AlertTriangle, ArrowLeft, TrendingUp } from 'lucide-react';

export const Screen13PerformanceCooldown: React.FC = () => {
  const {
    navigate,
    performance,
    toggleCooldownDemo,
    t,
  } = usePartner();

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div className="space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-home')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Tier & Reliability
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-neutral-950">
            {t('performanceTitle')}
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            Real-time rating and marketplace discipline monitoring
          </p>
        </div>

        {/* 12-HOUR COOLDOWN WARNING ALERT IF ACTIVE */}
        {performance.isCooldownActive ? (
          <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg border border-red-500 space-y-2">
            <div className="flex items-center gap-2 font-black text-sm uppercase">
              <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
              <span>12-Hour Cancellation Cooldown Active</span>
            </div>
            <p className="text-xs text-red-100 leading-relaxed">
              {t('cooldownActiveAlert')}
            </p>
          </div>
        ) : null}

        {/* 10 Orders Completion Gauge Card */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 shadow-xl border-2 border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">
              {t('lastTenTitle')}
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
              {t('bestTierBadge')}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-black text-5xl text-emerald-400">
                {performance.lastTenCompleted}/10
              </span>
              <span className="text-xs text-neutral-400">
                Tasks Fulfilled
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-lg text-white">80%</span>
              <span className="block text-[10px] text-neutral-400">Score</span>
            </div>
          </div>

          {/* 10 Dot Completion Visual Grid */}
          <div className="grid grid-cols-10 gap-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isCompleted = num <= performance.lastTenCompleted;
              return (
                <div
                  key={num}
                  className={`h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                    isCompleted
                      ? 'bg-emerald-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {isCompleted ? '✓' : '×'}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Partners in Green Tier receive 30% higher dispatch priority.</span>
          </div>
        </div>

        {/* Cooldown Policy Rules Card */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 font-black text-neutral-900">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>{t('cooldownWarningTitle')}</span>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            {t('cooldownRuleDesc')}
          </p>
          <div className="bg-white p-3 rounded-xl border border-neutral-200 flex justify-between items-center text-[11px]">
            <span className="text-neutral-500 font-bold">Cancellations in Last 24 Hours:</span>
            <span className="font-mono font-black text-neutral-900">
              {performance.cancellationsIn24h} / 3
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Switch for Reviewers */}
      <div className="pt-4 pb-2">
        <button
          onClick={toggleCooldownDemo}
          className={`w-full py-3.5 rounded-2xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 ${
            performance.isCooldownActive
              ? 'bg-neutral-900 border-neutral-900 text-white'
              : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>
            {performance.isCooldownActive
              ? 'Deactivate 12-Hour Cooldown (Restore Normal)'
              : t('simulateCooldownBtn')}
          </span>
        </button>
      </div>
    </div>
  );
};
