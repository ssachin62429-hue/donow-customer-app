import React from 'react';
import { Bell, CheckCircle2, UserCheck, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { BottomNav } from '../components/BottomNav';

export const Screen21Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead, navigate, t, language } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'accepted':
        return <UserCheck className="w-4 h-4 text-emerald-700" />;
      case 'arrived':
        return <MapPin className="w-4 h-4 text-blue-700" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-teal-700" />;
      default:
        return <Bell className="w-4 h-4 text-amber-700" />;
    }
  };

  const handleClick = (id: string, targetScreen?: any) => {
    markNotificationAsRead(id);
    if (targetScreen) {
      navigate(targetScreen);
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('notificationsTitle')} showBack={false} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            {language === 'hi' ? 'हाल की सूचनाएं' : 'Recent Updates'}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer">
            {language === 'hi' ? 'सभी पढ़ी हुई मार्क करें' : 'Mark all as read'}
          </span>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => {
            const title = language === 'hi' ? n.titleHi : n.titleEn;
            const message = language === 'hi' ? n.messageHi : n.messageEn;

            return (
              <div
                key={n.id}
                onClick={() => handleClick(n.id, n.targetScreen)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  !n.isRead
                    ? 'bg-white border-emerald-500/40 shadow-xs ring-1 ring-emerald-500/10'
                    : 'bg-neutral-50/80 border-neutral-200 opacity-80'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-black text-neutral-900 truncate">
                      {title}
                    </h4>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                    {message}
                  </p>
                  <span className="text-[10px] text-neutral-400 mt-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.timeAgo}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
};
