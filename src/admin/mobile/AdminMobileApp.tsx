import React from 'react';
import {
  Home,
  Map,
  AlertTriangle,
  MessageSquare,
  LogOut,
  Layers,
  PhoneCall,
  PhoneOff,
  Phone,
  Shield,
  X,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { MobScreen01Login } from './screens/MobScreen01Login';
import { MobScreen02Dashboard } from './screens/MobScreen02Dashboard';
import { MobScreen03LiveMap } from './screens/MobScreen03LiveMap';
import { MobScreen04SOSDesk } from './screens/MobScreen04SOSDesk';
import { MobScreen05Tickets } from './screens/MobScreen05Tickets';
import { AdminMobileScreen } from '../types';

export const AdminMobileApp: React.FC = () => {
  const {
    mobileScreen,
    setMobileScreen,
    activeSOSCount,
    adminUser,
    logoutAdmin,
    activeCallingSim,
    closeCall,
  } = useAdmin();

  const renderScreen = () => {
    switch (mobileScreen) {
      case 'admin-mob-login':
        return <MobScreen01Login />;
      case 'admin-mob-dashboard':
        return <MobScreen02Dashboard />;
      case 'admin-mob-map':
        return <MobScreen03LiveMap />;
      case 'admin-mob-sos':
        return <MobScreen04SOSDesk />;
      case 'admin-mob-tickets':
        return <MobScreen05Tickets />;
      default:
        return <MobScreen02Dashboard />;
    }
  };

  const navItems: {
    id: AdminMobileScreen;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { id: 'admin-mob-dashboard', label: 'Home', icon: Home },
    { id: 'admin-mob-map', label: 'Live Map', icon: Map },
    { id: 'admin-mob-sos', label: 'SOS', icon: AlertTriangle, badge: activeSOSCount },
    { id: 'admin-mob-tickets', label: 'Tickets', icon: MessageSquare, badge: 2 },
  ];

  return (
    <div className="w-full max-w-[420px] h-[844px] max-h-[94vh] bg-neutral-950 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border-4 border-neutral-800 font-sans">
      {/* Phone Sensor Notch */}
      <div className="w-24 h-4 bg-neutral-900 rounded-full mx-auto mt-2 z-40 shrink-0 pointer-events-none" />

      {/* Mini Status Bar */}
      <div className="px-6 py-1.5 flex items-center justify-between text-[11px] font-bold text-neutral-400 select-none z-30">
        <span>11:09</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-amber-400 font-mono">5G</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>88%</span>
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {renderScreen()}
      </div>

      {/* SCREEN 2 REQUIREMENT: Bottom Navigation Bar: Home, Live Map, SOS, Tickets */}
      {mobileScreen !== 'admin-mob-login' && (
        <div className="bg-neutral-900 border-t border-neutral-800 px-3 py-2 flex items-center justify-around z-30 select-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = mobileScreen === item.id;
            const isSOS = item.id === 'admin-mob-sos';

            return (
              <button
                key={item.id}
                onClick={() => setMobileScreen(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl relative transition-all active:scale-95 ${
                  isActive
                    ? isSOS
                      ? 'text-red-400 font-bold'
                      : 'text-amber-400 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isSOS && item.badge ? 'animate-bounce text-red-500' : ''}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[9px] font-black shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* In-App Calling Simulator Modal */}
      {activeCallingSim?.isOpen && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase font-mono tracking-wider">DoNow Secure Relay Voice</span>
            <button onClick={closeCall} className="p-1 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto animate-pulse">
              <Phone className="w-9 h-9 text-red-400" />
            </div>
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Connecting {activeCallingSim.role}...
              </span>
              <h3 className="text-xl font-black text-white mt-1">{activeCallingSim.name}</h3>
              <p className="text-sm font-mono text-neutral-300">{activeCallingSim.number}</p>
            </div>
            <div className="text-xs text-neutral-400 pt-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Priority Dialing • Dual Audio Stream Active</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={closeCall}
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/40"
            >
              <PhoneOff className="w-5 h-5" />
              <span>END CALL</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen Fast-Jumper Bar (Floating Pill at bottom-right for dev & evaluation) */}
      <div className="absolute bottom-16 right-3 z-40">
        <div className="dropdown relative group">
          <button
            title="Jump to any of 5 mobile screens"
            className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 border border-neutral-700 rounded-full shadow-lg text-[10px] font-bold flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mob (5)</span>
          </button>

          <div className="hidden group-hover:flex flex-col absolute bottom-full right-0 mb-2 w-52 bg-neutral-900 border border-neutral-700 rounded-xl p-1.5 shadow-2xl space-y-1 z-50">
            <span className="text-[10px] font-bold text-neutral-400 px-2 py-1 uppercase">Admin Mobile Screens</span>
            {[
              { id: 'admin-mob-login', label: '1. Login & Role' },
              { id: 'admin-mob-dashboard', label: '2. Dashboard (Home)' },
              { id: 'admin-mob-map', label: '3. Live Operations Map' },
              { id: 'admin-mob-sos', label: '4. SOS Emergency Desk' },
              { id: 'admin-mob-tickets', label: '5. Support Disputes' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setMobileScreen(s.id as AdminMobileScreen)}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  mobileScreen === s.id
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
