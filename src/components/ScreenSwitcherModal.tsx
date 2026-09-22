import React from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenId } from '../types';

interface ScreenDef {
  id: ScreenId;
  num: number;
  titleEn: string;
  titleHi: string;
  category: 'Onboarding' | 'Booking Flow' | 'Fulfillment' | 'Main Tabs' | 'Safety & Support';
}

const SCREENS_LIST: ScreenDef[] = [
  { id: 'splash', num: 1, titleEn: 'Splash Screen', titleHi: 'स्प्लैश स्क्रीन', category: 'Onboarding' },
  { id: 'permissions', num: 2, titleEn: 'Permission Setup', titleHi: 'अनुमति सेटअप', category: 'Onboarding' },
  { id: 'login', num: 3, titleEn: 'Mobile Login', titleHi: 'मोबाइल लॉगिन', category: 'Onboarding' },
  { id: 'otp', num: 4, titleEn: 'OTP Verification', titleHi: 'OTP सत्यापन', category: 'Onboarding' },
  { id: 'create-profile', num: 5, titleEn: 'Create Profile + Terms', titleHi: 'प्रोफ़ाइल और नियम व शर्तें', category: 'Onboarding' },

  { id: 'home', num: 6, titleEn: 'Home Screen', titleHi: 'होम स्क्रीन', category: 'Main Tabs' },
  { id: 'write-task', num: 7, titleEn: 'Write Your Task', titleHi: 'अपना काम लिखें', category: 'Booking Flow' },
  { id: 'service-select', num: 8, titleEn: 'Service Selection (10 Services)', titleHi: '10 सेवा चयन', category: 'Booking Flow' },
  { id: 'task-details', num: 9, titleEn: 'Task Details', titleHi: 'कार्य विवरण', category: 'Booking Flow' },
  { id: 'location-select', num: 10, titleEn: 'Location & Map Pin', titleHi: 'स्थान व मैप पिन', category: 'Booking Flow' },
  { id: 'booking-summary', num: 11, titleEn: 'Booking Summary', titleHi: 'बुकिंग सारांश', category: 'Booking Flow' },

  { id: 'finding-partner', num: 12, titleEn: 'Finding Partner (3km-5km-7km)', titleHi: 'पार्टनर खोज (3-5-7 किमी)', category: 'Fulfillment' },
  { id: 'tip-selection', num: 13, titleEn: 'Add Tip (₹10, ₹20, ₹40, ₹100)', titleHi: 'टिप जोड़ें', category: 'Fulfillment' },
  { id: 'partner-accepted', num: 14, titleEn: 'Partner Accepted (Rahul Sharma)', titleHi: 'पार्टनर स्वीकृत', category: 'Fulfillment' },
  { id: 'partner-arrived', num: 15, titleEn: 'Partner Arrived (Early timer rule)', titleHi: 'पार्टनर आगमन', category: 'Fulfillment' },
  { id: 'work-in-progress', num: 16, titleEn: 'Work in Progress (Live Timer)', titleHi: 'काम जारी है', category: 'Fulfillment' },
  { id: 'work-completed', num: 17, titleEn: 'Work Completed (Billing & Cash)', titleHi: 'काम पूरा हुआ', category: 'Fulfillment' },
  { id: 'rate-partner', num: 18, titleEn: 'Rate Partner (5 Stars & Review)', titleHi: 'पार्टनर को रेटिंग दें', category: 'Fulfillment' },

  { id: 'orders', num: 19, titleEn: 'Orders (Upcoming/Active/Done)', titleHi: 'मेरे ऑर्डर', category: 'Main Tabs' },
  { id: 'order-details', num: 20, titleEn: 'Order Details & History', titleHi: 'ऑर्डर विवरण एवं इतिहास', category: 'Main Tabs' },
  { id: 'notifications', num: 21, titleEn: 'Notifications History', titleHi: 'सूचनाएं', category: 'Main Tabs' },
  { id: 'profile', num: 22, titleEn: 'Profile & Settings', titleHi: 'प्रोफ़ाइल और सेटिंग्स', category: 'Main Tabs' },

  { id: 'help-support', num: 23, titleEn: 'Help & Support (Tickets)', titleHi: 'सहायता एवं समर्थन', category: 'Safety & Support' },
  { id: 'sos', num: 24, titleEn: 'Emergency SOS (112 & Team)', titleHi: 'आपातकालीन सहायता SOS', category: 'Safety & Support' },
];

interface ScreenSwitcherModalProps {
  onSwitchToPartnerApp?: () => void;
}

export const ScreenSwitcherModal: React.FC<ScreenSwitcherModalProps> = ({ onSwitchToPartnerApp }) => {
  const { isScreenSwitcherOpen, setIsScreenSwitcherOpen, currentScreen, navigate, language } = useApp();

  if (!isScreenSwitcherOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Prototype Navigator
              </span>
              <span className="text-xs text-neutral-500 font-mono">24 Screens</span>
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mt-1">
              DoNow Screen Flow Directory
            </h3>
          </div>
          <button
            onClick={() => setIsScreenSwitcherOpen(false)}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-neutral-100">
          {SCREENS_LIST.map((scr) => {
            const isCurrent = currentScreen === scr.id;
            return (
              <button
                key={scr.id}
                onClick={() => {
                  navigate(scr.id);
                  setIsScreenSwitcherOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-all pt-2.5 ${
                  isCurrent
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                      isCurrent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {scr.num}
                  </span>
                  <div>
                    <div className="text-xs font-semibold">
                      {language === 'hi' ? scr.titleHi : scr.titleEn}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {scr.category} • {scr.id}
                    </div>
                  </div>
                </div>

                {isCurrent ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-neutral-50 border-t border-neutral-100 text-center space-y-2">
          {onSwitchToPartnerApp && (
            <button
              onClick={() => {
                setIsScreenSwitcherOpen(false);
                onSwitchToPartnerApp();
              }}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>🚀 Switch to DoNow Partner App (16 Screens)</span>
            </button>
          )}
          <p className="text-[11px] text-neutral-500">
            Click any screen to jump directly. You can also follow the natural flow from Screen 1 to Screen 24.
          </p>
        </div>
      </div>
    </div>
  );
};
