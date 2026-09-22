import React, { useState } from 'react';
import { Search, Navigation, Building2, Flag, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { InteractiveMapMock } from '../components/InteractiveMapMock';

export const Screen10Location: React.FC = () => {
  const { bookingDraft, updateBookingDraft, navigate, t, language } = useApp();

  const [locationName, setLocationName] = useState(bookingDraft.locationName || 'KGMU Hospital');
  const [fullAddress, setFullAddress] = useState(
    bookingDraft.fullAddress || 'Shah Mina Rd, Chowk, Lucknow, Uttar Pradesh 226003'
  );
  const [landmark, setLandmark] = useState(
    bookingDraft.landmark || 'Opposite Centenary Hospital Building, Gate 2'
  );
  const [meetingInstructions, setMeetingInstructions] = useState(
    bookingDraft.meetingInstructions || 'Wait near the OPD main reception counter under the yellow sign'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const handleUseCurrentLocation = () => {
    setLocationName('Current Location (GPS Fixed)');
    setFullAddress('Shah Mina Rd, Chowk, Lucknow, Uttar Pradesh 226003');
    setLandmark('Near Gate 2 KGMU Main Road');
  };

  const handleSelectPreset = (name: string, addr: string, lm: string) => {
    setLocationName(name);
    setFullAddress(addr);
    setLandmark(lm);
  };

  const handleConfirm = () => {
    updateBookingDraft({
      locationName,
      fullAddress,
      landmark,
      meetingInstructions,
    });
    navigate('booking-summary');
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('locationTitle')} showBack={true} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Search & Current Location Bar */}
        <div className="space-y-2">
          <div className="relative flex items-center bg-white rounded-2xl border border-neutral-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 shadow-xs px-3.5 py-2.5">
            <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchLocationPlaceholder')}
              className="w-full text-xs font-medium text-neutral-900 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
            <span>{t('useCurrentLocation')}</span>
          </button>
        </div>

        {/* Interactive Map with Draggable / Tap Pin Adjust */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'hi' ? 'मैप और पिन स्थिति' : 'Map Pin Location'}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">
              {language === 'hi' ? 'पिन समायोजित करने के लिए टैप करें' : 'Tap to adjust pin'}
            </span>
          </div>

          <InteractiveMapMock
            heightClass="h-56"
            allowPinAdjust={true}
          />
        </div>

        {/* Popular Locations in Lucknow Demo Shortcuts */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { name: 'KGMU Hospital', addr: 'Chowk, Lucknow', lm: 'Gate 2 OPD' },
            { name: 'Aminabad Market', addr: 'Nazirabad, Lucknow', lm: 'Near Prakash Kulfi' },
            { name: 'Hazratganj Metro', addr: 'MG Marg, Lucknow', lm: 'Exit Gate 1' },
            { name: 'Charbagh Railway Station', addr: 'Railway Station Rd, Lucknow', lm: 'Platform 1 Portico' },
          ].map((loc) => (
            <button
              key={loc.name}
              type="button"
              onClick={() => handleSelectPreset(loc.name, loc.addr, loc.lm)}
              className="text-left px-3 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-emerald-600 text-neutral-700 shrink-0 transition-colors"
            >
              <div className="text-xs font-bold">{loc.name}</div>
              <div className="text-[10px] text-neutral-400">{loc.addr}</div>
            </button>
          ))}
        </div>

        {/* Location Details Form: Name, Address, Landmark, Instructions */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-3.5 shadow-xs">
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t('locationNameLabel')}</span>
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              {t('fullAddressLabel')}
            </label>
            <textarea
              rows={2}
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t('landmarkLabel')}</span>
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t('instructionsLabel')}</span>
            </label>
            <input
              type="text"
              value={meetingInstructions}
              onChange={(e) => setMeetingInstructions(e.target.value)}
              placeholder="e.g. Call once you reach Gate 2"
              className="w-full text-xs font-medium p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pt-2 pb-4">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('confirmLocationBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
