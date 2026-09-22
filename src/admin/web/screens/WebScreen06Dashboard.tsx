import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Clock,
  IndianRupee,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  XCircle,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const WebScreen06Dashboard: React.FC = () => {
  const { setWebScreen, activeSOSCount, partners, isOrdersGloballyPaused } = useAdmin();
  const [revenueHoveredIndex, setRevenueHoveredIndex] = useState<number | null>(null);
  const [barHoveredIndex, setBarHoveredIndex] = useState<number | null>(null);

  // Mock Line Chart Data for "Daily Revenue" (7 Days)
  const revenueData = [
    { day: 'Mon', date: '14 Sep', revenue: 32400, orders: 110 },
    { day: 'Tue', date: '15 Sep', revenue: 38900, orders: 135 },
    { day: 'Wed', date: '16 Sep', revenue: 35200, orders: 122 },
    { day: 'Thu', date: '17 Sep', revenue: 42100, orders: 148 },
    { day: 'Fri', date: '18 Sep', revenue: 46800, orders: 165 },
    { day: 'Sat', date: '19 Sep', revenue: 53400, orders: 192 },
    { day: 'Sun (Today)', date: '20 Sep', revenue: 48290, orders: 174 },
  ];

  // Mock Bar Chart Data for "Completed vs Cancelled Orders"
  const ordersComparisonData = [
    { day: 'Mon', completed: 98, cancelled: 12 },
    { day: 'Tue', completed: 124, cancelled: 11 },
    { day: 'Wed', completed: 114, cancelled: 8 },
    { day: 'Thu', completed: 138, cancelled: 10 },
    { day: 'Fri', completed: 156, cancelled: 9 },
    { day: 'Sat', completed: 184, cancelled: 8 },
    { day: 'Sun', completed: 168, cancelled: 6 },
  ];

  const pendingKYCCount = partners.filter((p) => p.status === 'Pending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner if SOS Active or Orders Paused */}
      {activeSOSCount > 0 && (
        <div className="p-4 bg-red-950/80 border border-red-700/80 rounded-2xl flex items-center justify-between shadow-lg shadow-red-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <span>CRITICAL SAFETY DISPATCH ALERT</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                  1 ACTIVE SOS
                </span>
              </h3>
              <p className="text-xs text-red-200">
                Partner Rahul Sharma triggered hardware emergency alert at KGMU Hospital Trauma Center.
              </p>
            </div>
          </div>

          <button
            onClick={() => setWebScreen('web-audit')}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-colors"
          >
            <span>Investigate Incident</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Top Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Revenue Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white tracking-tight">₹48,290</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last Sunday</span>
            </div>
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">Platform Commission: ₹7,243 (15%)</div>
        </div>

        {/* Active Orders Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Field Orders</span>
            <div className="w-8 h-8 rounded-xl bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white tracking-tight">14 Active</div>
            <div className="flex items-center gap-1 text-xs text-sky-400 font-bold mt-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Avg Dispatch ETA: 5.4 mins</span>
            </div>
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">168 Fulfilled Today • 6 Cancelled</div>
        </div>

        {/* Active Partners Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Partners</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white tracking-tight">32 Online</div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
              <span>18 Available • 14 On Task</span>
            </div>
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">Total Roster: 142 Verified Partners</div>
        </div>

        {/* Pending KYC Action Card */}
        <div
          onClick={() => setWebScreen('web-partners')}
          className="bg-neutral-900 border border-neutral-800 hover:border-amber-400/80 rounded-2xl p-4 flex flex-col justify-between transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending KYC Verification</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileCheck className="w-4 h-4 font-black" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white tracking-tight">{pendingKYCCount} Partners</div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
              <span>Manual Service Assignment Needed</span>
            </div>
          </div>
          <div className="text-[11px] text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
            <span>Review & Approve Roster</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* SCREEN 6 REQUIREMENT: Mock Line Chart for "Daily Revenue" & Bar Chart for "Completed vs Cancelled Orders" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Mock Line Chart showing "Daily Revenue" */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Daily Gross Revenue (₹)</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  +34.2% W-o-W
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Past 7-day transaction trajectory across 10 DoNow service verticals
              </p>
            </div>
            <div className="text-right font-mono text-xs text-emerald-400 font-bold">
              ₹48,290 Today
            </div>
          </div>

          {/* Interactive Vector Line Chart */}
          <div className="h-64 relative w-full pt-4">
            <svg className="w-full h-48 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#262626" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#262626" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#262626" strokeDasharray="4 4" />
              <line x1="0" y1="199" x2="600" y2="199" stroke="#333333" />

              {/* Area fill */}
              <path
                d="M 0 160 L 100 125 L 200 145 L 300 95 L 400 70 L 500 30 L 600 55 L 600 200 L 0 200 Z"
                fill="url(#revenueGrad)"
              />

              {/* Trend Line */}
              <path
                d="M 0 160 L 100 125 L 200 145 L 300 95 L 400 70 L 500 30 L 600 55"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Points */}
              {[
                { x: 0, y: 160, val: 32400 },
                { x: 100, y: 125, val: 38900 },
                { x: 200, y: 145, val: 35200 },
                { x: 300, y: 95, val: 42100 },
                { x: 400, y: 70, val: 46800 },
                { x: 500, y: 30, val: 53400 },
                { x: 600, y: 55, val: 48290 },
              ].map((pt, i) => (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={revenueHoveredIndex === i ? 7 : 5}
                    fill="#f59e0b"
                    stroke="#171717"
                    strokeWidth="2.5"
                    className="cursor-pointer transition-all hover:r-8"
                    onMouseEnter={() => setRevenueHoveredIndex(i)}
                    onMouseLeave={() => setRevenueHoveredIndex(null)}
                  />
                  {revenueHoveredIndex === i && (
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      ₹{pt.val.toLocaleString('en-IN')}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-xs text-neutral-400 font-semibold pt-3 px-1 border-t border-neutral-800">
              {revenueData.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setRevenueHoveredIndex(idx)}
                  className={`text-center cursor-pointer transition-colors ${
                    revenueHoveredIndex === idx ? 'text-amber-400 font-bold' : 'hover:text-neutral-200'
                  }`}
                >
                  <div>{d.day}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">₹{(d.revenue / 1000).toFixed(1)}k</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHART 2: Mock Bar Chart for "Completed vs Cancelled Orders" */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Completed vs Cancelled Orders</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-950 text-sky-400 border border-sky-800">
                  96.5% Success
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Comparison showing daily job completion vs cancellation penalties
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-neutral-300 font-medium">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-500" />
                <span className="text-neutral-300 font-medium">Cancelled</span>
              </div>
            </div>
          </div>

          {/* Interactive Vector Bar Chart */}
          <div className="h-64 flex flex-col justify-end pt-4">
            <div className="flex items-end justify-between h-48 px-2 gap-3">
              {ordersComparisonData.map((d, idx) => {
                const maxVal = 200;
                const completedHeight = (d.completed / maxVal) * 100;
                const cancelledHeight = (d.cancelled / maxVal) * 100;
                const isHovered = barHoveredIndex === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setBarHoveredIndex(idx)}
                    onMouseLeave={() => setBarHoveredIndex(null)}
                    className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-1 bg-neutral-950 border border-neutral-700 text-white text-[10px] font-bold p-1.5 rounded-lg shadow-xl pointer-events-none z-20 whitespace-nowrap">
                        {d.day}: {d.completed} Done | {d.cancelled} Cancel
                      </div>
                    )}

                    {/* Dual Bars side-by-side */}
                    <div className="w-full flex items-end justify-center gap-1 h-44">
                      {/* Completed Bar */}
                      <div
                        style={{ height: `${completedHeight}%` }}
                        className={`w-1/2 bg-emerald-500 rounded-t-md transition-all ${
                          isHovered ? 'brightness-125' : 'opacity-90 group-hover:opacity-100'
                        }`}
                      />
                      {/* Cancelled Bar */}
                      <div
                        style={{ height: `${Math.max(cancelledHeight, 6)}%` }}
                        className={`w-1/2 bg-red-500 rounded-t-md transition-all ${
                          isHovered ? 'brightness-125' : 'opacity-90 group-hover:opacity-100'
                        }`}
                      />
                    </div>

                    <span className="text-xs text-neutral-400 font-semibold group-hover:text-white">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom summary bar */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-800">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 882 Total Completed This Week
              </span>
              <span className="text-red-400 font-bold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> 64 Cancelled (Penalty Billed)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Dispatch Hub & City Nodes */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-white">Live Cluster Health Monitor</h3>
            <p className="text-xs text-neutral-400">Hub-level supply & demand balance across Lucknow zones</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            All 5 Clusters Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {[
            { hub: 'Hazratganj / Central', partners: 9, orders: 4, sla: '4.2m', status: 'Normal' },
            { hub: 'Gomti Nagar / Vibhuti', partners: 11, orders: 5, sla: '5.1m', status: 'Normal' },
            { hub: 'Chowk / KGMU Belt', partners: 6, orders: 3, sla: '6.8m', status: 'Surge Active' },
            { hub: 'Alambagh / Airport Rd', partners: 4, orders: 1, sla: '4.5m', status: 'Normal' },
            { hub: 'Indira Nagar / Munshi P.', partners: 2, orders: 1, sla: '7.2m', status: 'Low Supply' },
          ].map((cluster, i) => (
            <div key={i} className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white truncate">{cluster.hub}</span>
              </div>
              <div className="text-[11px] text-neutral-400">
                {cluster.partners} Partners • {cluster.orders} Active
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-850">
                <span className="font-mono text-amber-400">ETA: {cluster.sla}</span>
                <span
                  className={`font-bold ${
                    cluster.status === 'Surge Active'
                      ? 'text-amber-400'
                      : cluster.status === 'Low Supply'
                      ? 'text-red-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {cluster.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
