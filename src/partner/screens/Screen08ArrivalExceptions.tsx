import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { AlertCircle, KeyRound, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export const Screen08ArrivalExceptions: React.FC = () => {
  const {
    navigate,
    distanceMetres,
    setDistanceMetres,
    validateArrivalCode,
    arrivalCode,
    t,
  } = usePartner();

  const [codeDigits, setCodeDigits] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newDigits = [...codeDigits];
    newDigits[index] = val;
    setCodeDigits(newDigits);
    setErrorMsg('');

    if (val && index < 3) {
      const nextInput = document.getElementById(`arrival-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyCode = () => {
    const fullCode = codeDigits.join('');
    if (validateArrivalCode(fullCode)) {
      // Navigates to work timer
    } else {
      setErrorMsg(t('invalidCodeMsg'));
    }
  };

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-navigation')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
            Strict Geofence Rule
          </span>
        </div>

        {!showCodeInput ? (
          /* Error State Card when >50m */
          <div className="pt-6 space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-3xl mx-auto flex items-center justify-center border-2 border-red-200">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-neutral-950">
                {t('tooFarTitle')}
              </h2>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
                {t('tooFarMessage')}
              </p>
            </div>

            {/* GPS Diagnostic Box */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-bold">Your Current GPS Distance</span>
                <span className="font-mono font-black text-red-600 text-sm">
                  {distanceMetres} metres
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-bold">Required Arrival Radius</span>
                <span className="font-mono font-black text-emerald-700 text-sm">
                  ≤ 50 metres
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Fallback Explanation */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <KeyRound className="w-4 h-4 text-amber-700" />
                <span>Signal blocked or inside a complex?</span>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                {t('arrivalCodeModalSub')}
              </p>
            </div>
          </div>
        ) : (
          /* 4-Digit Arrival Code Input Screen */
          <div className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl mx-auto flex items-center justify-center border-2 border-amber-200">
                <KeyRound className="w-8 h-8 text-amber-700" />
              </div>
              <h2 className="text-2xl font-black text-neutral-950">
                {t('arrivalCodeModalTitle')}
              </h2>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                {t('arrivalCodePrompt')}
              </p>
            </div>

            {/* 4 Digit Code Inputs */}
            <div className="flex justify-center gap-3 pt-2">
              {codeDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`arrival-digit-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className="w-14 h-16 text-center font-mono font-black text-3xl border-2 border-neutral-900 rounded-2xl bg-neutral-50 focus:bg-amber-50 focus:border-amber-600 focus:outline-hidden shadow-xs"
                />
              ))}
            </div>

            {errorMsg && (
              <p className="text-xs font-bold text-red-600 text-center">
                {errorMsg}
              </p>
            )}

            {/* Demo Helper Button */}
            <div className="text-center">
              <button
                onClick={() => setCodeDigits(['4', '8', '2', '9'])}
                className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
              >
                <span>Auto-Fill Customer Code: {arrivalCode} (Demo)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 pb-2 space-y-2.5">
        {!showCodeInput ? (
          <>
            <button
              onClick={() => setShowCodeInput(true)}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98]"
            >
              <KeyRound className="w-5 h-5" />
              <span>{t('enterArrivalCodeBtn')}</span>
            </button>

            {/* Toggle GPS to simulate walking within 50m */}
            <button
              onClick={() => {
                setDistanceMetres(30);
                navigate('partner-navigation');
              }}
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{t('simLocationToggle')}</span>
            </button>
          </>
        ) : (
          <button
            onClick={handleVerifyCode}
            disabled={codeDigits.some((d) => !d)}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 disabled:opacity-40 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-lg active:scale-[0.98]"
          >
            <span>{t('verifyCodeBtn')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
