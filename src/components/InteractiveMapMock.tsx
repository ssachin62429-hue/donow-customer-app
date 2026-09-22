import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';

interface InteractiveMapMockProps {
  heightClass?: string;
  showSearchRadius?: boolean;
  searchRadiusKm?: number;
  showPartnerMarker?: boolean;
  partnerName?: string;
  partnerEta?: string;
  allowPinAdjust?: boolean;
  showArrivalRadius?: boolean;
}

export const InteractiveMapMock: React.FC<InteractiveMapMockProps> = ({
  heightClass = 'h-52',
  showSearchRadius = false,
  searchRadiusKm = 3,
  showPartnerMarker = false,
  partnerName = 'Rahul Sharma',
  partnerEta = '8 min away',
  allowPinAdjust = false,
  showArrivalRadius = false,
}) => {
  const [pinOffset, setPinOffset] = useState({ x: 0, y: 0 });
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowPinAdjust) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;
    setPinOffset({
      x: Math.max(-100, Math.min(100, clickX)),
      y: Math.max(-60, Math.min(60, clickY)),
    });
    setIsAdjusting(true);
    setTimeout(() => setIsAdjusting(false), 800);
  };

  return (
    <div
      onClick={handleMapClick}
      className={`relative w-full ${heightClass} bg-neutral-100 overflow-hidden rounded-2xl border border-neutral-200 select-none ${
        allowPinAdjust ? 'cursor-crosshair' : 'cursor-default'
      }`}
    >
      {/* SVG Map Canvas with realistic street vectors */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Base ground */}
        <rect width="100%" height="100%" fill="#f8fafc" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Green Parks */}
        <path d="M 10 20 Q 70 10 110 50 T 60 110 Z" fill="#dcfce7" opacity="0.8" />
        <path d="M 260 120 Q 320 80 380 140 T 310 210 Z" fill="#dcfce7" opacity="0.7" />

        {/* Gomti River / Water body shape */}
        <path
          d="M -20 180 Q 80 160 180 170 T 360 150 T 500 170"
          fill="none"
          stroke="#bae6fd"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Major Roads */}
        {/* Shah Mina Road */}
        <path d="M -10 90 L 450 90" stroke="#fed7aa" strokeWidth="8" />
        <path d="M -10 90 L 450 90" stroke="#ffffff" strokeWidth="6" />

        {/* Chowk Main Road */}
        <path d="M 210 -10 L 210 320" stroke="#fed7aa" strokeWidth="8" />
        <path d="M 210 -10 L 210 320" stroke="#ffffff" strokeWidth="6" />

        {/* Diagonal Arterial */}
        <path d="M 40 220 L 320 20" stroke="#f1f5f9" strokeWidth="7" />
        <path d="M 40 220 L 320 20" stroke="#e2e8f0" strokeWidth="4" />

        {/* Secondary streets */}
        <path d="M 60 0 L 60 220" stroke="#e2e8f0" strokeWidth="3" />
        <path d="M 120 0 L 120 220" stroke="#e2e8f0" strokeWidth="3" />
        <path d="M 290 0 L 290 220" stroke="#e2e8f0" strokeWidth="3" />
        <path d="M 0 140 L 400 140" stroke="#e2e8f0" strokeWidth="3" />

        {/* Route Line when partner marker is shown */}
        {showPartnerMarker && (
          <path
            d="M 100 65 L 140 90 L 210 90 L 210 135"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="4,4"
          />
        )}
      </svg>

      {/* Street / Landmark Labels */}
      <div className="absolute top-2.5 left-3 text-[10px] font-bold text-neutral-400 tracking-wider uppercase pointer-events-none">
        Chowk, Lucknow • KGMU Zone
      </div>
      <div className="absolute top-18 right-4 text-[9px] font-medium text-neutral-500 bg-white/80 px-1.5 py-0.5 rounded shadow-xs pointer-events-none">
        Shah Mina Rd
      </div>
      <div className="absolute bottom-6 left-5 text-[9px] font-medium text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded shadow-xs pointer-events-none">
        Gomti River Bank
      </div>

      {/* 50m Arrival Radius Circle */}
      {showArrivalRadius && (
        <div
          className="absolute rounded-full border-2 border-emerald-500 bg-emerald-500/10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{
            left: `calc(50% + ${pinOffset.x}px)`,
            top: `calc(50% + ${pinOffset.y}px)`,
            width: '110px',
            height: '110px',
          }}
        >
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
            50m Radius
          </span>
        </div>
      )}

      {/* Search Radius Animation Circles */}
      {showSearchRadius && (
        <>
          <div
            className="absolute rounded-full border border-emerald-500/60 bg-emerald-500/10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 animate-pulse"
            style={{
              left: '50%',
              top: '50%',
              width: searchRadiusKm === 3 ? '130px' : searchRadiusKm === 5 ? '190px' : '260px',
              height: searchRadiusKm === 3 ? '130px' : searchRadiusKm === 5 ? '190px' : '260px',
            }}
          />
          <div
            className="absolute rounded-full border border-dashed border-emerald-600/40 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '50%',
              top: '50%',
              width: searchRadiusKm === 3 ? '180px' : searchRadiusKm === 5 ? '240px' : '300px',
              height: searchRadiusKm === 3 ? '180px' : searchRadiusKm === 5 ? '240px' : '300px',
            }}
          />
        </>
      )}

      {/* Partner Marker */}
      {showPartnerMarker && (
        <div
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
          style={{ left: '26%', top: '30%' }}
        >
          <div className="relative flex flex-col items-center">
            <div className="bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md whitespace-nowrap mb-1 flex items-center gap-1 border border-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{partnerName} ({partnerEta})</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-400">
              <Navigation className="w-4 h-4 transform rotate-45" />
            </div>
          </div>
        </div>
      )}

      {/* Customer Location Pin */}
      <div
        className="absolute z-10 transform -translate-x-1/2 -translate-y-full transition-transform duration-200"
        style={{
          left: `calc(50% + ${pinOffset.x}px)`,
          top: `calc(50% + ${pinOffset.y}px)`,
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="bg-neutral-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap mb-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>Service Point</span>
          </div>
          <MapPin className="w-9 h-9 text-red-600 fill-red-600 drop-shadow-md" />
          <div className="w-3 h-1.5 bg-black/30 rounded-full blur-[1px] -mt-1" />
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-2 bottom-2 flex flex-col gap-1.5 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPinOffset({ x: 0, y: 0 });
          }}
          className="p-1.5 bg-white rounded-lg shadow-md text-neutral-700 hover:text-emerald-700 active:scale-95 border border-neutral-200"
          title="Center on KGMU Hospital"
        >
          <Compass className="w-4 h-4" />
        </button>
        <div className="p-1 bg-white rounded-lg shadow-md text-neutral-500 border border-neutral-200 text-[10px] font-mono font-bold text-center">
          <Layers className="w-3.5 h-3.5 mx-auto text-neutral-600" />
        </div>
      </div>

      {/* Notice for Adjusting Pin */}
      {allowPinAdjust && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xs text-neutral-800 text-[11px] font-semibold px-3 py-1 rounded-full shadow-md border border-neutral-200 flex items-center gap-1.5 pointer-events-none">
          <MapPin className="w-3 h-3 text-red-500" />
          <span>{isAdjusting ? 'Pin Moved!' : 'Tap anywhere to adjust meeting pin'}</span>
        </div>
      )}
    </div>
  );
};
