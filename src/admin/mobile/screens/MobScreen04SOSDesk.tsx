import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  Siren,
  ShieldCheck,
  MapPin,
  Clock,
  Battery,
  User,
  Radio,
  CheckCircle2,
  FileText,
  Volume2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { SOSAlert } from '../../types';

export const MobScreen04SOSDesk: React.FC = () => {
  const { sosAlerts, selectedSOS, setSelectedSOS, resolveSOS, triggerCall } = useAdmin();
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  const activeAlerts = sosAlerts.filter((s) => s.status === 'ACTIVE');
  const currentAlert: SOSAlert | undefined =
    selectedSOS || (activeAlerts.length > 0 ? activeAlerts[0] : sosAlerts[0]);

  const handleConfirmResolve = () => {
    if (currentAlert) {
      resolveSOS(currentAlert.id, resolutionNotes || 'Investigated by Safety team. Parties safe.');
      setIsResolveModalOpen(false);
      setResolutionNotes('');
    }
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col overflow-y-auto">
      {/* Critical SOS Header */}
      <div className="bg-red-950/80 border-b border-red-800/80 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white animate-pulse">
              <Siren className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                <span>SOS & Emergency Desk</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                  LIVE
                </span>
              </h1>
              <p className="text-[11px] text-red-300">Level 1 Emergency Incident Response Protocol</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-red-900/60 px-2 py-1 rounded text-red-200 border border-red-700">
            {activeAlerts.length} Critical
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* SCREEN 4 REQUIREMENT: List view of Active SOS alerts */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Active Alerts Queue ({sosAlerts.length})
          </span>

          <div className="space-y-2">
            {sosAlerts.map((alert) => {
              const isActive = alert.status === 'ACTIVE';
              const isSelected = currentAlert?.id === alert.id;

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedSOS(alert)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-red-500 shadow-lg shadow-red-950/40'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isActive ? 'bg-red-500 animate-ping' : 'bg-emerald-500'
                        }`}
                      />
                      <span className="font-bold text-xs text-white">{alert.orderId}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase ${
                          isActive ? 'bg-red-600 text-white' : 'bg-neutral-800 text-emerald-400'
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400">{alert.timestamp}</span>
                  </div>

                  <div className="text-xs text-neutral-300 font-medium truncate">
                    {alert.location}
                  </div>
                  <div className="text-[11px] text-amber-400 mt-1">
                    By: {alert.triggeredBy} • Customer: {alert.customerName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SCREEN 4 REQUIREMENT: Detail Card */}
        {currentAlert ? (
          <div className="bg-neutral-900 border-2 border-red-600/70 rounded-2xl p-4 space-y-3.5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-red-600" />

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-black text-red-400 tracking-widest uppercase">
                  Incident Card {currentAlert.orderId}
                </span>
                <h2 className="text-base font-black text-white">{currentAlert.taskTitle}</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 font-mono">Battery: {currentAlert.batteryLevel}</span>
              </div>
            </div>

            {/* Prompt exact requirements in detail card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                <span className="text-neutral-400 font-bold">Triggered By:</span>
                <span className="font-black text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                  {currentAlert.triggeredBy}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                <span className="text-neutral-400 font-bold">Customer:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{currentAlert.customerName}</span>
                </span>
              </div>

              <div className="flex items-start justify-between border-b border-neutral-800/80 pb-2">
                <span className="text-neutral-400 font-bold shrink-0">Location:</span>
                <span className="font-bold text-amber-300 text-right flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{currentAlert.location}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span>GPS Coordinates:</span>
                <span className="font-mono text-neutral-300">{currentAlert.coordinates}</span>
              </div>
            </div>

            {/* Live Audio Stream Monitor */}
            <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-red-300">
                <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="font-semibold">Live Emergency Audio Stream: Active</span>
              </div>
              <span className="text-[10px] font-mono text-red-400">02:14s</span>
            </div>

            {/* SCREEN 4 REQUIREMENT: Action Buttons (Red/Prominent) */}
            {/* [CALL POLICE (112)], [CALL PARTNER], [CALL CUSTOMER], [MARK RESOLVED] */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">
                Emergency Dispatch Actions
              </span>

              {/* CALL POLICE 112 (Top High-Priority Red Button) */}
              <button
                onClick={() => triggerCall('Police Emergency Response 112', '112', 'Police (112)')}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white font-black text-sm rounded-xl shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider transition-colors"
              >
                <Siren className="w-5 h-5 animate-bounce" />
                <span>CALL POLICE (112)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* CALL PARTNER */}
                <button
                  onClick={() => triggerCall(currentAlert.partnerName, currentAlert.partnerPhone, 'Partner')}
                  className="py-3 bg-neutral-800 hover:bg-neutral-750 text-white font-bold text-xs rounded-xl border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>CALL PARTNER</span>
                </button>

                {/* CALL CUSTOMER */}
                <button
                  onClick={() => triggerCall(currentAlert.customerName, currentAlert.customerPhone, 'Customer')}
                  className="py-3 bg-neutral-800 hover:bg-neutral-750 text-white font-bold text-xs rounded-xl border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>CALL CUSTOMER</span>
                </button>
              </div>

              {/* MARK RESOLVED */}
              <button
                onClick={() => setIsResolveModalOpen(true)}
                disabled={currentAlert.status === 'RESOLVED'}
                className={`w-full py-2.5 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors ${
                  currentAlert.status === 'RESOLVED'
                    ? 'bg-neutral-800 text-emerald-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 cursor-pointer'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {currentAlert.status === 'RESOLVED' ? 'ALREADY RESOLVED' : 'MARK RESOLVED'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-neutral-900 border border-neutral-800 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">No active SOS alarms at this moment.</p>
            <p className="text-xs text-neutral-400">All field partners and customers are operating safely.</p>
          </div>
        )}
      </div>

      {/* Mark Resolved Modal */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-bold text-sm text-white">Resolve Emergency SOS Alert</h3>
            </div>
            <p className="text-xs text-neutral-300">
              Please enter the resolution outcome note before closing this emergency incident.
            </p>
            <textarea
              rows={3}
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="E.g., Spoke with Partner Rahul and customer Amit. False trigger resolved safely. Both parties confirmed normal operation."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 outline-hidden focus:border-emerald-500"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsResolveModalOpen(false)}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmResolve}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-xl shadow-md shadow-emerald-600/30"
              >
                Confirm Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
