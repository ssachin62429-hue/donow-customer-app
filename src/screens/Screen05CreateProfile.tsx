import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen05CreateProfile: React.FC = () => {
  const { profile, setProfile, navigate, t, language } = useApp();
  const [nameInput, setNameInput] = useState(profile.name || 'Amit Verma');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState('');

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setError(language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name');
      return;
    }
    if (!termsAccepted) {
      setError(language === 'hi' ? 'कृपया नियम और शर्तों को स्वीकार करें' : 'Please accept terms of service to continue');
      return;
    }
    setError('');
    setProfile((prev) => ({
      ...prev,
      name: nameInput.trim(),
      termsAccepted: true,
    }));
    navigate('home');
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('profileTitle')} showBack={true} />

      <div className="flex-1 p-6 flex flex-col justify-between max-w-lg mx-auto w-full">
        <div>
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              {t('profileTitle')}
            </h2>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              {t('profileSub')}
            </p>
          </div>

          <form onSubmit={handleCreateAccount} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                {t('nameLabel')}
              </label>
              <div className="relative rounded-2xl bg-white border border-neutral-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 shadow-xs transition-all overflow-hidden">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setError('');
                  }}
                  placeholder={t('namePlaceholder')}
                  className="w-full pl-10 pr-4 py-3.5 text-sm font-semibold text-neutral-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Mobile Number (Verified) */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                {t('mobileNumberLabel')}
              </label>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold">
                    +91 {profile.mobile || '9876543210'}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t('verifiedBadge')}</span>
                </span>
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    setError('');
                  }}
                  className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300 shrink-0"
                />
                <span className="text-xs text-neutral-700 leading-snug group-hover:text-neutral-900">
                  {t('termsCheckbox')}
                </span>
              </label>
            </div>

            {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}

            {/* Privacy Architecture Notice */}
            <div className="mt-4 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-900 leading-tight">
                {t('termsAcceptedNote')}
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Action */}
        <div className="pt-6 pb-2">
          <button
            onClick={handleCreateAccount}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('createAccountBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
