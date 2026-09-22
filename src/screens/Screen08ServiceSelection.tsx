import React from 'react';
import {
  Activity,
  ShoppingBag,
  FileText,
  HeartHandshake,
  PawPrint,
  Home,
  Truck,
  Wrench,
  Sparkles,
  Users,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { SERVICES_DATA } from '../data/servicesData';

export const Screen08ServiceSelection: React.FC = () => {
  const { selectService, t, language } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-red-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'PawPrint':
        return <PawPrint className="w-5 h-5 text-emerald-600" />;
      case 'Home':
        return <Home className="w-5 h-5 text-indigo-600" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-orange-600" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-600" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('servicesTitle')} showBack={true} />

      <div className="flex-1 p-4 pb-8 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Title & Indian Business Rules Banner */}
        <div>
          <h2 className="text-xl font-black text-neutral-900 tracking-tight">
            {t('servicesTitle')}
          </h2>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            {t('servicesSub')}
          </p>
        </div>

        {/* Pricing Transparency Summary Card */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div className="text-[11px] text-emerald-900 leading-tight">
              <span className="font-bold">Transparent Rates: </span>
              <span>₹2/min (Min ₹60) • ₹2.5/min (Min ₹75) • ₹3/min (Min ₹90)</span>
            </div>
          </div>
        </div>

        {/* The 10 Services List */}
        <div className="space-y-2.5">
          {SERVICES_DATA.map((service, index) => {
            const name = language === 'hi' ? service.nameHi : service.nameEn;
            const tagline = language === 'hi' ? service.taglineHi : service.taglineEn;

            return (
              <div
                key={service.id}
                onClick={() => selectService(service.id)}
                className="w-full text-left p-3.5 rounded-2xl bg-white border border-neutral-200/90 hover:border-emerald-600 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-neutral-200/60">
                      {getIcon(service.iconName)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-neutral-400">
                          #{index + 1}
                        </span>
                        <h3 className="text-sm font-black text-neutral-900 group-hover:text-emerald-800 transition-colors">
                          {name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 max-w-[210px] sm:max-w-xs">
                        {tagline}
                      </p>
                    </div>
                  </div>

                  {/* Rate & Min Charge Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-black text-neutral-900 font-mono">
                        ₹{service.ratePerMin}/min
                      </div>
                      <div className="text-[10px] text-neutral-400 font-medium">
                        Min ₹{service.minCharge} / 30m
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
