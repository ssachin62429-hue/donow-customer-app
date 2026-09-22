import React, { useState } from 'react';
import { Mic, ArrowRight, MapPin, Calendar, Clock, Timer, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen07WriteTask: React.FC = () => {
  const { bookingDraft, updateBookingDraft, navigate, t, language } = useApp();

  const [taskText, setTaskText] = useState(
    bookingDraft.customTaskDescription || 'Birthday party mein guests manage karne ke liye help chahiye.'
  );
  const [date, setDate] = useState(bookingDraft.date || 'Today, 19 Sep');
  const [startTime, setStartTime] = useState(bookingDraft.startTime || '10:00 AM');
  const [durationMins, setDurationMins] = useState(bookingDraft.expectedDurationMins || 120);
  const [isDictating, setIsDictating] = useState(false);

  const handleVoiceDemo = () => {
    setIsDictating(true);
    setTimeout(() => {
      setTaskText('Hospital mein doctor OPD registration aur medicine line mein help chahiye.');
      setIsDictating(false);
    }, 1500);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookingDraft({
      customTaskDescription: taskText,
      date,
      startTime,
      expectedDurationMins: durationMins,
      // Default rate if custom task: ₹3/min
      ratePerMin: 3,
    });
    navigate('location-select');
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('writeTaskTitle')} showBack={true} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full flex flex-col justify-between">
        <form onSubmit={handleContinue} className="space-y-4">
          {/* Main Title */}
          <div>
            <h2 className="text-xl font-black text-neutral-900 tracking-tight">
              {t('writeTaskTitle')}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {language === 'hi'
                ? 'अपनी जरूरत को अपनी भाषा (हिंदी या हिंग्लिश) में लिखें।'
                : 'Describe your requirements freely in Hindi, Hinglish, or English.'}
            </p>
          </div>

          {/* Large Text Area with Voice Input Button */}
          <div className="relative rounded-2xl bg-white border border-neutral-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 shadow-xs transition-all p-3.5">
            <textarea
              rows={5}
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder={t('writeTaskPlaceholder')}
              className="w-full text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <span className="text-[11px] text-neutral-400">
                {taskText.length} characters
              </span>

              {/* Voice Dictation Button Demo */}
              <button
                type="button"
                onClick={handleVoiceDemo}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isDictating
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isDictating ? 'Listening...' : t('voiceInputHint')}</span>
              </button>
            </div>
          </div>

          {/* Quick Prompt Pill Examples */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider py-1">
              Suggestions:
            </span>
            {[
              'Hospital OPD queue line',
              'Heavy sofa shifting inside flat',
              'Birthday party guest management',
              'Notary stamp paper run',
            ].map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => setTaskText(sug)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Parameters Group: Location, Date, Start Time, Duration */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-3.5">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              {language === 'hi' ? 'समय और स्थान विवरण' : 'Schedule & Location'}
            </h4>

            {/* Location */}
            <div
              onClick={() => navigate('location-select')}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer group transition-colors"
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
              <span className="text-xs text-emerald-700 font-bold group-hover:underline shrink-0">
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
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>
            </div>

            {/* Expected Duration (Min 30 mins) */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase">
                  <Timer className="w-3.5 h-3.5 text-neutral-600" />
                  <span>{t('taskDurationLabel')}</span>
                </div>
                <span className="text-xs font-mono font-black text-emerald-800">
                  {durationMins} {t('mins')} ({durationMins / 60} {t('hrs')})
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                {[30, 60, 120, 180].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationMins(mins)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
                      durationMins === mins
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-400 mt-2">
                * Minimum billable duration is 30 minutes. You only pay for exact minutes served.
              </p>
            </div>
          </div>
        </form>

        {/* Bottom CTA */}
        <div className="pt-4">
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
