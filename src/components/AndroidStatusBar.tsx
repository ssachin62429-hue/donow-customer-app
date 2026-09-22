import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface AndroidStatusBarProps {
  isDarkTheme?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ isDarkTheme = false }) => {
  const [time, setTime] = useState('10:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-neutral-900 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-xs font-semibold select-none border-b border-neutral-800/60 z-30">
      <div className="flex items-center gap-1.5 tracking-tight">
        <span>{time}</span>
        <span className="text-[10px] text-neutral-400 font-normal ml-1">Jio 5G</span>
      </div>
      <div className="flex items-center gap-2 text-neutral-300">
        <Wifi className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono tracking-tighter">VoLTE</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono">88%</span>
          <Battery className="w-4 h-3.5 fill-current text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
