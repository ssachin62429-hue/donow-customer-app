import React from 'react';
import {
  LayoutDashboard,
  Users,
  Sliders,
  Settings,
  Receipt,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminPartner, AdminWebScreen } from '../../types';

interface WebSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { webScreen, setWebScreen, activeSOSCount, partners } = useAdmin();

  const pendingKYCCount = partners.filter((p: AdminPartner) => p.status === 'Pending').length;

  const navItems: {
    id: AdminWebScreen;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'web-dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'web-partners',
      label: 'Partners & KYC',
      icon: Users,
      badge: pendingKYCCount > 0 ? `${pendingKYCCount} New` : undefined,
      badgeColor: 'bg-amber-500 text-neutral-950',
    },
    {
      id: 'web-services',
      label: 'Services & Pricing',
      icon: Sliders,
    },
    {
      id: 'web-settings',
      label: 'Global Settings',
      icon: Settings,
    },
    {
      id: 'web-ledger',
      label: 'Financial Ledger',
      icon: Receipt,
      badge: 'Settlements',
      badgeColor: 'bg-emerald-950 text-emerald-400 border border-emerald-800',
    },
    {
      id: 'web-audit',
      label: 'Fraud & Audit Logs',
      icon: ShieldAlert,
      badge: activeSOSCount > 0 ? 'SOS' : undefined,
      badgeColor: 'bg-red-600 text-white animate-pulse',
    },
  ];

  return (
    <aside
      className={`bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between transition-all duration-300 select-none z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-neutral-950 text-base shadow-lg shadow-amber-500/20">
                ⚡
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-lg text-white">DoNow</span>
                <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                  Master Web
                </span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-neutral-950 text-base mx-auto shadow-md">
              ⚡
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1.5">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Operations Control
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = webScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setWebScreen(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase ${
                      item.badgeColor || 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-neutral-800">
        {!collapsed ? (
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-neutral-400 font-semibold">Cluster Hub</span>
              <span className="font-mono text-amber-400 font-bold">LKO-NORTH-01</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-neutral-400 font-semibold">Live Engine</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                99.98% SLA
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-emerald-400" title="System Operational">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
        )}
      </div>
    </aside>
  );
};
