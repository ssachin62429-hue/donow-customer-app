import React from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Star,
  Award,
  ShieldCheck,
  HelpCircle,
  Phone,
  MessageSquare,
  Receipt,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { DEMO_PARTNER, MOCK_ORDERS } from '../data/mockRepository';

export const Screen20OrderDetails: React.FC = () => {
  const { selectedOrderForDetails, navigate, setIsCallingOpen, setIsChatOpen, t, language } = useApp();

  const order = selectedOrderForDetails || MOCK_ORDERS[0];
  const partner = order.partner || DEMO_PARTNER;

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('orderDetailsTitle')} showBack={true} />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Top Order ID & Status Header */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              {t('bookingIdLabel')}
            </span>
            <span className="text-base font-black font-mono text-neutral-900">
              {order.id}
            </span>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              order.status === 'completed'
                ? 'bg-emerald-100 text-emerald-800'
                : order.status === 'active'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-neutral-100 text-neutral-800'
            }`}
          >
            {order.status.toUpperCase()}
          </span>
        </div>

        {/* Assigned Partner Details */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
            {t('assignedPartnerLabel')}
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 border border-neutral-200">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-neutral-900">
                  {partner.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{partner.rating}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-neutral-700">
                    <Award className="w-3 h-3 text-amber-600" />
                    <span>{partner.performanceBadge}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact buttons if active */}
            {order.status === 'active' && (
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsCallingOpen(true)}
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="p-2 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Service & Schedule Details */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3 text-xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
            Task Information
          </span>

          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-neutral-500 font-medium">Service</span>
              <span className="font-black text-neutral-900">{order.serviceName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500 font-medium">Date & Time</span>
              <span className="font-semibold text-neutral-800">
                {order.date} • {order.scheduledTimeRange}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500 font-medium">Actual Duration</span>
              <span className="font-mono font-bold text-neutral-900">
                {order.actualDurationMins || order.expectedDurationMins} mins ({((order.actualDurationMins || order.expectedDurationMins) / 60).toFixed(1).replace('.0', '')} hrs)
              </span>
            </div>

            <div className="flex justify-between items-start pt-1">
              <span className="text-neutral-500 font-medium shrink-0">Location</span>
              <span className="font-medium text-neutral-800 text-right max-w-[220px]">
                {order.locationName}
              </span>
            </div>
          </div>
        </div>

        {/* Fare & Bill Breakdown */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3 text-xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
            Payment & Bill Breakdown
          </span>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">Base Service Fare ({order.actualDurationMins || order.expectedDurationMins}m @ ₹{order.ratePerMin}/m)</span>
              <span className="font-mono font-bold text-neutral-800">₹{order.baseFare}</span>
            </div>

            <div className="flex justify-between text-emerald-800">
              <span>Partner Tip</span>
              <span className="font-mono font-bold">₹{order.tipAmount}</span>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex justify-between items-center">
              <div>
                <span className="font-black text-neutral-900 text-sm block">Total Paid</span>
                <span className="text-[10px] text-neutral-400">Method: {order.paymentMethod}</span>
              </div>
              <span className="text-xl font-black font-mono text-emerald-800">
                ₹{order.finalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Support Action Button */}
        <div className="pt-2">
          <button
            onClick={() => navigate('support')}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-xs border border-neutral-300 flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-neutral-600" />
            <span>{t('supportBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
