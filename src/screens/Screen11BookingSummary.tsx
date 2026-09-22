import React from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Timer,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen11BookingSummary: React.FC = () => {
  const { bookingDraft, handleBookingSubmit, t, language } = useApp();

  const durationHours = (bookingDraft.expectedDurationMins / 60).toFixed(1).replace('.0', '');
  const rate = bookingDraft.ratePerMin || 2;
  const baseFare = bookingDraft.expectedDurationMins * rate;
  const tip = bookingDraft.tipAmount || 0;
  const totalEstimated = baseFare + tip;

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('bookingSummaryTitle')} showBack={true} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          {/* Top Nearby Partners Privacy Counter */}
          <div className="bg-emerald-900 text-white p-3.5 rounded-2xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{t('activePartnersNearby')}</span>
            </div>
            <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
              Ready to Match
            </span>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/70">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                {t('serviceSummary')}
              </span>
              <h3 className="text-lg font-black text-neutral-900">
                {bookingDraft.serviceName}
              </h3>
              {bookingDraft.customTaskDescription && (
                <p className="text-xs text-neutral-600 italic mt-1 bg-white p-2 rounded-lg border border-neutral-200/80">
                  "{bookingDraft.customTaskDescription}"
                </p>
              )}
            </div>

            <div className="p-4 space-y-3 divide-y divide-neutral-100 text-xs">
              {/* Location */}
              <div className="flex items-start gap-3 pt-1 first:pt-0">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-neutral-900">{bookingDraft.locationName}</div>
                  <div className="text-[11px] text-neutral-500">{bookingDraft.fullAddress}</div>
                  {bookingDraft.landmark && (
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      Landmark: {bookingDraft.landmark}
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Scheduled Time Range */}
              <div className="flex items-start gap-3 pt-3">
                <Calendar className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-neutral-900">{bookingDraft.date}</div>
                  <div className="text-[11px] text-neutral-500">
                    {bookingDraft.startTime} – {parseInt(bookingDraft.startTime) + Math.ceil(bookingDraft.expectedDurationMins / 60)}:00 PM
                  </div>
                </div>
              </div>

              {/* Duration & Rate */}
              <div className="flex items-start gap-3 pt-3">
                <Timer className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-neutral-900">
                      {bookingDraft.expectedDurationMins} {t('mins')} ({durationHours} {t('hrs')})
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {t('rateSummary')}: ₹{rate}/min
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-neutral-800">
                    ₹{baseFare}
                  </div>
                </div>
              </div>

              {/* Tip (if added) */}
              {tip > 0 && (
                <div className="flex items-center justify-between pt-3 text-emerald-700 font-bold">
                  <span>Customer Tip (100% to partner)</span>
                  <span className="font-mono">+₹{tip}</span>
                </div>
              )}

              {/* Estimated Total */}
              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-neutral-900 uppercase tracking-wider block">
                    {t('estimatedAmountLabel')}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Cash on completion
                  </span>
                </div>
                <div className="text-xl font-black text-emerald-800 font-mono">
                  ₹{totalEstimated}
                </div>
              </div>
            </div>
          </div>

          {/* Business Rule Notice */}
          <div className="p-3.5 bg-neutral-100 rounded-2xl border border-neutral-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-neutral-600 leading-tight">
              <span className="font-bold text-neutral-900">
                {language === 'hi' ? 'वास्तविक समय बिलिंग: ' : 'Fair Billing Notice: '}
              </span>
              <span>{t('actualBillingNote')}</span>
            </div>
          </div>

          {/* Privacy Note - confirming Terms were already agreed */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === 'hi'
                ? 'नियम व शर्तें प्रोफ़ाइल निर्माण के समय स्वीकार कर ली गई हैं।'
                : 'Terms previously accepted during profile creation.'}
            </span>
          </div>
        </div>

        {/* Primary Action: BOOK NOW */}
        {/* IMPORTANT: Do NOT add a Terms checkbox here */}
        <div className="pt-4 pb-2">
          <button
            onClick={handleBookingSubmit}
            className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base tracking-wider shadow-lg shadow-emerald-800/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('bookNowBtn')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
