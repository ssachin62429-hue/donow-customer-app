import React from 'react';
import {
  AlertTriangle,
  Users,
  Clock,
  MapPin,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Radio,
  CheckCircle2,
  PhoneCall,
  Flame,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const MobScreen02Dashboard: React.FC = () => {
  const {
    activeSOSCount,
    setMobileScreen,
    adminUser,
    isOrdersGloballyPaused,
    setIsOrdersGloballyPaused,
  } = useAdmin();

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col overflow-y-auto">
      {/* SCREEN 2 REQUIREMENT: Persistent Red Banner at top (if active SOS exists) */}
      {activeSOSCount > 0 && (
        <button
          onClick={() => setMobileScreen('admin-mob-sos')}
          className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-3 flex items-center justify-between font-black text-xs tracking-wider transition-colors shadow-lg shadow-red-600/30 animate-pulse active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-white" />
            <span>⚠️ {activeSOSCount} ACTIVE SOS - TAP TO VIEW</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold bg-black/20 px-2 py-0.5 rounded-full">
            <span>Respond</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      )}

      <div className="p-4 space-y-4">
        {/* Top Operational Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className="w-10 h-10 rounded-full border-2 border-amber-400/80 object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-black text-white">{adminUser.name}</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-[11px] text-amber-400 font-bold">{adminUser.role} • Lucknow Node</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">System State</span>
            <div className="flex items-center gap-1.5 justify-end">
              <span className={`w-2 h-2 rounded-full ${isOrdersGloballyPaused ? 'bg-red-500' : 'bg-emerald-500'}`} />
              <span className="text-xs font-bold text-neutral-200">
                {isOrdersGloballyPaused ? 'PAUSED' : 'HEALTHY'}
              </span>
            </div>
          </div>
        </div>

        {/* Global Pause Alert if enabled */}
        {isOrdersGloballyPaused && (
          <div className="p-3 bg-red-950/70 border border-red-800/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-red-300 font-medium">
              <Flame className="w-4 h-4 text-red-400 shrink-0" />
              <span>Global Dispatch is temporarily paused by Admin</span>
            </div>
            <button
              onClick={() => setIsOrdersGloballyPaused(false)}
              className="text-[11px] font-bold px-2 py-1 bg-red-800 hover:bg-red-700 text-white rounded-md"
            >
              Resume
            </button>
          </div>
        )}

        {/* SCREEN 2 REQUIREMENT: Quick Stat Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Active Orders: 14 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-1">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-semibold text-emerald-400">+18%</span>
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight">14</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Active Orders</div>
            </div>
          </div>

          {/* Active Partners: 32 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-1">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-semibold text-emerald-400">Online</span>
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight">32</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Active Partners</div>
            </div>
          </div>

          {/* Pending KYC: 5 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-1">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-semibold text-amber-400">Action</span>
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight">5</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Pending KYC</div>
            </div>
          </div>
        </div>

        {/* Live Operations Radar Widget */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-black tracking-wide text-neutral-200 uppercase">
                Field Dispatch Radar
              </span>
            </div>
            <button
              onClick={() => setMobileScreen('admin-mob-map')}
              className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Full Screen Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mini Interactive Map Teaser */}
          <div
            onClick={() => setMobileScreen('admin-mob-map')}
            className="relative h-28 bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 cursor-pointer group"
          >
            {/* Mock map roads */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-800" />
            <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-neutral-800" />
            <div className="absolute top-0 bottom-0 right-1/4 w-1 bg-neutral-800" />

            {/* Pins */}
            <div className="absolute top-6 left-1/4 flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-300 bg-black/60 px-1 rounded">Rahul S.</span>
            </div>
            <div className="absolute bottom-6 right-1/3 flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-500/30" />
              <span className="text-[9px] font-bold text-sky-300 bg-black/60 px-1 rounded">En Route #8922</span>
            </div>
            <div className="absolute top-8 right-8 flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
              <span className="text-[9px] font-bold text-neutral-300 bg-black/60 px-1 rounded">Vikram P.</span>
            </div>

            <div className="absolute bottom-2 left-2 px-2 py-1 bg-neutral-900/90 rounded text-[10px] text-neutral-300 font-semibold backdrop-blur-xs flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Tap to Open Live Operations Map</span>
            </div>
          </div>
        </div>

        {/* Quick Operational Shortcuts */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Quick Incident Controls
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setMobileScreen('admin-mob-sos')}
              className="p-3 bg-red-950/40 hover:bg-red-950/70 border border-red-900/60 rounded-xl text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>SOS Emergency</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">1 Active Desk Alert</div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-red-400 transition-colors" />
            </button>

            <button
              onClick={() => setMobileScreen('admin-mob-tickets')}
              className="p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-xl text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Support Disputes</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">2 Waiting for Admin</div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* Today's Fulfillment KPI */}
        <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-300">Daily Demand Index</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 94.2% Fulfilled
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="w-[94%] h-full bg-linear-to-r from-emerald-500 to-amber-400 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
            <span>Completed: 68</span>
            <span>Cancelled: 4</span>
            <span>Avg ETA: 6.8 mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
