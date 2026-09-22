import React from 'react';
import {
  Calendar,
  AlertOctagon,
  Shield,
  Bell,
  Power,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminRole } from '../../types';

export const WebHeader: React.FC = () => {
  const {
    adminUser,
    setAdminRole,
    isOrdersGloballyPaused,
    setIsOrdersGloballyPaused,
    activeSOSCount,
    setWebScreen,
  } = useAdmin();

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  const roles: AdminRole[] = ['Super Admin', 'Operations', 'Safety', 'Finance'];

  return (
    <header className="h-16 bg-neutral-900 border-b border-neutral-800 px-6 flex items-center justify-between z-10 select-none">
      {/* Left: Breadcrumb & Today's Date */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{formattedDate}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400 font-mono">11:09 AM IST</span>
        </div>

        {/* SOS Alert Badge in Header if active */}
        {activeSOSCount > 0 && (
          <button
            onClick={() => setWebScreen('web-audit')}
            className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black shadow-md shadow-red-600/30 animate-pulse transition-all"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{activeSOSCount} ACTIVE SOS</span>
          </button>
        )}
      </div>

      {/* Right: Global Emergency Pause Toggle & Admin Profile */}
      <div className="flex items-center gap-5">
        {/* SCREEN 6 REQUIREMENT: Global "Pause All New Orders" emergency toggle */}
        <div className="flex items-center gap-2.5 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-1.5">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
              Emergency Dispatch Killswitch
            </span>
            <span
              className={`text-[11px] font-black ${
                isOrdersGloballyPaused ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {isOrdersGloballyPaused ? 'ORDERS PAUSED GLOBALLY' : 'DISPATCH ACTIVE'}
            </span>
          </div>

          <button
            onClick={() => setIsOrdersGloballyPaused((prev: boolean) => !prev)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-350 cursor-pointer ${
              isOrdersGloballyPaused ? 'bg-red-600' : 'bg-neutral-800'
            }`}
            title="Toggle Global Pause on New Orders"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-350 ${
                isOrdersGloballyPaused ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Role Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs">
          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-neutral-400 font-medium">Role:</span>
          <select
            value={adminUser.role}
            onChange={(e) => setAdminRole(e.target.value as AdminRole)}
            className="bg-transparent font-bold text-white outline-hidden cursor-pointer text-xs"
          >
            {roles.map((r) => (
              <option key={r} value={r} className="bg-neutral-900 text-white">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Admin Profile Details */}
        <div className="flex items-center gap-3 pl-2 border-l border-neutral-800">
          <img
            src={adminUser.avatar}
            alt={adminUser.name}
            className="w-9 h-9 rounded-xl border border-amber-400/80 object-cover"
          />
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>{adminUser.name}</span>
            </div>
            <div className="text-[10px] text-amber-400 font-semibold">{adminUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
