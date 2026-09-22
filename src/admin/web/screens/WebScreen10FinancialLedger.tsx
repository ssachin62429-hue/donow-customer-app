import React, { useState } from 'react';
import {
  Receipt,
  IndianRupee,
  CheckCircle2,
  AlertOctagon,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldAlert,
  Search,
  Filter,
  CreditCard,
  Building,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const WebScreen10FinancialLedger: React.FC = () => {
  const {
    pendingCommissions,
    customerPenalties,
    markUPISettlementPaid,
    clearCustomerPenalty,
  } = useAdmin();

  const [activeLedgerTab, setActiveLedgerTab] = useState<'both' | 'commissions' | 'penalties'>(
    'both'
  );

  const totalPendingCommissions = pendingCommissions.reduce(
    (acc, cur) => acc + (cur.status !== 'SETTLED' ? cur.amountDue : 0),
    0
  );

  const totalOwedPenalties = customerPenalties.reduce(
    (acc, cur) => acc + (cur.nextOrderBlockStatus !== 'CLEARED' ? cur.owedPenalty : 0),
    0
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Financial Settlement & Penalty Ledger</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              UPI Auto-Reconciliation
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Track pending partner platform dues, manual UPI settlements, and customer cancellation penalty balances.
          </p>
        </div>

        {/* Ledger Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold">
              ₹
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Uncollected Commission</span>
              <div className="text-base font-black text-white">₹{totalPendingCommissions}</div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold">
              ₹
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Owed Penalties</span>
              <div className="text-base font-black text-white">₹{totalOwedPenalties}</div>
            </div>
          </div>
        </div>
      </div>

      {/* SCREEN 10 REQUIREMENT: Table 1: Pending Commissions (Partner ID, Amount Due, Status) */}
      {(activeLedgerTab === 'both' || activeLedgerTab === 'commissions') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>Table 1: Partner Pending Commissions</span>
                <span className="text-xs text-amber-400 font-mono font-normal">
                  ({pendingCommissions.filter((p) => p.status !== 'SETTLED').length} Unsettled)
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Cash commissions owed by partners to DoNow. Partners locked when &gt; ₹100 or 3 orders.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-extrabold tracking-wider uppercase text-[10px]">
                    <th className="py-3.5 px-4">Partner ID</th>
                    <th className="py-3.5 px-4">Partner Name & Mobile</th>
                    <th className="py-3.5 px-4">Amount Due</th>
                    <th className="py-3.5 px-4">Orders Count</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Partner UPI ID</th>
                    <th className="py-3.5 px-4 text-right">Settlement Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {pendingCommissions.map((item) => {
                    const isSettled = item.status === 'SETTLED';
                    const isThresholdLocked = item.status === 'THRESHOLD_LOCKED';

                    return (
                      <tr key={item.id} className="hover:bg-neutral-850/50 transition-colors">
                        {/* Partner ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                          {item.partnerId}
                        </td>

                        {/* Partner Name & Mobile */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{item.partnerName}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">{item.partnerPhone}</div>
                        </td>

                        {/* Amount Due */}
                        <td className="py-3.5 px-4 font-mono font-bold text-base">
                          <span className={isSettled ? 'text-neutral-500' : 'text-white'}>
                            ₹{item.amountDue}
                          </span>
                        </td>

                        {/* Orders Count */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-neutral-300">
                            {item.ordersCount} cash tasks
                          </span>
                        </td>

                        {/* Status (Pending, Threshold_Locked, Settled) */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              isSettled
                                ? 'bg-neutral-800 text-neutral-400'
                                : isThresholdLocked
                                ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSettled
                                  ? 'bg-neutral-500'
                                  : isThresholdLocked
                                  ? 'bg-red-400'
                                  : 'bg-amber-400'
                              }`}
                            />
                            <span>{item.status}</span>
                          </span>
                        </td>

                        {/* Partner UPI ID */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                          {item.upiId}
                        </td>

                        {/* SCREEN 10 REQUIREMENT: Button: "Mark UPI Settlement as Paid" */}
                        <td className="py-3.5 px-4 text-right">
                          {!isSettled ? (
                            <button
                              onClick={() => markUPISettlementPaid(item.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark UPI Settlement as Paid</span>
                            </button>
                          ) : (
                            <span className="text-neutral-500 font-semibold text-xs flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Settled & Clear</span>
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
      )}

      {/* SCREEN 10 REQUIREMENT: Table 2: Customer Penalties (Customer ID, Owed Penalty, Next Order Block Status) */}
      {(activeLedgerTab === 'both' || activeLedgerTab === 'penalties') && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>Table 2: Customer Post-Arrival Cancellation Penalties</span>
                <span className="text-xs text-red-400 font-mono font-normal">
                  ({customerPenalties.filter((c) => c.nextOrderBlockStatus !== 'CLEARED').length} Blocked/Warning)
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Penalties billed when customer cancels post partner arrival or no-show. Next order gated until cleared.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-extrabold tracking-wider uppercase text-[10px]">
                    <th className="py-3.5 px-4">Customer ID</th>
                    <th className="py-3.5 px-4">Customer Name & Phone</th>
                    <th className="py-3.5 px-4">Owed Penalty</th>
                    <th className="py-3.5 px-4">Incident Reason</th>
                    <th className="py-3.5 px-4">Next Order Block Status</th>
                    <th className="py-3.5 px-4">Logged On</th>
                    <th className="py-3.5 px-4 text-right">Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {customerPenalties.map((penalty) => {
                    const isBlocked = penalty.nextOrderBlockStatus === 'BLOCKED';
                    const isWarning = penalty.nextOrderBlockStatus === 'WARNING';
                    const isCleared = penalty.nextOrderBlockStatus === 'CLEARED';

                    return (
                      <tr key={penalty.id} className="hover:bg-neutral-850/50 transition-colors">
                        {/* Customer ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                          {penalty.customerId}
                        </td>

                        {/* Customer Name & Phone */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{penalty.customerName}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">{penalty.customerPhone}</div>
                        </td>

                        {/* Owed Penalty */}
                        <td className="py-3.5 px-4 font-mono font-bold text-base text-red-400">
                          ₹{penalty.owedPenalty}
                        </td>

                        {/* Incident Reason */}
                        <td className="py-3.5 px-4 max-w-xs text-neutral-300">
                          {penalty.reason}
                        </td>

                        {/* Next Order Block Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              isBlocked
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : isWarning
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isBlocked ? 'bg-red-400' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}
                            />
                            <span>{penalty.nextOrderBlockStatus}</span>
                          </span>
                        </td>

                        {/* Logged On */}
                        <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                          {penalty.date}
                        </td>

                        {/* Resolution Action */}
                        <td className="py-3.5 px-4 text-right">
                          {!isCleared ? (
                            <button
                              onClick={() => clearCustomerPenalty(penalty.id)}
                              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                            >
                              Waive / Clear Block
                            </button>
                          ) : (
                            <span className="text-emerald-400 text-xs font-semibold">Cleared</span>
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
      )}
    </div>
  );
};
