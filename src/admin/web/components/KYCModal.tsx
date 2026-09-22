import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  CheckSquare,
  Square,
  AlertCircle,
  ExternalLink,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminPartner } from '../../types';

interface KYCModalProps {
  partner: AdminPartner;
  onClose: () => void;
}

export const KYCModal: React.FC<KYCModalProps> = ({ partner, onClose }) => {
  const { servicesPricing, approvePartnerKYC } = useAdmin();

  // Initially selected services (or default to 2-3 standard services)
  const [selectedServices, setSelectedServices] = useState<string[]>(
    partner.assignedServices.length > 0
      ? partner.assignedServices
      : ['hospital-assistance', 'shopping-assistance', 'queue-waiter']
  );

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleApprove = () => {
    approvePartnerKYC(partner.id, selectedServices);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={partner.photoUrl}
              alt={partner.name}
              className="w-14 h-14 rounded-2xl border-2 border-amber-400 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">{partner.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {partner.status} Verification
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                <span className="font-mono text-neutral-200">{partner.mobile}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {partner.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" /> Submitted: {partner.kycSubmittedAt}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCREEN 7 REQUIREMENT: Display Mock Aadhar/PAN placeholders */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Identity Verification Documents</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Digilocker OCR Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Mock Aadhaar Card Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white">Aadhaar Card</span>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  PASS
                </span>
              </div>
              <div className="font-mono text-xs text-amber-400 font-bold bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                Number: {partner.aadharNumber}
              </div>
              {/* Document Graphic Mock */}
              <div className="h-20 bg-neutral-900/90 rounded-xl border border-dashed border-neutral-700 flex flex-col items-center justify-center text-center p-2 text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-300">Government of India — UIDAI</span>
                <span className="text-[10px] text-neutral-500">Biometric & Address Record Match 100%</span>
              </div>
            </div>

            {/* Mock PAN Card Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white">Income Tax PAN Card</span>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  PASS
                </span>
              </div>
              <div className="font-mono text-xs text-amber-400 font-bold bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                PAN: {partner.panNumber}
              </div>
              {/* Document Graphic Mock */}
              <div className="h-20 bg-neutral-900/90 rounded-xl border border-dashed border-neutral-700 flex flex-col items-center justify-center text-center p-2 text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-300">Income Tax Department</span>
                <span className="text-[10px] text-neutral-500">Tax Deductible TDS Account Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* SCREEN 7 REQUIREMENT: CHECKBOX LIST for Admin to manually assign eligible services */}
        {/* (e.g. [x] Hospital Assistance, [ ] Skilled Help, [x] Queue Waiter) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Service Eligibility Assignment</span>
              </span>
              <p className="text-[11px] text-neutral-400">
                Strict marketplace rule: Partners cannot self-select services. Admin grants eligibility.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400">
              {selectedServices.length} of {servicesPricing.length} Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 bg-neutral-950 rounded-2xl border border-neutral-800">
            {servicesPricing.map((service) => {
              const isChecked = selectedServices.includes(service.id);

              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                    isChecked
                      ? 'bg-amber-950/40 border-amber-500/60 text-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-600 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold leading-tight">{service.nameEn}</div>
                      <div className="text-[10px] text-neutral-500">₹{service.baseRate}/min • Min ₹{service.minAmount}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isChecked ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {isChecked ? 'ASSIGNED' : 'EXCLUDED'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SCREEN 7 REQUIREMENT: Button: [APPROVE & ACTIVATE PARTNER] */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <div className="text-[11px] text-neutral-400">
            Clicking activate triggers instant SMS & WhatsApp onboarding dispatch pass.
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleApprove}
              disabled={selectedServices.length === 0}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>APPROVE & ACTIVATE PARTNER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
