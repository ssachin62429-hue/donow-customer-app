import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen13Tip: React.FC = () => {
  const { bookingDraft, addTipAndSearch, navigate, t, language } = useApp();
  const [selectedTip, setSelectedTip] = useState<number>(bookingDraft.tipAmount || 40);

  const tipOptions = [
    { label: '₹10', value: 10 },
    { label: '₹20', value: 20 },
    { label: '₹40', value: 40, popular: true },
    { label: '₹100', value: 100 },
    { label: t('noTip'), value: 0 },
  ];

  const handleUpdate = () => {
    addTipAndSearch(selectedTip);
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={language === 'hi' ? 'टिप जोड़ें' : 'Add Partner Tip'} showBack={true} />

      <div className="flex-1 p-5 pb-6 overflow-y-auto max-w-lg mx-auto w-full flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          {/* Header Notice */}
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-neutral-900">
              {t('noPartnerAcceptedYet')}
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto leading-relaxed">
              {t('addTipPrompt')}
            </p>
          </div>

          {/* Tip Options Grid */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              {language === 'hi' ? 'टिप राशि चुनें' : 'Select Tip Amount'}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {tipOptions.slice(0, 4).map((opt) => {
                const isSelected = selectedTip === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedTip(opt.value)}
                    className={`py-3 px-2 rounded-xl text-center transition-all relative border ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-[1.02]'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                    }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-[9px] font-bold bg-amber-400 text-neutral-900 px-1.5 py-0.2 rounded-full shadow-2xs whitespace-nowrap">
                        Popular
                      </span>
                    )}
                    <span className="text-base font-black font-mono block">
                      {opt.label}
                    </span>
                  </button>
                );
              })}

              {/* No Tip Button */}
              <button
                type="button"
                onClick={() => setSelectedTip(0)}
                className={`col-span-2 py-3 px-3 rounded-xl text-center text-xs font-bold border transition-all ${
                  selectedTip === 0
                    ? 'bg-neutral-800 text-white border-neutral-800 shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200'
                }`}
              >
                {t('noTip')}
              </button>
            </div>
          </div>

          {/* Business Rules on Tipping */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Heart className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{language === 'hi' ? '100% टिप पार्टनर को जाती है' : '100% Tip to Partner'}</span>
            </div>
            <p className="text-[11px] text-emerald-900 leading-relaxed">
              {t('tipNote')}
            </p>
          </div>

          {/* Current Order Total Preview */}
          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-neutral-500">Service Fare:</span>
              <span className="font-mono font-bold text-neutral-800 ml-1">
                ₹{bookingDraft.expectedDurationMins * (bookingDraft.ratePerMin || 2)}
              </span>
              {selectedTip > 0 && (
                <span className="text-emerald-700 font-bold ml-2">
                  + ₹{selectedTip} Tip
                </span>
              )}
            </div>
            <div className="font-mono font-black text-sm text-neutral-900">
              Total: ₹{(bookingDraft.expectedDurationMins * (bookingDraft.ratePerMin || 2)) + selectedTip}
            </div>
          </div>
        </div>

        {/* Update Order Button */}
        <div className="pt-4 pb-2">
          <button
            onClick={handleUpdate}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('updateOrderBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
