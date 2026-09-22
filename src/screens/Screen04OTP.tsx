import React, { useState, useEffect } from 'react';
import { ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen04OTP: React.FC = () => {
  const { profile, setProfile, navigate, t, language } = useApp();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [countdown, setCountdown] = useState(28);
  const [canResend, setCanResend] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    setProfile((prev) => ({ ...prev, isVerified: true }));
    navigate('create-profile');
  };

  const handleResend = () => {
    setCountdown(30);
    setCanResend(false);
    setResendMessage(language === 'hi' ? 'नया OTP भेजा गया: 123456' : 'New demo OTP sent: 123456');
    setTimeout(() => setResendMessage(''), 3000);
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar showBack={true} />

      <div className="flex-1 p-6 flex flex-col justify-between max-w-lg mx-auto w-full">
        <div>
          {/* Headline */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              {t('otpTitle')}
            </h2>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              {t('otpSub')}{' '}
              <span className="font-bold text-neutral-900 font-mono">
                {profile.mobile || '9876543210'}
              </span>
            </p>
          </div>

          {/* 6-Digit OTP Inputs */}
          <div className="my-6">
            <div className="flex justify-between gap-2 sm:gap-3 max-w-xs mx-auto">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-xl bg-white border border-neutral-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 shadow-xs outline-none transition-all"
                />
              ))}
            </div>

            {/* Hint tag */}
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                <span>{t('otpHint')}</span>
              </span>
            </div>

            {resendMessage && (
              <p className="text-xs text-emerald-700 font-medium text-center mt-2 animate-in fade-in">
                {resendMessage}
              </p>
            )}
          </div>

          {/* Resend Action */}
          <div className="text-center mt-6">
            {canResend ? (
              <button
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{t('resendOtp')}</span>
              </button>
            ) : (
              <p className="text-xs text-neutral-500">
                {t('resendIn')}{' '}
                <span className="font-mono font-bold text-neutral-800">
                  00:{countdown < 10 ? `0${countdown}` : countdown}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Verify Action */}
        <div className="pt-6 pb-2">
          <button
            onClick={handleVerify}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('verify')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
