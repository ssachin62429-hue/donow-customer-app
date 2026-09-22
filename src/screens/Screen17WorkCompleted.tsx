import React, { useState } from 'react';
import { CheckCircle2, Banknote, QrCode, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen17WorkCompleted: React.FC = () => {
  const { activeOrder, handleConfirmPayment, t, language } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI'>('Cash');

  // Realistic prompt numbers: 150 mins, ₹300 base, ₹40 tip, ₹340 final
  const actualMinutes = activeOrder?.actualDurationMins || 150;
  const serviceAmount = activeOrder?.baseFare || 300;
  const customerTip = activeOrder?.tipAmount !== undefined ? activeOrder.tipAmount : 40;
  const finalAmount = serviceAmount + customerTip;

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('workCompletedTitle')} showBack={false} />

      <div className="flex-1 p-5 pb-6 overflow-y-auto max-w-lg mx-auto w-full flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          {/* Success Banner */}
          <div className="text-center py-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              {t('workCompletedTitle')}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {language === 'hi'
                ? 'कार्य सफलतापूर्वक संपन्न हुआ। वास्तविक समय के अनुसार बिल नीचे देखें:'
                : 'Task has been completed. Review your itemized time and fare bill below:'}
            </p>
          </div>

          {/* Bill Breakdown Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Service Summary
                </span>
                <h4 className="text-sm font-black text-neutral-900">
                  {activeOrder?.serviceName || 'Hospital Assistance'}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Rate: ₹{activeOrder?.ratePerMin || 2}/min
              </span>
            </div>

            <div className="p-4 space-y-3 text-xs">
              {/* Actual Service Time */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 font-medium">
                  {t('actualServiceTimeLabel')}:
                </span>
                <span className="font-mono font-bold text-neutral-900">
                  {actualMinutes} {t('mins')} ({actualMinutes / 60} {t('hrs')})
                </span>
              </div>

              {/* Service Amount */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 font-medium">
                  {t('serviceAmountLabel')}:
                </span>
                <span className="font-mono font-bold text-neutral-900">
                  ₹{serviceAmount}
                </span>
              </div>

              {/* Customer Tip */}
              <div className="flex items-center justify-between text-emerald-800">
                <span className="font-medium flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  <span>{t('customerTipLabel')}:</span>
                </span>
                <span className="font-mono font-bold">
                  ₹{customerTip}
                </span>
              </div>

              {/* Final Amount */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-black text-neutral-900 uppercase tracking-wider block">
                    {t('finalAmountLabel')}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Inclusive of all taxes & tip
                  </span>
                </div>
                <span className="text-2xl font-black text-emerald-800 font-mono">
                  ₹{finalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              {t('paymentMethodLabel')}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  paymentMethod === 'Cash'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-neutral-200 text-emerald-700">
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs">{t('cashPayment')}</div>
                  <div className="text-[10px] text-neutral-400">Direct to partner</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-neutral-200 text-emerald-700">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs">{t('upiPayment')}</div>
                  <div className="text-[10px] text-neutral-400">GPay / PhonePe / Paytm</div>
                </div>
              </button>
            </div>

            <p className="text-[11px] text-neutral-400 pt-1 text-center">
              Please pay ₹{finalAmount} directly to the partner.
            </p>
          </div>
        </div>

        {/* Payment Confirmed Action */}
        <div className="pt-4 pb-2">
          <button
            onClick={handleConfirmPayment}
            className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('paymentConfirmedBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
