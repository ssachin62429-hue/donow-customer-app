import React from 'react';
import { usePartner } from '../context/PartnerContext';
import { PartnerScreenId } from '../types';
import { X, Layers, Smartphone } from 'lucide-react';

interface ScreenOption {
  id: PartnerScreenId;
  num: number;
  title: string;
  desc: string;
}

const SCREENS: ScreenOption[] = [
  { id: 'partner-splash', num: 1, title: 'Splash Screen', desc: 'Partner branding & motto' },
  { id: 'partner-login-otp', num: 2, title: 'Login & OTP', desc: '10-digit mobile & 6-digit auto OTP' },
  { id: 'partner-permissions', num: 3, title: 'Strict Permissions', desc: 'Location Always, Notifs, Camera' },
  { id: 'partner-kyc', num: 4, title: 'KYC & Registration', desc: 'No skill selection, admin assignment' },
  { id: 'partner-home', num: 5, title: 'Home Dashboard', desc: 'Online/Offline, Radar, Admin services' },
  { id: 'partner-incoming-order', num: 6, title: 'Incoming Order Alert', desc: 'Full-screen alarm, Earning transparency' },
  { id: 'partner-navigation', num: 7, title: 'Navigation to Customer', desc: 'Route map, masked call, slide to arrive' },
  { id: 'partner-arrival-exception', num: 8, title: 'Arrival Exceptions', desc: '50m geofence error & 4-digit code fallback' },
  { id: 'partner-work-timer', num: 9, title: 'Work in Progress', desc: 'Live timer, scheduled start, offline mode' },
  { id: 'partner-cash-collection', num: 10, title: 'Cash Collection', desc: '150 min bill, Collect Cash ₹490' },
  { id: 'partner-commission-wallet', num: 11, title: 'Commission Wallet', desc: 'Pending ₹85, lock warning rule' },
  { id: 'partner-commission-locked', num: 12, title: 'Commission Locked', desc: 'New orders paused, UPI unlock' },
  { id: 'partner-performance', num: 13, title: 'Performance & Tier', desc: 'Last 10 orders 8/10 gauge, 12h cooldown' },
  { id: 'partner-no-show', num: 14, title: 'Customer No-Show', desc: '10-min grace timer & compensation' },
  { id: 'partner-support', num: 15, title: 'Help & Support Desk', desc: 'Cash dispute, behavior, app ticket' },
  { id: 'partner-profile', num: 16, title: 'Profile & Settings', desc: 'Admin services read-only, language toggle' },
];

interface Props {
  onSwitchToCustomerApp?: () => void;
}

export const PartnerScreenTester: React.FC<Props> = ({ onSwitchToCustomerApp }) => {
  const { currentScreen, navigate, isScreenTesterOpen, setIsScreenTesterOpen } = usePartner();

  if (!isScreenTesterOpen) {
    return (
      <div className="fixed bottom-14 right-3 z-50 flex items-center gap-2">
        {onSwitchToCustomerApp && (
          <button
            onClick={onSwitchToCustomerApp}
            className="px-3 py-2 bg-neutral-900/95 hover:bg-neutral-800 text-white font-bold text-xs rounded-full shadow-2xl border border-neutral-700 flex items-center gap-1.5 active:scale-95 transition-all backdrop-blur-md"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Customer App</span>
          </button>
        )}

        <button
          onClick={() => setIsScreenTesterOpen(true)}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-full shadow-2xl flex items-center gap-1.5 active:scale-95 transition-all border-2 border-amber-300"
        >
          <Layers className="w-4 h-4" />
          <span>Partner Screens (16)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xs flex flex-col justify-end sm:justify-center p-3 select-none">
      <div className="bg-white rounded-3xl max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden max-w-md mx-auto w-full">
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="font-black text-base text-neutral-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              DoNow Partner Navigation
            </h3>
            <p className="text-[11px] text-neutral-500">
              Jump directly to any of the 16 prototype screens
            </p>
          </div>

          <button
            onClick={() => setIsScreenTesterOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-200 text-neutral-700 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Screens */}
        <div className="p-3 overflow-y-auto space-y-1.5 divide-y divide-neutral-100">
          {SCREENS.map((s) => {
            const isCurrent = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  navigate(s.id);
                  setIsScreenTesterOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-neutral-950 font-black shadow-xs'
                    : 'hover:bg-neutral-50 text-neutral-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                      isCurrent ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {s.num}
                  </span>
                  <div>
                    <span className="text-xs font-bold block">{s.title}</span>
                    <span className={`text-[10px] block ${isCurrent ? 'text-neutral-900/80' : 'text-neutral-500'}`}>
                      {s.desc}
                    </span>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-neutral-950 text-amber-400">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer switch button */}
        {onSwitchToCustomerApp && (
          <div className="p-3 border-t border-neutral-200 bg-neutral-50">
            <button
              onClick={() => {
                setIsScreenTesterOpen(false);
                onSwitchToCustomerApp();
              }}
              className="w-full py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Switch to Customer App Prototype (24 Screens)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
