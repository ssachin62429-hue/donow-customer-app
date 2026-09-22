import React from 'react';
import {
  User,
  CheckCircle2,
  Globe,
  FileText,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { BottomNav } from '../components/BottomNav';

export const Screen22Profile: React.FC = () => {
  const { profile, language, setLanguage, logout, navigate, t } = useApp();

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('profileNav')} showBack={false} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* User Card */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black text-xl flex items-center justify-center shadow-xs">
            {profile.name ? profile.name.charAt(0) : 'A'}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black text-neutral-900 truncate">
              {profile.name || 'Amit Verma'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono font-bold text-neutral-600">
                +91 {profile.mobile || '9876543210'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Language Selection Card */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-neutral-600" />
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                {t('languageLabel')}
              </span>
            </div>
            <span className="text-xs font-medium text-neutral-400">
              {language === 'hi' ? 'हिंदी सक्रिय' : 'English Active'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setLanguage('en')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                language === 'en'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                language === 'hi'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Legal & Policies Group */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs divide-y divide-neutral-100 overflow-hidden text-xs">
          {/* Terms */}
          <div
            onClick={() => navigate('terms')}
            className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-neutral-600" />
              <span className="font-bold text-neutral-800 group-hover:text-emerald-800">
                {t('termsItem')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>

          {/* Privacy */}
          <div
            onClick={() => navigate('privacy')}
            className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-neutral-600" />
              <span className="font-bold text-neutral-800 group-hover:text-emerald-800">
                {t('privacyItem')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>

          {/* Support */}
          <div
            onClick={() => navigate('support')}
            className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-neutral-600" />
              <span className="font-bold text-neutral-800 group-hover:text-emerald-800">
                {t('supportItem')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full p-4 rounded-2xl bg-red-50 hover:bg-red-100/80 text-red-700 font-bold text-xs flex items-center justify-center gap-2 border border-red-200 transition-colors active:scale-[0.99]"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>{t('logoutItem')}</span>
        </button>

        {/* App Version Info */}
        <div className="text-center pt-2">
          <div className="text-[11px] font-black tracking-wider text-neutral-400 uppercase">
            DoNow Mobile v1.0.4 Prototype
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">
            "Kaam hai? DoNow." • Built for Indian Marketplace
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
