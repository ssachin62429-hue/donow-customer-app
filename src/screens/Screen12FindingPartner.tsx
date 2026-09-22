import React, { useEffect, useState } from 'react';
import { Radar, Users, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InteractiveMapMock } from '../components/InteractiveMapMock';

export const Screen12FindingPartner: React.FC = () => {
  const {
    matchingStage,
    setMatchingStage,
    handlePartnerAccept,
    navigate,
    t,
    language,
  } = useApp();

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Radius expansion stages simulation:
  // 0-4s: Stage 1 (3 km)
  // 5-9s: Stage 2 (5 km)
  // 10s+: Stage 3 (7 km)
  useEffect(() => {
    if (secondsElapsed >= 10 && matchingStage < 3) {
      setMatchingStage(3);
    } else if (secondsElapsed >= 5 && matchingStage < 2) {
      setMatchingStage(2);
    }
  }, [secondsElapsed, matchingStage, setMatchingStage]);

  const currentRadiusKm = matchingStage === 1 ? 3 : matchingStage === 2 ? 5 : 7;

  const stageText =
    matchingStage === 1
      ? t('searchRadius3km')
      : matchingStage === 2
      ? t('searchRadius5km')
      : t('searchRadius7km');

  return (
    <div className="min-h-full flex flex-col justify-between bg-neutral-900 text-white p-5 select-none relative overflow-hidden">
      {/* Background ambient radar glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="text-center pt-2 z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
          <Radar className="w-3.5 h-3.5 animate-spin" />
          <span>Stage {matchingStage} of 3</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">
          {t('findingPartnerTitle')}
        </h2>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
          {t('findingPartnerSub')}
        </p>
      </div>

      {/* Center Radar Map Visualization */}
      <div className="my-auto z-10 space-y-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-700">
          <InteractiveMapMock
            heightClass="h-64"
            showSearchRadius={true}
            searchRadiusKm={currentRadiusKm}
          />

          {/* Floating Radar Stage Indicator on Map */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-xs font-mono font-bold bg-neutral-950/80 backdrop-blur-xs text-emerald-400 px-3 py-1 rounded-full border border-neutral-700">
              Radius: {currentRadiusKm} km
            </span>
            <span className="text-xs font-mono font-medium bg-neutral-950/80 backdrop-blur-xs text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700">
              00:{secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed}
            </span>
          </div>
        </div>

        {/* Current Search Phase Description */}
        <div className="bg-neutral-800/90 border border-neutral-700 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-400 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>{stageText}</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-tight max-w-xs mx-auto">
            {t('autoMatchingNote')}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3 mt-3">
            {[1, 2, 3].map((stg) => (
              <div
                key={stg}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  matchingStage >= stg ? 'w-8 bg-emerald-500' : 'w-3 bg-neutral-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Controls for Prototype Demonstration */}
      <div className="z-10 pb-2 space-y-2.5">
        {/* Simulate Partner Acceptance */}
        <button
          onClick={handlePartnerAccept}
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Simulate Partner Found (Screen 14)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* If no acceptance yet -> Screen 13: Add Tip */}
        <button
          onClick={() => navigate('tip-selection')}
          className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>No partner accepted yet? Add Tip (Screen 13)</span>
        </button>

        <p className="text-[10px] text-center text-neutral-500">
          Prototype simulation allows stepping into either scenario seamlessly.
        </p>
      </div>
    </div>
  );
};
