import React, { useState, useEffect } from 'react';
import { usePartner } from '../context/PartnerContext';
import { Phone, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';

export const Screen02LoginOTP: React.FC = () => {
  const { navigate, t } = usePartner();
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('9876543210');
  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '0']);
  const [countdown, setCountdown] = useState(25);

  useEffect(() => {
    let timer: any = null;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-advance focus to next digit
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <button
            onClick={() => {
              if (step === 'otp') setStep('mobile');
              else navigate('partner-splash');
            }}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {step === 'mobile' ? 'Step 1 of 2' : 'Step 2 of 2'}
          </span>
        </div>

        {step === 'mobile' ? (
          /* Mobile Input View */
          <div className="pt-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-neutral-950">
                {t('loginTitle')}
              </h2>
              <p className="text-xs text-neutral-600">
                {t('loginSubtitle')}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                Mobile Number / मोबाइल नंबर
              </label>
              <div className="flex items-center rounded-xl border-2 border-neutral-800 bg-neutral-50 px-3 py-3 focus-within:border-amber-500 focus-within:bg-white transition-all shadow-xs">
                <span className="font-bold text-base text-neutral-900 pr-2 border-r border-neutral-300 mr-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-600" />
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('mobilePlaceholder')}
                  className="w-full bg-transparent font-mono font-bold text-lg text-neutral-950 focus:outline-hidden tracking-wider"
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Authorized Partner Portal
              </p>
              <p className="text-neutral-600">
                For registered assistance partners only. Unregistered users will be routed to KYC.
              </p>
            </div>
          </div>
        ) : (
          /* OTP Verification View */
          <div className="pt-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-neutral-950">
                {t('otpTitle')}
              </h2>
              <p className="text-xs text-neutral-600">
                {t('otpSubtitle')} <span className="font-mono font-bold text-neutral-900">+91 {mobile}</span>
              </p>
            </div>

            {/* 6 Digit Inputs */}
            <div className="flex justify-between gap-2 pt-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center font-mono font-black text-2xl border-2 border-neutral-800 rounded-xl bg-neutral-50 focus:bg-amber-50 focus:border-amber-600 focus:outline-hidden shadow-xs"
                />
              ))}
            </div>

            {/* Demo Helper Pill */}
            <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 border border-neutral-200">
              {t('demoOtpNotice')}
            </div>

            {/* Resend Countdown */}
            <div className="text-center pt-2">
              {countdown > 0 ? (
                <span className="text-xs text-neutral-500">
                  {t('resendOtpIn')} <strong className="font-mono text-neutral-900">00:{countdown < 10 ? `0${countdown}` : countdown}</strong>
                </span>
              ) : (
                <button
                  onClick={() => setCountdown(30)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t('resendOtpBtn')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="pt-6 pb-2">
        {step === 'mobile' ? (
          <button
            onClick={() => setStep('otp')}
            disabled={mobile.length < 10}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 disabled:opacity-50 text-white font-bold rounded-2xl text-base shadow-lg transition-all active:scale-[0.98]"
          >
            {t('getOtpBtn')}
          </button>
        ) : (
          <button
            onClick={() => navigate('partner-permissions')}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-2xl text-base shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98]"
          >
            {t('verifyOtpBtn')}
          </button>
        )}
      </div>
    </div>
  );
};
