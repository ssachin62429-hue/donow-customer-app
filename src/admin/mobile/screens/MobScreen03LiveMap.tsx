import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Battery,
  Gauge,
  Phone,
  Radio,
  Layers,
  Search,
  X,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { LiveMapPin } from '../../types';

export const MobScreen03LiveMap: React.FC = () => {
  const { mapPins, selectedPin, setSelectedPin, triggerCall, setMobileScreen } = useAdmin();
  const [filter, setFilter] = useState<'All' | 'Available' | 'Active'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPins = mapPins.filter((pin) => {
    if (filter === 'Available') return pin.status === 'Available';
    if (filter === 'Active') return pin.status !== 'Available';
    return true;
  }).filter((pin) =>
    pin.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pin.orderId && pin.orderId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col relative overflow-hidden">
      {/* Top Search & Filter Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 space-y-2 pointer-events-auto">
        <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-xl px-3 py-2 shadow-xl">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search partner name or Order ID..."
            className="w-full bg-transparent text-xs text-white placeholder-neutral-500 outline-hidden"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
              filter === 'All'
                ? 'bg-amber-500 text-neutral-950'
                : 'bg-neutral-900/80 backdrop-blur-md text-neutral-300 border border-neutral-800'
            }`}
          >
            All Partners ({mapPins.length})
          </button>
          <button
            onClick={() => setFilter('Available')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              filter === 'Available'
                ? 'bg-emerald-500 text-neutral-950'
                : 'bg-neutral-900/80 backdrop-blur-md text-neutral-300 border border-neutral-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Available ({mapPins.filter((p) => p.status === 'Available').length})</span>
          </button>
          <button
            onClick={() => setFilter('Active')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              filter === 'Active'
                ? 'bg-sky-500 text-neutral-950'
                : 'bg-neutral-900/80 backdrop-blur-md text-neutral-300 border border-neutral-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Tasks ({mapPins.filter((p) => p.status !== 'Available').length})</span>
          </button>
        </div>
      </div>

      {/* SCREEN 3 REQUIREMENT: Full Screen Mock Map with Custom Pins */}
      <div className="flex-1 w-full h-full relative bg-[#0d131f] overflow-hidden select-none">
        {/* Subtle Map Grid & Vector Topology */}
        <svg className="w-full h-full absolute inset-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          {/* Road Network Lines */}
          <path
            d="M -10 120 Q 150 180 300 150 T 500 240"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
          />
          <path
            d="M 120 -10 Q 180 200 220 400 T 260 700"
            fill="none"
            stroke="#334155"
            strokeWidth="7"
          />
          <path
            d="M -20 380 Q 200 360 450 420"
            fill="none"
            stroke="#475569"
            strokeWidth="5"
          />
          <path
            d="M 280 160 L 400 340 L 150 560"
            fill="none"
            stroke="#334155"
            strokeWidth="4"
          />

          {/* Gomti River Feature */}
          <path
            d="M -20 540 Q 160 480 280 560 T 480 520"
            fill="none"
            stroke="#0369a1"
            strokeWidth="16"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Landmark Badges */}
        <div className="absolute top-[35%] left-[28%] pointer-events-none opacity-60">
          <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase bg-black/40 px-1.5 py-0.5 rounded">
            KGMU Trauma Center
          </span>
        </div>
        <div className="absolute top-[56%] right-[14%] pointer-events-none opacity-60">
          <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase bg-black/40 px-1.5 py-0.5 rounded">
            Patrakarpuram Hub
          </span>
        </div>
        <div className="absolute bottom-[28%] left-[24%] pointer-events-none opacity-60">
          <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase bg-black/40 px-1.5 py-0.5 rounded">
            Charbagh Circle
          </span>
        </div>

        {/* SCREEN 3 REQUIREMENT: Custom Pins (Green = Available, Blue = Ongoing Tasks) */}
        {filteredPins.map((pin) => {
          const isAvailable = pin.status === 'Available';
          const isSelected = selectedPin?.id === pin.id;

          return (
            <button
              key={pin.id}
              onClick={() => setSelectedPin(pin)}
              style={{ top: `${pin.yPercent}%`, left: `${pin.xPercent}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform active:scale-95 group focus:outline-hidden ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              {/* Pulsing ring for selected or ongoing */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-2xl relative ${
                  isAvailable
                    ? 'bg-emerald-500 text-neutral-950 shadow-emerald-500/50'
                    : 'bg-sky-500 text-white shadow-sky-500/50'
                } ${isSelected ? 'ring-4 ring-amber-400' : ''}`}
              >
                {isAvailable ? (
                  <span className="text-xs font-black">P</span>
                ) : (
                  <Navigation className="w-4 h-4 fill-white" />
                )}

                {/* Pulse wave */}
                <span
                  className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                    isAvailable ? 'bg-emerald-400' : 'bg-sky-400'
                  }`}
                />
              </div>

              {/* Pin Label */}
              <div className="mt-1 px-1.5 py-0.5 rounded bg-neutral-900/90 text-white border border-neutral-700/70 text-[9px] font-black whitespace-nowrap shadow-md">
                {pin.partnerName}
              </div>
            </button>
          );
        })}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-28 left-3 z-10 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-lg p-2 text-[10px] space-y-1 shadow-lg pointer-events-none">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Green = Available Partners</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Blue = Ongoing Tasks / En Route</span>
          </div>
        </div>
      </div>

      {/* SCREEN 3 REQUIREMENT: Bottom Sheet when a pin is tapped */}
      {selectedPin && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-neutral-900 border-t-2 border-neutral-800 rounded-t-3xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-10 h-1 bg-neutral-700 rounded-full mx-auto mb-3" />

          <div className="flex items-start justify-between mb-3">
            <div>
              {/* Requested format: "Partner: Rahul S. | Status: En Route | Order: #8922" */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-black text-white">Partner: {selectedPin.partnerName}</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${
                    selectedPin.status === 'Available'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-sky-950 text-sky-400 border border-sky-800'
                  }`}
                >
                  Status: {selectedPin.status}
                </span>
                {selectedPin.orderId && (
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                    Order: {selectedPin.orderId}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{selectedPin.address}</span>
              </p>
            </div>

            <button
              onClick={() => setSelectedPin(null)}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-3 gap-2 bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 mb-3 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">{selectedPin.battery}% Batt</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-bold">{selectedPin.speedKmh} km/h</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold">GPS High Acc</span>
            </div>
          </div>

          {/* Order Details Context if assigned */}
          {selectedPin.orderId && (
            <div className="bg-neutral-800/60 rounded-xl p-2.5 mb-3 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Active Task</span>
                <p className="font-bold text-neutral-200">{selectedPin.serviceName || 'Hospital Assistance'}</p>
                <p className="text-[11px] text-neutral-400">Customer: {selectedPin.customerName || 'Amit Verma'}</p>
              </div>

              {selectedPin.orderId === '#8922' && (
                <button
                  onClick={() => setMobileScreen('admin-mob-sos')}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 animate-pulse"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Linked SOS</span>
                </button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerCall(selectedPin.partnerName, selectedPin.phone, 'Partner')}
              className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Partner</span>
            </button>
            <button
              onClick={() => triggerCall('Police Emergency', '112', 'Police (112)')}
              className="py-2.5 px-3 bg-red-900/60 hover:bg-red-900 text-red-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <span>112</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
