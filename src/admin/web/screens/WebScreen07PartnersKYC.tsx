import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  Unlock,
  Eye,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminPartner } from '../../types';
import { KYCModal } from '../components/KYCModal';

export const WebScreen07PartnersKYC: React.FC = () => {
  const {
    partners,
    selectedPartnerForKYC,
    setSelectedPartnerForKYC,
    togglePartnerLock,
    servicesPricing,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Active' | 'Locked'>('All');

  const filteredPartners = partners.filter((partner) => {
    if (statusFilter !== 'All' && partner.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        partner.name.toLowerCase().includes(q) ||
        partner.mobile.includes(q) ||
        partner.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getServiceName = (id: string) => {
    const s = servicesPricing.find((svc) => svc.id === id);
    return s ? s.nameEn : id;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title & Action Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Partner Management & KYC Onboarding</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {partners.filter((p) => p.status === 'Pending').length} Pending Approval
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Review identity documents and manually assign service eligibility. Partners cannot self-select services.
          </p>
        </div>

        {/* Global summary count badges */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-400">Active:</span>
            <span className="font-bold text-white">
              {partners.filter((p) => p.status === 'Active').length}
            </span>
          </div>

          <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-neutral-400">Pending:</span>
            <span className="font-bold text-white">
              {partners.filter((p) => p.status === 'Pending').length}
            </span>
          </div>

          <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-neutral-400">Locked:</span>
            <span className="font-bold text-white">
              {partners.filter((p) => p.status === 'Locked').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full md:w-80 flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone or city..."
            className="w-full bg-transparent text-xs text-white placeholder-neutral-500 outline-hidden"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          {(['All', 'Pending', 'Active', 'Locked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === tab
                  ? 'bg-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/10'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SCREEN 7 REQUIREMENT: Data Table */}
      {/* Columns: Partner Name, Mobile, Status (Pending, Active, Locked), Action */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-extrabold tracking-wider uppercase text-[10px]">
                <th className="py-3.5 px-4">Partner Name</th>
                <th className="py-3.5 px-4">Mobile</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned Services</th>
                <th className="py-3.5 px-4">Performance / City</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredPartners.map((partner) => {
                const isPending = partner.status === 'Pending';
                const isLocked = partner.status === 'Locked';
                const isActive = partner.status === 'Active';

                return (
                  <tr
                    key={partner.id}
                    className="hover:bg-neutral-850/60 transition-colors group"
                  >
                    {/* Partner Name Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={partner.photoUrl}
                          alt={partner.name}
                          className="w-9 h-9 rounded-xl border border-neutral-700 object-cover shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{partner.name}</span>
                            <span className="font-mono text-[10px] text-neutral-500">
                              ({partner.id})
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-neutral-500" />
                            <span>{partner.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Mobile Column */}
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-300">
                      {partner.mobile}
                    </td>

                    {/* Status Column: (Pending, Active, Locked) */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                          isActive
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : isPending
                            ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive
                              ? 'bg-emerald-400'
                              : isPending
                              ? 'bg-amber-400'
                              : 'bg-red-400'
                          }`}
                        />
                        <span>{partner.status}</span>
                      </span>
                    </td>

                    {/* Assigned Services Column */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {partner.assignedServices.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {partner.assignedServices.slice(0, 2).map((srvId) => (
                            <span
                              key={srvId}
                              className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-medium"
                            >
                              {getServiceName(srvId)}
                            </span>
                          ))}
                          {partner.assignedServices.length > 2 && (
                            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400 text-[10px] font-bold">
                              +{partner.assignedServices.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-neutral-500 italic text-[11px]">
                          None Assigned (Requires Admin KYC)
                        </span>
                      )}
                    </td>

                    {/* Performance / City Column */}
                    <td className="py-3.5 px-4">
                      {isActive ? (
                        <div>
                          <div className="font-bold text-amber-400">★ {partner.rating} / 5.0</div>
                          <div className="text-[10px] text-neutral-400">
                            {partner.totalOrders} tasks completed
                          </div>
                        </div>
                      ) : isPending ? (
                        <span className="text-[11px] text-neutral-400">
                          Submitted: {partner.kycSubmittedAt.split(' ')[0]}
                        </span>
                      ) : (
                        <span className="text-[11px] text-red-400 font-bold">
                          Commission Lock (Overdue)
                        </span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isPending ? (
                          <button
                            onClick={() => setSelectedPartnerForKYC(partner)}
                            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Verify KYC & Assign</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => setSelectedPartnerForKYC(partner)}
                              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                              title="View KYC & Modify Services"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => togglePartnerLock(partner.id)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1 ${
                                isLocked
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-red-400'
                              }`}
                              title={isLocked ? 'Unlock Partner' : 'Lock Partner'}
                            >
                              {isLocked ? (
                                <>
                                  <Unlock className="w-3.5 h-3.5" />
                                  <span>Unlock</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Lock</span>
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCREEN 7 REQUIREMENT: KYC Detail Modal Rendered when a partner is selected */}
      {selectedPartnerForKYC && (
        <KYCModal
          partner={selectedPartnerForKYC}
          onClose={() => setSelectedPartnerForKYC(null)}
        />
      )}
    </div>
  );
};
