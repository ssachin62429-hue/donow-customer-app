import React from 'react';
import { ArrowLeft, Globe, Layers, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderBarProps {
  title?: string;
  showBack?: boolean;
  showLanguageToggle?: boolean;
  showNotifications?: boolean;
  rightAction?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBack = true,
  showLanguageToggle = true,
  showNotifications = false,
  rightAction,
}) => {
  const { goBack, language, setLanguage, setIsScreenSwitcherOpen, navigate, unreadNotificationsCount } = useApp();

  return (
    <header className="w-full bg-white border-b border-neutral-100 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-2.5">
        {showBack && (
          <button
            onClick={goBack}
            className="p-1.5 -ml-1 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title && (
          <h1 className="text-base font-bold text-neutral-900 truncate max-w-[210px] sm:max-w-xs">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showLanguageToggle && (
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors border border-neutral-200"
            title="Toggle English / हिन्दी"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        )}

        {showNotifications && (
          <button
            onClick={() => navigate('notifications')}
            className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full border border-white" />
            )}
          </button>
        )}

        {rightAction}

        <button
          onClick={() => setIsScreenSwitcherOpen(true)}
          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors border border-dashed border-neutral-300"
          title="Jump to any screen (Prototype Navigator)"
        >
          <Layers className="w-4 h-4 text-emerald-700" />
        </button>
      </div>
    </header>
  );
};
