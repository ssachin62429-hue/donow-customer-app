import React, { useState } from 'react';
import { ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen03MobileLogin: React.FC = () => {
  const { profile, setProfile, navigate, t, language } = useApp();
  const [mobileInput, setMobileInput] = useState(profile.mobile || '9876543210');
  const [error, setError] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = mobileInput.replace(/\D/g, '');
    if (cleanNum.length !== 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setProfile((prev) => ({ ...prev, mobile: cleanNum }));
    navigate('otp');
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar showBack={true} />

      <div className="flex-1 p-6 flex flex-col justify-between max-w-lg mx-auto w-full">
        <div>
          {/* Logo & Headline */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
              DN
            </div>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              {t('welcomeTitle')}
            </h2>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              {t('welcomeSub')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                {t('mobileNumberLabel')}
              </label>

              <div className="flex items-center rounded-2xl bg-white border border-neutral-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 shadow-xs transition-all overflow-hidden">
                <div className="px-3.5 py-3.5 bg-neutral-100 border-r border-neutral-200 flex items-center gap-1.5 text-xs font-bold text-neutral-700 select-none">
                  <span className="text-base">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileInput}
                  onChange={(e) => {
                    setMobileInput(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder={t('mobilePlaceholder')}
                  className="flex-1 px-4 py-3.5 text-sm font-semibold text-neutral-900 focus:outline-none tracking-wide"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium mt-1.5">{error}</p>}
            </div>

            {/* Indian Trust Tag */}
            <div className="p-3 bg-white rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-[11px] text-neutral-500 leading-tight">
                {language === 'hi'
                  ? 'आपका नंबर सुरक्षित और एन्क्रिप्टेड है। स्पैम कॉल नहीं की जाएगी।'
                  : 'Your number is encrypted and never shared with third parties or spammers.'}
              </p>
            </div>
          </form>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 pb-2 space-y-3">
          <button
            onClick={handleContinue}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('continue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-neutral-400">
            {t('loginDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};
