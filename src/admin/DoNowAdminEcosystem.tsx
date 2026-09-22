import React from 'react';
import { Smartphone, Monitor, Shield, AlertTriangle, Layers, ArrowLeft } from 'lucide-react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AdminMobileApp } from './mobile/AdminMobileApp';
import { AdminWebPanel } from './web/AdminWebPanel';

interface DoNowAdminEcosystemInnerProps {
  onBackToApps?: () => void;
}

const DoNowAdminEcosystemInner: React.FC<DoNowAdminEcosystemInnerProps> = ({ onBackToApps }) => {
  const {
    activeInterface,
    setActiveInterface,
    activeSOSCount,
    mobileScreen,
    setMobileScreen,
    webScreen,
    setWebScreen,
  } = useAdmin();

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Top Universal Ecosystem Switcher Bar */}
      <header className="sticky top-0 z-50 bg-neutral-900/95 border-b border-neutral-800 backdrop-blur-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Left: Branding & Back Button */}
        <div className="flex items-center gap-3">
          {onBackToApps && (
            <button
              onClick={onBackToApps}
              className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Return to Customer / Partner Apps"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">User Apps</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white tracking-tight">
                  DoNow Admin Ecosystem
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Dual Interface
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 hidden md:block">
                Operations, Safety Dispatch, Partner KYC & Global Tariffs
              </p>
            </div>
          </div>
        </div>

        {/* Center: VISUAL SEPARATION TOGGLE */}
        {/* Clearly distinguish the "Mobile App Prototype" from "Web Panel Prototype" */}
        <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-inner">
          <button
            onClick={() => setActiveInterface('mobile')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeInterface === 'mobile'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile App Prototype (Screens 1–5)</span>
          </button>

          <button
            onClick={() => setActiveInterface('web')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeInterface === 'web'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Web Panel Prototype (Screens 6–11)</span>
          </button>
        </div>

        {/* Right: Quick Screen Jumpers & Live SOS Pill */}
        <div className="flex items-center gap-2.5">
          {activeSOSCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 rounded-full text-xs font-black animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{activeSOSCount} Active SOS</span>
            </div>
          )}

          {/* Quick Screen Jump Selector */}
          <div className="hidden lg:flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1 text-xs">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[11px] text-neutral-400 font-medium">Quick Jump:</span>
            {activeInterface === 'mobile' ? (
              <select
                value={mobileScreen}
                onChange={(e) => setMobileScreen(e.target.value as any)}
                className="bg-transparent font-bold text-amber-400 outline-hidden cursor-pointer text-xs"
              >
                <option value="admin-mob-login" className="bg-neutral-900 text-white">
                  1. Login & Role
                </option>
                <option value="admin-mob-dashboard" className="bg-neutral-900 text-white">
                  2. Operational Overview
                </option>
                <option value="admin-mob-map" className="bg-neutral-900 text-white">
                  3. Live Operations Map
                </option>
                <option value="admin-mob-sos" className="bg-neutral-900 text-white">
                  4. SOS Emergency Desk
                </option>
                <option value="admin-mob-tickets" className="bg-neutral-900 text-white">
                  5. Support Tickets
                </option>
              </select>
            ) : (
              <select
                value={webScreen}
                onChange={(e) => setWebScreen(e.target.value as any)}
                className="bg-transparent font-bold text-amber-400 outline-hidden cursor-pointer text-xs"
              >
                <option value="web-dashboard" className="bg-neutral-900 text-white">
                  6. Master Web Dashboard
                </option>
                <option value="web-partners" className="bg-neutral-900 text-white">
                  7. Partner KYC Management
                </option>
                <option value="web-services" className="bg-neutral-900 text-white">
                  8. Service & Pricing Config
                </option>
                <option value="web-settings" className="bg-neutral-900 text-white">
                  9. Global System Settings
                </option>
                <option value="web-ledger" className="bg-neutral-900 text-white">
                  10. Financial Settlement Ledger
                </option>
                <option value="web-audit" className="bg-neutral-900 text-white">
                  11. Fraud & Audit Logs
                </option>
              </select>
            )}
          </div>
        </div>
      </header>

      {/* Main Prototype Stage */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {activeInterface === 'mobile' ? (
          /* Mobile App Prototype (Rendered in Mobile Phone Frame) */
          <div className="w-full flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-neutral-950">
            <div className="mb-3 text-center">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Part 1 • Admin Mobile App Prototype
              </span>
              <p className="text-[11px] text-neutral-500">
                Simulated on 420x844 modern mobile device viewport
              </p>
            </div>

            <AdminMobileApp />
          </div>
        ) : (
          /* Web Panel Prototype (Rendered in Full Desktop View) */
          <div className="w-full flex-1 flex flex-col bg-neutral-950">
            <AdminWebPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export const DoNowAdminEcosystem: React.FC<DoNowAdminEcosystemInnerProps> = (props) => {
  return (
    <AdminProvider>
      <DoNowAdminEcosystemInner {...props} />
    </AdminProvider>
  );
};
