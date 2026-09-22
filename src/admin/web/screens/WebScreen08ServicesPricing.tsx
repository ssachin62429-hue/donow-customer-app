import React, { useState } from 'react';
import {
  Sliders,
  Save,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Layers,
  IndianRupee,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServicePricingItem } from '../../types';

export const WebScreen08ServicesPricing: React.FC = () => {
  const { servicesPricing, updateServicePricing, saveAllPricingChanges } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(servicesPricing.map((s) => s.category))];

  const filteredServices = servicesPricing.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Service & Tariff Configuration</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              10 Services
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Configure per-minute baseline billing tariffs and minimum duration thresholds. Minimum Amount auto-calculates in real-time.
          </p>
        </div>

        {/* SCREEN 8 REQUIREMENT: Button: [SAVE PRICING CHANGES] */}
        <button
          onClick={saveAllPricingChanges}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
        >
          <Save className="w-4 h-4" />
          <span>SAVE PRICING CHANGES</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-500 text-neutral-950 font-black shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SCREEN 8 REQUIREMENT: Table/Grid of all 10 DoNow Services with Editable Inputs & Toggle */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-extrabold tracking-wider uppercase text-[10px]">
                <th className="py-3.5 px-4">Service Name & Scope</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Base Rate (₹ / min)</th>
                <th className="py-3.5 px-4">Min Duration (Mins)</th>
                <th className="py-3.5 px-4">Min Charge (Auto)</th>
                <th className="py-3.5 px-4 text-center">Status Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredServices.map((service) => {
                return (
                  <tr
                    key={service.id}
                    className={`hover:bg-neutral-850/50 transition-colors ${
                      !service.isEnabled ? 'opacity-50 bg-neutral-950/30' : ''
                    }`}
                  >
                    {/* Service Name & Scope */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{service.nameEn}</span>
                        <span className="font-hindi text-xs text-neutral-400 font-normal">
                          ({service.nameHi})
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        {service.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 text-[10px] font-semibold">
                        {service.category}
                      </span>
                    </td>

                    {/* Editable Input: Base Rate (₹ / min) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 w-32">
                        <span className="text-neutral-500 font-bold">₹</span>
                        <input
                          type="number"
                          step="0.5"
                          min="1"
                          max="20"
                          value={service.baseRate}
                          onChange={(e) =>
                            updateServicePricing(service.id, {
                              baseRate: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full bg-neutral-950 border border-neutral-750 focus:border-amber-400 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-amber-400 outline-hidden"
                        />
                        <span className="text-[11px] text-neutral-500">/min</span>
                      </div>
                    </td>

                    {/* Editable Input: Minimum Billable Duration (mins) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 w-28">
                        <input
                          type="number"
                          step="5"
                          min="10"
                          max="120"
                          value={service.minDurationMins}
                          onChange={(e) =>
                            updateServicePricing(service.id, {
                              minDurationMins: parseInt(e.target.value, 10) || 0,
                            })
                          }
                          className="w-full bg-neutral-950 border border-neutral-750 focus:border-amber-400 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-white outline-hidden"
                        />
                        <span className="text-[11px] text-neutral-500">mins</span>
                      </div>
                    </td>

                    {/* Auto-calculated Minimum Amount */}
                    <td className="py-4 px-4 font-mono font-bold">
                      <div className="px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs inline-flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{service.minAmount.toFixed(2)}</span>
                      </div>
                      <span className="block text-[9px] text-neutral-500 mt-0.5">
                        ({service.baseRate} × {service.minDurationMins}m)
                      </span>
                    </td>

                    {/* SCREEN 8 REQUIREMENT: Toggle Switch [ENABLE / DISABLE SERVICE] */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() =>
                          updateServicePricing(service.id, { isEnabled: !service.isEnabled })
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          service.isEnabled
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                        title={service.isEnabled ? 'Disable Service' : 'Enable Service'}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            service.isEnabled ? 'bg-white' : 'bg-neutral-600'
                          }`}
                        />
                        <span>{service.isEnabled ? 'ENABLED' : 'DISABLED'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Policy & Surge Rules Notice */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-start gap-3 text-xs text-neutral-400">
        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-bold">Real-time Surge Billing Note:</strong>
          <span>
            Adjusting base rates immediately propagates to client apps and partner meter timers. No active running orders will be altered mid-task; newly accepted orders inherit updated values.
          </span>
        </div>
      </div>
    </div>
  );
};
