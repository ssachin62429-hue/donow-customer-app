import React from 'react';
import { ChevronLeft, Circle, Square } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AndroidNavBarProps {
  isDarkTheme?: boolean;
  onBackPress?: () => void;
  onHomePress?: () => void;
  onRecentsPress?: () => void;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  isDarkTheme = false,
  onBackPress,
  onHomePress,
  onRecentsPress,
}) => {
  // Gracefully handle if outside AppContext
  let appContext: any = null;
  try {
    appContext = useApp();
  } catch (e) {
    appContext = null;
  }

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (appContext?.goBack) {
      appContext.goBack();
    }
  };

  const handleHome = () => {
    if (onHomePress) {
      onHomePress();
    } else if (appContext?.navigate) {
      appContext.navigate('home');
    }
  };

  const handleRecents = () => {
    if (onRecentsPress) {
      onRecentsPress();
    } else if (appContext?.navigate) {
      appContext.navigate('orders');
    }
  };

  return (
    <div
      className={`w-full py-2.5 px-10 flex items-center justify-between select-none z-30 transition-colors ${
        isDarkTheme ? 'bg-neutral-950 text-neutral-400' : 'bg-neutral-900 text-neutral-400'
      }`}
    >
      {/* Android Back Button */}
      <button
        onClick={handleBack}
        className="p-1 hover:text-white transition-colors active:scale-90"
        title="Back"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Android Home Button */}
      <button
        onClick={handleHome}
        className="p-1 hover:text-white transition-colors active:scale-90"
        title="Home"
      >
        <Circle className="w-4 h-4" />
      </button>

      {/* Android Recent Apps Button */}
      <button
        onClick={handleRecents}
        className="p-1 hover:text-white transition-colors active:scale-90"
        title="Recent Tasks / Settings"
      >
        <Square className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
