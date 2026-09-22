import React, { useState } from 'react';
import {
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Send,
  User,
  Clock,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminTicket } from '../../types';

export const MobScreen05Tickets: React.FC = () => {
  const { tickets, selectedTicket, setSelectedTicket, sendMessageToTicket, resolveTicket } = useAdmin();
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Waiting' | 'Resolved'>('All');

  const filteredTickets = tickets.filter((t) => {
    if (activeTab === 'Waiting') return t.status === 'WAITING FOR ADMIN';
    if (activeTab === 'Resolved') return t.status === 'RESOLVED';
    return true;
  });

  const currentTicket: AdminTicket | undefined = selectedTicket || filteredTickets[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentTicket) return;
    sendMessageToTicket(currentTicket.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-black text-white">Support & Dispute Tickets</h1>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
            {tickets.filter((t) => t.status === 'WAITING FOR ADMIN').length} Waiting
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-3">
          {(['All', 'Waiting', 'Resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                activeTab === tab
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Ticket Selector Horizontal / Compact Carousel */}
        <div className="p-3 border-b border-neutral-850 bg-neutral-900/30 overflow-x-auto flex gap-2">
          {filteredTickets.map((ticket) => {
            const isSelected = currentTicket?.id === ticket.id;
            return (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`shrink-0 text-left p-2.5 rounded-xl border transition-all max-w-[220px] ${
                  isSelected
                    ? 'bg-neutral-850 border-amber-400 shadow-md'
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400">{ticket.id}</span>
                  {/* SCREEN 5 REQUIREMENT: Tag: [WAITING FOR ADMIN] */}
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                      ticket.status === 'WAITING FOR ADMIN'
                        ? 'bg-amber-400 text-neutral-950'
                        : ticket.status === 'RESOLVED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-sky-950 text-sky-400 border border-sky-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{ticket.tag}</div>
                <div className="text-[10px] text-neutral-400 truncate">{ticket.customerName} vs {ticket.partnerName}</div>
              </button>
            );
          })}
        </div>

        {/* SCREEN 5 REQUIREMENT: Chat UI preview to message the partner/customer */}
        {currentTicket ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
            {/* Chat Header */}
            <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white">{currentTicket.subject}</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded">
                    {currentTicket.orderId}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Parties: <strong className="text-neutral-200">{currentTicket.partnerName}</strong> (Partner) &{' '}
                  <strong className="text-neutral-200">{currentTicket.customerName}</strong> (Customer)
                </p>
              </div>

              {currentTicket.status !== 'RESOLVED' && (
                <button
                  onClick={() => resolveTicket(currentTicket.id)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg shrink-0 transition-colors"
                >
                  Resolve
                </button>
              )}
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentTicket.messages.map((msg) => {
                const isAdmin = msg.sender === 'admin';
                const isPartner = msg.sender === 'partner';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-bold text-neutral-400">
                        {msg.senderName}
                      </span>
                      <span className="text-[9px] text-neutral-500">{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-medium shadow-sm leading-relaxed ${
                        isAdmin
                          ? 'bg-amber-500 text-neutral-950 font-semibold rounded-tr-none'
                          : isPartner
                          ? 'bg-neutral-850 text-neutral-100 border border-neutral-700 rounded-tl-none'
                          : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Admin Message Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type official admin decision / note..."
                className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-hidden"
              />
              <button
                type="submit"
                className="p-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 rounded-xl font-bold transition-all shadow-md shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-neutral-500 text-xs">
            Select a ticket from the queue above to open the dispute chat stream.
          </div>
        )}
      </div>
    </div>
  );
};
