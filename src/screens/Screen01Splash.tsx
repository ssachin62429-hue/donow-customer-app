import React, { useEffect } from 'react';
import { Sparkles, ArrowRight, Shield, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Screen01Splash: React.FC = () => {
  const { navigate, language, setLanguage, t } = useApp();

  // Auto-navigate after 2.5 seconds or let user tap
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('permissions');
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-gradient-to-b from-neutral-900 via-neutral-900 to-emerald-950 text-white select-none relative overflow-hidden">
      {/* Top Language Toggle */}
      <div className="flex justify-end pt-2 z-10">
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-xs border border-white/15 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'en' ? 'हिन्दी में देखें' : 'English'}</span>
        </button>
      </div>

      {/* Decorative ambient background rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
        {/* DoNow Logo Symbol */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-2xl shadow-emerald-500/30 flex items-center justify-center mb-6 transform hover:scale-105 transition-transform">
          <div className="w-full h-full bg-neutral-900/40 rounded-[14px] flex items-center justify-center backdrop-blur-xs">
            <span className="text-3xl font-black tracking-tighter text-white">
              Do<span className="text-emerald-400">Now</span>
            </span>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-black tracking-tight text-white mb-2">
          Do<span className="text-emerald-400">Now</span>
        </h1>

        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-sm mb-3">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t('tagline')}</span>
        </div>

        <p className="text-neutral-300 text-xs max-w-xs font-medium leading-relaxed px-4">
          {t('splashSubtitle')}
        </p>

        {/* Trust badge */}
        <div className="mt-8 flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Verified Human Assistance Marketplace</span>
        </div>
      </div>

      {/* Bottom Action / Skip prompt */}
      <div className="z-10 pb-4 flex flex-col items-center gap-3">
        <button
          onClick={() => navigate('permissions')}
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>{language === 'hi' ? 'शुरू करें' : 'GET STARTED'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-neutral-400">
          {language === 'hi' ? 'सुरक्षित • पारदर्शी • भारतीय सेवा' : 'Safe • Transparent • Made for India'}
        </p>
      </div>
    </div>
  );
};
