import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const Screen01Splash: React.FC = () => {
  const { navigate, t } = usePartner();

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between p-6 select-none relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="pt-6 flex items-center justify-between z-10">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold tracking-wider border border-amber-500/30 uppercase">
          {t('splashSubtitle')}
        </span>
        <span className="text-xs text-neutral-400 font-mono">v2.4.0 (IND)</span>
      </div>

      {/* Center Branding */}
      <div className="my-auto text-center space-y-6 z-10">
        <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-amber-500/20 border-2 border-amber-300/40">
          <div className="text-neutral-950 font-black text-4xl tracking-tighter">
            DN
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            {t('partnerAppTitle')}
          </h1>
          <p className="text-amber-400 font-semibold text-base">
            {t('tagline')}
          </p>
          <p className="text-neutral-400 text-xs max-w-xs mx-auto">
            {t('subTagline')}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Strict KYC & Admin Service Assignment</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-3 z-10 pb-4">
        <button
          onClick={() => navigate('partner-login-otp')}
          className="w-full py-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-neutral-950 font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-lg shadow-amber-500/25"
        >
          <span>Get Started / लॉगिन करें</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('partner-home')}
          className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-xl border border-neutral-800 transition-colors"
        >
          Skip to Approved Dashboard (Demo Mode)
        </button>
      </div>
    </div>
  );
};
