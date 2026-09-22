import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Save,
  Percent,
  IndianRupee,
  Lock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { GlobalPlatformSettings } from '../../types';

export const WebScreen09GlobalSettings: React.FC = () => {
  const { globalSettings, updateGlobalSettings, saveGlobalSettings } = useAdmin();

  const [formData, setFormData] = useState<GlobalPlatformSettings>({ ...globalSettings });

  const handleChange = (field: keyof GlobalPlatformSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalSettings(formData);
    saveGlobalSettings();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Global Platform Governance & Rules</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Master Controls
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Configure system-wide dispatch thresholds, commission lock ceilings, and penalty triggers.
          </p>
        </div>

        {/* SCREEN 9 REQUIREMENT: Button [UPDATE GLOBAL SETTINGS] */}
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
        >
          <Save className="w-4 h-4" />
          <span>UPDATE GLOBAL SETTINGS</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Platform Commission & Wallet Lock Rules */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Commission & Marketplace Take-Rate</h3>
              <p className="text-[11px] text-neutral-400">Platform deductions on completed tasks</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* SCREEN 9 REQUIREMENT: Platform Commission % (Input: 15) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Platform Commission %</span>
                <span className="font-mono text-amber-400 font-black">{formData.platformCommissionPct}% Take</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min="5"
                  max="30"
                  step="1"
                  value={formData.platformCommissionPct}
                  onChange={(e) =>
                    handleChange('platformCommissionPct', parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white outline-hidden"
                />
                <span className="absolute right-3.5 text-xs text-neutral-500 font-bold">%</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Current default is 15%. Deducted from partner wallet upon online or cash order completion.
              </p>
            </div>

            {/* SCREEN 9 REQUIREMENT: Commission Lock Threshold Amount (Input: ₹100) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Commission Lock Threshold Amount</span>
                <span className="font-mono text-red-400 font-black">
                  ₹{formData.commissionLockThresholdAmount}
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-neutral-500 font-bold">₹</span>
                <input
                  type="number"
                  min="50"
                  max="1000"
                  step="10"
                  value={formData.commissionLockThresholdAmount}
                  onChange={(e) =>
                    handleChange(
                      'commissionLockThresholdAmount',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-mono font-bold text-white outline-hidden"
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                Partner dispatch is automatically frozen when pending cash commission owed exceeds ₹{formData.commissionLockThresholdAmount}.
              </p>
            </div>

            {/* SCREEN 9 REQUIREMENT: Commission Lock Threshold Orders (Input: 3) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Commission Lock Threshold Orders</span>
                <span className="font-mono text-amber-400 font-black">
                  {formData.commissionLockThresholdOrders} Orders
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="1"
                value={formData.commissionLockThresholdOrders}
                onChange={(e) =>
                  handleChange(
                    'commissionLockThresholdOrders',
                    parseInt(e.target.value, 10) || 0
                  )
                }
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white outline-hidden"
              />
              <p className="text-[11px] text-neutral-500">
                Locks account if partner accumulates pending commission across {formData.commissionLockThresholdOrders} consecutive cash orders without settling.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Dispatch Radius & Cancellation Penalties */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Matching Algorithm & Penalties</h3>
              <p className="text-[11px] text-neutral-400">Auto-expansion rings and no-show deterrence</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* SCREEN 9 REQUIREMENT: Matching Radius Steps (Input: 3km, 5km, 7km) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Matching Radius Steps</span>
                <span className="font-mono text-sky-400 font-bold">{formData.matchingRadiusSteps}</span>
              </label>
              <input
                type="text"
                value={formData.matchingRadiusSteps}
                onChange={(e) => handleChange('matchingRadiusSteps', e.target.value)}
                placeholder="3km, 5km, 7km"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white outline-hidden"
              />
              <p className="text-[11px] text-neutral-500">
                Ring 1 (3km) for 45s. If no partner accepts, auto-expand to Ring 2 (5km), then Ring 3 (7km).
              </p>
            </div>

            {/* SCREEN 9 REQUIREMENT: Customer Post-Arrival Cancel Penalty (Input: ₹20) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Customer Post-Arrival Cancel Penalty</span>
                <span className="font-mono text-red-400 font-black">
                  ₹{formData.customerCancelPenalty}
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-neutral-500 font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.customerCancelPenalty}
                  onChange={(e) =>
                    handleChange('customerCancelPenalty', parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-mono font-bold text-white outline-hidden"
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                Applied when customer cancels after partner has physically arrived or waited past 5 minutes. Billed on next booking.
              </p>
            </div>

            {/* Emergency Escalation Delay */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Emergency SOS Escalation Timer</span>
                <span className="font-mono text-amber-400 font-bold">45 Seconds</span>
              </label>
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between text-xs">
                <span className="text-neutral-400">If unacknowledged by local hub:</span>
                <span className="text-red-400 font-bold">Auto-Ring Police 112 Control</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
