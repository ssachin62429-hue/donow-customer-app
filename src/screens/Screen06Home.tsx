import React from 'react';
import {
  MapPin,
  ChevronDown,
  PenTool,
  Grid,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { BottomNav } from '../components/BottomNav';

export const Screen06Home: React.FC = () => {
  const { profile, bookingDraft, activeOrder, orders, navigate, t, language } = useApp();

  // Check if there is an active or most recent order to display
  const displayOrder = activeOrder || orders.find((o) => o.status === 'upcoming' || o.status === 'active');

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      {/* Top App Bar with Greetings & Notifications */}
      <HeaderBar
        showBack={false}
        showNotifications={true}
        showLanguageToggle={true}
      />

      <div className="flex-1 p-4 pb-6 overflow-y-auto space-y-4 max-w-lg mx-auto w-full">
        {/* Top User Greeting & Location Selector */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 font-medium">
                {t('greeting')},
              </p>
              <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                {profile.name || 'Amit Verma'}
              </h2>
            </div>

            {/* Quick SOS button */}
            <button
              onClick={() => navigate('sos')}
              className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-bold tracking-tight transition-colors flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>SOS</span>
            </button>
          </div>

          {/* Location Selector Bar */}
          <div
            onClick={() => navigate('location-select')}
            className="mt-3.5 pt-3 border-t border-neutral-100 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  {t('selectLocation')}
                </div>
                <div className="text-xs font-bold text-neutral-800 truncate group-hover:text-emerald-700 transition-colors">
                  {bookingDraft.locationName || 'KGMU Hospital, Chowk, Lucknow'}
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
          </div>
        </div>

        {/* Nearby Active Partners Count Card */}
        {/* CRITICAL BUSINESS RULE: Customer sees ONLY the count of active partners, not photos/names/ratings */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black tracking-wide text-emerald-200 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>{t('activePartnersNearby')}</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-2 max-w-xs font-medium leading-tight">
                {t('activePartnersPrivacyNotice')}
              </p>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-emerald-500/10 pointer-events-none" />
        </div>

        {/* Active / Upcoming Order Card (if exists) */}
        {displayOrder && (
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-500/40 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{displayOrder.status.toUpperCase()}</span>
              </span>
              <span className="text-xs font-bold text-neutral-900 font-mono">
                ₹{displayOrder.finalAmount}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-black text-neutral-900">
                  {displayOrder.serviceName}
                </h4>
                <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span className="truncate max-w-[200px]">{displayOrder.locationName}</span>
                </p>
              </div>

              <button
                onClick={() => {
                  if (displayOrder.status === 'active') {
                    navigate('work-in-progress');
                  } else {
                    navigate('order-details');
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-800 transition-colors shrink-0"
              >
                <span>{t('viewDetails')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Main Heading */}
        <div className="pt-2">
          <h3 className="text-xl font-black text-neutral-900 tracking-tight">
            {t('homeHeading')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {language === 'hi'
              ? 'अपनी जरूरत बताएं या 10 विशेषज्ञ श्रेणियों में से चुनें।'
              : 'Describe what you need done, or pick from our verified categories.'}
          </p>
        </div>

        {/* Primary Action: Apna Kaam Likhein */}
        <button
          onClick={() => navigate('write-task')}
          className="w-full text-left p-5 rounded-2xl bg-white border-2 border-emerald-600/30 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                  {language === 'hi' ? 'प्राथमिक विकल्प' : 'Primary Action'}
                </span>
                <h4 className="text-base font-black text-neutral-900 mt-1">
                  {t('writeTaskBtn')}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t('writeTaskSub')}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* Secondary Action: Select from Services */}
        <button
          onClick={() => navigate('service-select')}
          className="w-full text-left p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-xs hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded-md">
                  {language === 'hi' ? 'सूचीबद्ध श्रेणियां' : 'All 10 Categories'}
                </span>
                <h4 className="text-base font-black text-neutral-900 mt-1">
                  {t('selectServicesBtn')}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t('selectServicesSub')}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-800 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* Indian Marketplace Guarantee Banner */}
        <div className="p-3.5 bg-neutral-100/80 rounded-2xl border border-neutral-200 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <div className="text-[11px] text-neutral-600 leading-tight">
            <span className="font-bold text-neutral-900">
              {language === 'hi' ? 'DoNow निष्पक्ष बिलिंग गारंटी: ' : 'DoNow Fair Billing Guarantee: '}
            </span>
            <span>
              {language === 'hi'
                ? 'न्यूनतम 30 मिनट के बाद वास्तविक समय पर मिनट-दर-मिनट पारदर्शी हिसाब।'
                : 'After 30 mins minimum billable duration, charges apply strictly per actual work minute.'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
