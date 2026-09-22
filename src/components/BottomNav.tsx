import React from 'react';
import { Home, ClipboardList, Bell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenId } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigate, unreadNotificationsCount, t } = useApp();

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: t('homeTab'),
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'orders',
      label: t('ordersTab'),
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      id: 'notifications',
      label: t('notificationsTab'),
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
    {
      id: 'profile',
      label: t('profileTab'),
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav aria-label="Bottom Navigation" className="w-full bg-white border-t border-neutral-200/80 px-2 py-1.5 flex items-center justify-around z-20 shadow-lg">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative min-w-[64px] ${
              isActive
                ? 'text-emerald-700 font-bold scale-105'
                : 'text-neutral-500 hover:text-neutral-900 font-medium'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
