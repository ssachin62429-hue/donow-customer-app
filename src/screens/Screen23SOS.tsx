import React, { useState } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  Send,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen23SOS: React.FC = () => {
  const { goBack, t, language } = useApp();
  const [sosSent, setSosSent] = useState(false);

  const handleTriggerSOS = () => {
    setSosSent(true);
  };

  return (
    <div className="min-h-full flex flex-col bg-red-950 text-white select-none">
      <div className="p-4 flex items-center justify-between border-b border-red-900/80 bg-red-900/40">
        <button
          onClick={goBack}
          className="p-2 rounded-xl bg-red-900/50 hover:bg-red-800 text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-black text-sm tracking-wider uppercase text-red-200">
          Emergency Assistance
        </span>
        <div className="w-9" />
      </div>

      <div className="flex-1 p-5 pb-8 overflow-y-auto max-w-lg mx-auto w-full flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          {/* Pulsing Emergency Header */}
          <div className="text-center pt-2">
            <div className="w-20 h-20 rounded-full bg-red-600/30 border-4 border-red-500/50 flex items-center justify-center mx-auto mb-3 animate-pulse shadow-lg">
              <ShieldAlert className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {t('sosTitle')}
            </h2>
            <p className="text-xs text-red-200/90 mt-1 max-w-xs mx-auto leading-relaxed">
              {t('sosSub')}
            </p>
          </div>

          {/* Trigger Alert Notification Box */}
          {sosSent ? (
            <div className="bg-emerald-900/90 border border-emerald-500 p-4 rounded-2xl text-center space-y-1 animate-in zoom-in-95">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-sm font-black text-white">
                {language === 'hi' ? 'आपातकालीन अलर्ट सक्रिय!' : 'Emergency SOS Broadcasted!'}
              </div>
              <p className="text-xs text-emerald-200">
                {language === 'hi'
                  ? 'आपकी लाइव जीपीएस स्थिति DoNow सुरक्षा टीम और आपके आपातकालीन संपर्क को भेज दी गई है।'
                  : 'Your live GPS location has been shared with DoNow Rapid Response & emergency contacts.'}
              </p>
            </div>
          ) : (
            <button
              onClick={handleTriggerSOS}
              className="w-full py-4 px-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm tracking-wider shadow-xl shadow-red-950 flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t('triggerSosAlert')}</span>
            </button>
          )}

          {/* Direct Emergency Dials */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider block px-1">
              Direct Emergency Helplines
            </span>

            {/* 112 National Helpline */}
            <a
              href="tel:112"
              className="p-4 rounded-2xl bg-red-900/60 hover:bg-red-900 border border-red-800 flex items-center justify-between transition-colors block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-800 text-white flex items-center justify-center font-black">
                  112
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {t('policeHelpline')}
                  </h4>
                  <p className="text-[11px] text-red-200">
                    National Unified Emergency Services (India)
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-red-800/80 text-red-200">
                <PhoneCall className="w-4 h-4" />
              </div>
            </a>

            {/* DoNow 24x7 Safety Response Desk */}
            <a
              href="tel:1800-000-0000"
              className="p-4 rounded-2xl bg-red-900/60 hover:bg-red-900 border border-red-800 flex items-center justify-between transition-colors block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-800 text-white flex items-center justify-center font-black">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {t('safetyHelpline')}
                  </h4>
                  <p className="text-[11px] text-red-200">
                    Direct human response within 15 seconds
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-red-800/80 text-red-200">
                <PhoneCall className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className="p-3.5 bg-red-900/30 rounded-2xl border border-red-900/50 flex items-start gap-2.5 text-xs text-red-200">
            <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              When SOS is activated, phone calls are recorded for safety auditing and local authorities can be dispatched immediately to the verified task GPS coordinates.
            </p>
          </div>
        </div>

        {/* Dismiss / Safe Button */}
        <div>
          <button
            onClick={goBack}
            className="w-full py-3.5 px-6 rounded-xl bg-red-900/80 hover:bg-red-900 text-white font-bold text-xs tracking-wider transition-colors border border-red-800"
          >
            I am Safe / Return to Task
          </button>
        </div>
      </div>
    </div>
  );
};
