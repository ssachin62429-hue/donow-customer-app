import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { ShieldCheck, ArrowLeft, Globe, Trash2, Lock, Star, ChevronRight } from 'lucide-react';

export const Screen16ProfileSettings: React.FC = () => {
  const {
    navigate,
    profile,
    language,
    toggleLanguage,
    t,
  } = usePartner();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto relative">
      <div className="space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-home')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
            Account Management
          </span>
        </div>

        {/* Partner Identity Card */}
        <div className="flex items-center gap-4 p-4 bg-neutral-950 text-white rounded-3xl shadow-xl border border-neutral-800">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg text-white">{profile.name}</h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {profile.rating}
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400">{profile.mobile}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('kycStatusVerified')}
            </span>
          </div>
        </div>

        {/* ADMIN ASSIGNED SERVICES DISPLAY (Read Only) */}
        <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-800 uppercase tracking-wide">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('assignedServicesLabel')}</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
              Admin Locked
            </span>
          </div>

          <div className="space-y-2">
            {profile.assignedServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white p-3 rounded-xl border border-neutral-200 flex justify-between items-center text-xs"
              >
                <div>
                  <p className="font-bold text-neutral-900">{srv.nameEn}</p>
                  <p className="text-[10px] text-neutral-500">Approved: {srv.assignedDate}</p>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  ₹{srv.ratePerMin}/min
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-500 italic leading-relaxed">
            Note: Partners cannot self-select services. Eligible categories are assigned by DoNow operations following document verification.
          </p>
        </div>

        {/* Language Preference */}
        <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neutral-200 text-neutral-700 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">{t('appLanguageLabel')}</p>
              <p className="text-[11px] text-neutral-500">Currently: {language === 'en' ? 'English' : 'हिन्दी'}</p>
            </div>
          </div>

          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-neutral-950 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all"
          >
            {t('languageToggle')}
          </button>
        </div>

        {/* Delete My Account Option */}
        <div className="pt-2">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 flex items-center justify-between transition-colors text-xs font-bold"
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>{t('deleteAccountBtn')}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 space-y-4 max-w-sm w-full shadow-2xl border border-neutral-200">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7 text-red-600" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-black text-lg text-neutral-950">
                Confirm Account Deletion?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t('deleteAccountWarning')}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  navigate('partner-splash');
                }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Permanently Delete Account
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-3 bg-neutral-100 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
