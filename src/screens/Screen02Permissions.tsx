import React from 'react';
import { MapPin, Bell, Camera, Mic, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen02Permissions: React.FC = () => {
  const { permissions, togglePermission, navigate, t, language } = useApp();

  const permissionList = [
    {
      key: 'location' as const,
      title: t('permLocationTitle'),
      desc: t('permLocationDesc'),
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      required: true,
    },
    {
      key: 'notifications' as const,
      title: t('permNotifTitle'),
      desc: t('permNotifDesc'),
      icon: <Bell className="w-5 h-5 text-emerald-600" />,
      required: true,
    },
    {
      key: 'camera' as const,
      title: t('permCameraTitle'),
      desc: t('permCameraDesc'),
      icon: <Camera className="w-5 h-5 text-neutral-600" />,
      required: false,
    },
    {
      key: 'microphone' as const,
      title: t('permMicTitle'),
      desc: t('permMicDesc'),
      icon: <Mic className="w-5 h-5 text-neutral-600" />,
      required: false,
    },
  ];

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('permissionTitle')} showBack={false} />

      <div className="flex-1 p-5 flex flex-col justify-between max-w-lg mx-auto w-full">
        <div>
          {/* Header Description */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'गोपनीयता प्राथमिकता' : 'Privacy First Setup'}</span>
            </div>
            <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              {t('permissionTitle')}
            </h2>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              {t('permissionDesc')}
            </p>
          </div>

          {/* Permissions Cards */}
          <div className="space-y-3">
            {permissionList.map((p) => {
              const isGranted = permissions[p.key];
              return (
                <div
                  key={p.key}
                  className={`p-4 rounded-2xl border transition-all ${
                    isGranted
                      ? 'bg-white border-emerald-300 shadow-xs'
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isGranted ? 'bg-emerald-100' : 'bg-neutral-100'
                      }`}
                    >
                      {p.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-neutral-900">{p.title}</h4>
                          {p.required && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              {language === 'hi' ? 'ज़रूरी' : 'Required'}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => togglePermission(p.key)}
                          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                            isGranted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
                          }`}
                        >
                          {isGranted ? t('permAllowed') : t('permAllow')}
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy Note */}
          <div className="mt-4 p-3 bg-neutral-100 rounded-xl border border-neutral-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-[11px] text-neutral-600 leading-tight">
              {language === 'hi'
                ? 'DoNow कभी भी अनावश्यक डेटा या कॉल रिकॉर्ड एक्सेस नहीं करता है।'
                : 'DoNow never accesses unnecessary background sensors or storage.'}
            </p>
          </div>
        </div>

        {/* Bottom Continue Button */}
        <div className="pt-6 pb-2">
          <button
            onClick={() => navigate('login')}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all"
          >
            {t('permGrantAll')}
          </button>
        </div>
      </div>
    </div>
  );
};
