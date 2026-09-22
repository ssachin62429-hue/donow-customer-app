import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ShieldCheck,
  Radio,
  FileWarning,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const WebScreen11AuditLogs: React.FC = () => {
  const { auditLogs, revokeBanOrOverride } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'All' | 'CRITICAL' | 'WARNING' | 'INFO'>('All');

  const filteredLogs = auditLogs.filter((log) => {
    if (severityFilter !== 'All' && log.severity !== severityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.entityId.toLowerCase().includes(q) ||
        log.entityName.toLowerCase().includes(q) ||
        log.event.toLowerCase().includes(q) ||
        log.actionTaken.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Fraud, Cooldown & Security Audit Logs</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-800">
              Automated Safety Engine
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time telemetry monitoring for mock-location spoofing, repeat cancellation rate-limits, and administrative overrides.
          </p>
        </div>

        {/* Security Metric Chips */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-neutral-400">Critical Alerts:</span>
            <span className="font-bold text-white">
              {auditLogs.filter((l) => l.severity === 'CRITICAL' && !l.isOverridden).length}
            </span>
          </div>

          <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-400">Admin Overrides:</span>
            <span className="font-bold text-emerald-400">
              {auditLogs.filter((l) => l.isOverridden).length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:w-80 flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, event..."
            className="w-full bg-transparent text-xs text-white placeholder-neutral-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          {(['All', 'CRITICAL', 'WARNING', 'INFO'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                severityFilter === sev
                  ? 'bg-amber-500 text-neutral-950 font-black shadow-sm'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* SCREEN 11 REQUIREMENT: Log Table: Timestamp, User/Partner ID, Event, Action Taken */}
      {/* Action column: Button [REVOKE BAN / OVERRIDE] */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-extrabold tracking-wider uppercase text-[10px]">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">User / Partner ID</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Event Description</th>
                <th className="py-3.5 px-4">Action Taken by System</th>
                <th className="py-3.5 px-4 text-right">Admin Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredLogs.map((log) => {
                const isCritical = log.severity === 'CRITICAL';
                const isWarning = log.severity === 'WARNING';

                return (
                  <tr
                    key={log.id}
                    className={`hover:bg-neutral-850/50 transition-colors ${
                      log.isOverridden ? 'opacity-65 bg-neutral-950/30' : ''
                    }`}
                  >
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* User / Partner ID */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-amber-400">{log.entityId}</div>
                      <div className="text-[11px] text-neutral-300">{log.entityName}</div>
                      <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-neutral-800 text-neutral-400">
                        {log.entityType}
                      </span>
                    </td>

                    {/* Severity */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          isCritical
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : isWarning
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>

                    {/* Event Description */}
                    {/* Examples requested: "Partner XYZ locked for 12h (3 cancellations in 24h)." */}
                    {/* "GPS Anomaly detected for Partner ABC." */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="font-bold text-white text-xs leading-relaxed">{log.event}</p>
                    </td>

                    {/* Action Taken */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="text-neutral-300 text-[11px] block">{log.actionTaken}</span>
                      {log.isOverridden && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Overridden by Admin
                        </span>
                      )}
                    </td>

                    {/* SCREEN 11 REQUIREMENT: Action column: Button [REVOKE BAN / OVERRIDE] */}
                    <td className="py-3.5 px-4 text-right">
                      {!log.isOverridden ? (
                        <button
                          onClick={() => revokeBanOrOverride(log.id)}
                          className="px-3 py-1.5 bg-red-900/40 hover:bg-red-900/80 border border-red-700/60 text-red-300 hover:text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>REVOKE BAN / OVERRIDE</span>
                        </button>
                      ) : (
                        <span className="text-neutral-500 font-semibold text-xs flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Cleared</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
