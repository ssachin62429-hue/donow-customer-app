import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { MapPin, Bell, Camera, AlertTriangle, Check, ArrowRight } from 'lucide-react';

export const Screen03StrictPermissions: React.FC = () => {
  const { navigate, t } = usePartner();
  const [perms, setPerms] = useState({
    location: true,
    notifications: true,
    camera: true,
  });

  const togglePerm = (k: 'location' | 'notifications' | 'camera') => {
    setPerms((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const allGranted = perms.location && perms.notifications && perms.camera;

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div className="space-y-5">
        {/* Title */}
        <div className="space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 text-xs font-black rounded-full border border-red-200 uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            Mandatory Compliance
          </div>
          <h2 className="text-2xl font-black text-neutral-950 leading-tight">
            {t('permissionsTitle')}
          </h2>
          <p className="text-xs text-neutral-700 bg-neutral-100 p-3 rounded-xl border border-neutral-200">
            {t('permissionsNotice')}
          </p>
        </div>

        {/* 3 Strict Permission Cards */}
        <div className="space-y-3">
          {/* Location */}
          <div
            onClick={() => togglePerm('location')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              perms.location
                ? 'border-neutral-900 bg-emerald-50/50'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${perms.location ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 pr-2">
                  <h3 className="font-extrabold text-sm text-neutral-950">
                    {t('permLocationTitle')}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t('permLocationDesc')}
                  </p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${perms.location ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300'}`}>
                {perms.location && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div
            onClick={() => togglePerm('notifications')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              perms.notifications
                ? 'border-neutral-900 bg-amber-50/50'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${perms.notifications ? 'bg-amber-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="space-y-1 pr-2">
                  <h3 className="font-extrabold text-sm text-neutral-950">
                    {t('permNotifTitle')}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t('permNotifDesc')}
                  </p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${perms.notifications ? 'bg-amber-600 border-amber-600 text-white' : 'border-neutral-300'}`}>
                {perms.notifications && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Camera */}
          <div
            onClick={() => togglePerm('camera')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              perms.camera
                ? 'border-neutral-900 bg-blue-50/50'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${perms.camera ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                  <Camera className="w-5 h-5" />
                </div>
                <div className="space-y-1 pr-2">
                  <h3 className="font-extrabold text-sm text-neutral-950">
                    {t('permCameraTitle')}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t('permCameraDesc')}
                  </p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${perms.camera ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-300'}`}>
                {perms.camera && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-6 pb-2">
        <button
          onClick={() => navigate('partner-kyc')}
          disabled={!allGranted}
          className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 disabled:opacity-40 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-lg active:scale-[0.98]"
        >
          <span>{t('grantPermissionsBtn')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
