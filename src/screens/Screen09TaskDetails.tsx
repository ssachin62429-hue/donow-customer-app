import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, Clock, Timer, Check, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { SERVICES_DATA } from '../data/servicesData';

export const Screen09TaskDetails: React.FC = () => {
  const { bookingDraft, updateBookingDraft, navigate, t, language } = useApp();

  const currentService =
    SERVICES_DATA.find((s) => s.id === bookingDraft.serviceId) || SERVICES_DATA[8]; // Default Event & Party Help

  const serviceName = language === 'hi' ? currentService.nameHi : currentService.nameEn;

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    bookingDraft.selectedOptions.length > 0
      ? bookingDraft.selectedOptions
      : [currentService.taskOptions[0]?.id || 'other']
  );
  const [additionalDetails, setAdditionalDetails] = useState(bookingDraft.additionalDetails || '');
  const [date, setDate] = useState(bookingDraft.date || 'Today, 19 Sep');
  const [startTime, setStartTime] = useState(bookingDraft.startTime || '10:00 AM');
  const [durationMins, setDurationMins] = useState(
    Math.max(bookingDraft.expectedDurationMins || 120, currentService.minDurationMins)
  );

  const toggleOption = (optId: string) => {
    if (selectedOptions.includes(optId)) {
      if (selectedOptions.length > 1) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optId));
      }
    } else {
      setSelectedOptions([...selectedOptions, optId]);
    }
  };

  const handleContinue = () => {
    updateBookingDraft({
      serviceId: currentService.id,
      serviceName,
      selectedOptions,
      additionalDetails,
      date,
      startTime,
      expectedDurationMins: durationMins,
      ratePerMin: currentService.ratePerMin,
    });
    navigate('location-select');
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={serviceName} showBack={true} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Service Header Card with Rate and Minimum */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                {language === 'hi' ? 'चयनित सेवा' : 'Selected Service'}
              </span>
              <h2 className="text-xl font-black text-neutral-900 mt-1">
                {serviceName}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-emerald-800 font-mono">
                ₹{currentService.ratePerMin}/min
              </div>
              <div className="text-[11px] font-bold text-neutral-500">
                Min: ₹{currentService.minCharge} / {currentService.minDurationMins} min
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-500">
            <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>{t('minDurationRule')}</span>
          </div>
        </div>

        {/* Configurable Task Options (Configurable later from backend) */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {t('selectTaskOptions')}
          </h3>
          <p className="text-[11px] text-neutral-500">
            {language === 'hi' ? 'एक या अधिक कार्य विकल्प चुनें:' : 'Select one or more task requirements:'}
          </p>

          <div className="space-y-2 pt-1">
            {currentService.taskOptions.map((opt) => {
              const isSelected = selectedOptions.includes(opt.id);
              const label = language === 'hi' ? opt.labelHi : opt.labelEn;

              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-medium'
                  }`}
                >
                  <span className="text-xs">{label}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-emerald-700 text-white' : 'border border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Details Textbox */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
          <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {t('additionalDetailsLabel')}
          </label>
          <textarea
            rows={3}
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder={t('additionalDetailsPlaceholder')}
            className="w-full text-xs p-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white resize-none"
          />
        </div>

        {/* Schedule & Duration Parameters */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3.5">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {language === 'hi' ? 'तारीख, समय और अवधि' : 'Date, Time & Duration'}
          </h3>

          {/* Location Summary Row */}
          <div
            onClick={() => navigate('location-select')}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="truncate">
                <span className="block text-[10px] font-bold text-neutral-400 uppercase">
                  {t('taskLocationLabel')}
                </span>
                <span className="text-xs font-bold text-neutral-800 truncate">
                  {bookingDraft.locationName || 'KGMU Hospital, Chowk, Lucknow'}
                </span>
              </div>
            </div>
            <span className="text-xs text-emerald-700 font-bold shrink-0">
              {language === 'hi' ? 'बदलें' : 'Change'}
            </span>
          </div>

          {/* Date & Start Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase mb-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-600" />
                <span>{t('taskDateLabel')}</span>
              </div>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs font-bold text-neutral-800 bg-transparent focus:outline-none"
              >
                <option value="Today, 19 Sep">Today, 19 Sep</option>
                <option value="Tomorrow, 20 Sep">Tomorrow, 20 Sep</option>
                <option value="Sunday, 21 Sep">Sunday, 21 Sep</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase mb-1">
                <Clock className="w-3.5 h-3.5 text-neutral-600" />
                <span>{t('taskStartTimeLabel')}</span>
              </div>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs font-bold text-neutral-800 bg-transparent focus:outline-none"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase">
                <Timer className="w-3.5 h-3.5 text-neutral-600" />
                <span>{t('taskDurationLabel')}</span>
              </div>
              <span className="text-xs font-mono font-black text-emerald-800">
                {durationMins} mins ({durationMins / 60} hrs) • Est. ₹{durationMins * currentService.ratePerMin}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[30, 60, 120, 180].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setDurationMins(m)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
                    durationMins === m
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {m >= 60 ? `${m / 60}h` : `${m}m`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pt-2 pb-4">
          <button
            onClick={handleContinue}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('continue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
