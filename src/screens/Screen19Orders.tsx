import React, { useState } from 'react';
import { MapPin, Calendar, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { BottomNav } from '../components/BottomNav';
import { Order, OrderStatus } from '../types';

export const Screen19Orders: React.FC = () => {
  const { orders, setSelectedOrderForDetails, navigate, t, language } = useApp();
  const [selectedTab, setSelectedTab] = useState<OrderStatus>('completed');

  const filteredOrders = orders.filter((o) => o.status === selectedTab);

  const tabs: { id: OrderStatus; label: string }[] = [
    { id: 'upcoming', label: t('tabUpcoming') },
    { id: 'active', label: t('tabActive') },
    { id: 'completed', label: t('tabCompleted') },
    { id: 'cancelled', label: t('tabCancelled') },
  ];

  const handleOrderClick = (order: Order) => {
    setSelectedOrderForDetails(order);
    navigate('order-details');
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('ordersTitle')} showBack={false} />

      <div className="flex-1 flex flex-col overflow-hidden max-w-lg mx-auto w-full">
        {/* Status Tabs Header */}
        <div className="px-4 pt-3 pb-2 bg-white border-b border-neutral-200/80">
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-neutral-100">
            {tabs.map((tab) => {
              const isActive = selectedTab === tab.id;
              const count = orders.filter((o) => o.status === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold transition-all truncate text-center ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  {count > 0 && (
                    <span
                      className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-neutral-500">
                {t('noOrdersInTab')}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleOrderClick(order)}
                className="bg-white p-4 rounded-2xl border border-neutral-200 hover:border-emerald-600 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-neutral-400">
                        {order.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'active'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-neutral-900 mt-1 group-hover:text-emerald-800 transition-colors">
                      {order.serviceName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black font-mono text-neutral-900">
                      ₹{order.finalAmount}
                    </span>
                    <div className="text-[10px] text-neutral-400 font-medium">
                      {order.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{order.locationName}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{order.date} • {order.scheduledTimeRange}</span>
                    </div>

                    <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
