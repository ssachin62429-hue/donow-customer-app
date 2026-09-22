import React, { useState } from 'react';
import {
  HelpCircle,
  MessageCircle,
  Phone,
  ChevronDown,
  ShieldCheck,
  FileText,
  Clock,
  Heart,
  EyeOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const Screen24Support: React.FC = () => {
  const { currentScreen, t, language } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSubTab, setActiveSubTab] = useState<'faq' | 'terms' | 'privacy'>('faq');

  const faqs = [
    {
      q: language === 'hi' ? 'DoNow बिलिंग कैसे काम करती है?' : 'How does DoNow billing work?',
      a:
        language === 'hi'
          ? 'न्यूनतम 30 मिनट की बिलिंग अवधि लागू होती है। 30 मिनट के बाद, आप केवल वास्तविक कार्य किए गए मिनटों का भुगतान करते हैं।'
          : 'A minimum billable duration of 30 minutes applies to all bookings. Beyond 30 minutes, billing is calculated per actual minute worked.',
      icon: Clock,
    },
    {
      q:
        language === 'hi'
          ? 'मुझे पार्टनर का फोन नंबर सीधे क्यों नहीं दिखता?'
          : "Why can't I see partner personal phone numbers?",
      a:
        language === 'hi'
          ? 'गोपनीयता और सुरक्षा के लिए DoNow दोनों पक्षों के नंबर सुरक्षित रखता है। इन-ऐप मास्क कॉलिंग और चैट का उपयोग करें।'
          : 'For privacy and safety, DoNow masks contact details for both customers and partners. All communications are bridged securely inside the app.',
      icon: EyeOff,
    },
    {
      q:
        language === 'hi'
          ? 'यदि पार्टनर समय से पहले आ जाए तो टाइमर कब शुरू होता है?'
          : 'What happens if a partner arrives early?',
      a:
        language === 'hi'
          ? 'यदि पार्टनर 10:00 बजे की बुकिंग के लिए 9:45 बजे पहुंचता है, तो टाइमर 10:00 बजे से पहले शुरू नहीं होगा।'
          : 'The work timer will NOT start before the booked start time. If a partner arrives early, you will not be billed for their waiting time.',
      icon: Clock,
    },
    {
      q: language === 'hi' ? 'टिप कैसे काम करती है?' : 'How do tips work?',
      a:
        language === 'hi'
          ? 'टिप सेवा शुल्क से पूरी तरह अलग है। 100% टिप पार्टनर को सीधे मिलती है (DoNow इस पर कोई कमीशन नहीं लेता)।'
          : 'Tips are 100% passed through to the partner. DoNow charges zero commission on tips.',
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar
        title={
          currentScreen === 'terms'
            ? t('termsItem')
            : currentScreen === 'privacy'
            ? t('privacyItem')
            : t('supportTitle')
        }
        showBack={true}
      />

      <div className="flex-1 p-4 pb-6 overflow-y-auto max-w-lg mx-auto w-full space-y-4">
        {/* Navigation sub-tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-200/80 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('faq')}
            className={`py-2 rounded-lg transition-all ${
              activeSubTab === 'faq' ? 'bg-white text-emerald-800 shadow-xs' : 'text-neutral-600'
            }`}
          >
            FAQ & Help
          </button>
          <button
            onClick={() => setActiveSubTab('terms')}
            className={`py-2 rounded-lg transition-all ${
              activeSubTab === 'terms' ? 'bg-white text-emerald-800 shadow-xs' : 'text-neutral-600'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`py-2 rounded-lg transition-all ${
              activeSubTab === 'privacy' ? 'bg-white text-emerald-800 shadow-xs' : 'text-neutral-600'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {activeSubTab === 'faq' && (
          <div className="space-y-4">
            {/* Direct Support Channels */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                {language === 'hi' ? 'त्वरित सहायता संपर्क' : 'Contact Support'}
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:18001234567"
                  className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200 flex items-center gap-2.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Call Support</div>
                    <div className="text-[10px] text-emerald-700">Toll Free 24x7</div>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => alert('Support chat agent connected! How can we help?')}
                  className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 border border-neutral-200 flex items-center gap-2.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-neutral-700" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Live Chat</div>
                    <div className="text-[10px] text-neutral-500">Wait: &lt; 1 min</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Accordion FAQs */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block px-1">
                Frequently Asked Questions
              </span>

              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const Icon = faq.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-neutral-900">{faq.q}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-emerald-700' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 border-t border-neutral-100 leading-relaxed bg-neutral-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSubTab === 'terms' && (
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3 text-xs text-neutral-700 leading-relaxed">
            <h3 className="text-base font-black text-neutral-900">DoNow Terms of Service</h3>
            <p className="text-[11px] text-neutral-500">Last updated: September 2026</p>

            <h4 className="font-bold text-neutral-900 pt-2">1. Permitted Services Only</h4>
            <p>
              DoNow provides an on-demand marketplace connecting customers with verified partners for legal, physical, non-hazardous human assistance tasks.
            </p>

            <h4 className="font-bold text-neutral-900 pt-2">2. Minimum Duration & Billing</h4>
            <p>
              All service requests have a mandatory minimum billable duration of 30 minutes. After 30 minutes, billing accrues strictly on actual recorded work minutes.
            </p>

            <h4 className="font-bold text-neutral-900 pt-2">3. Partner Waiting & Arrival Rule</h4>
            <p>
              Arrival prior to the scheduled booking time does not initiate billing before the customer's booked start time.
            </p>

            <h4 className="font-bold text-neutral-900 pt-2">4. Platform Commission</h4>
            <p>
              DoNow retains a standard 15% platform fee on service fare. Customer tips are passed 100% to the partner with 0% platform fee.
            </p>
          </div>
        )}

        {activeSubTab === 'privacy' && (
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3 text-xs text-neutral-700 leading-relaxed">
            <h3 className="text-base font-black text-neutral-900">DoNow Privacy Policy</h3>
            <p className="text-[11px] text-neutral-500">Last updated: September 2026</p>

            <h4 className="font-bold text-neutral-900 pt-2">1. Phone Number Masking</h4>
            <p>
              We protect customer and partner personal phone numbers. Calls and messages are bridged via secure masked proxies and in-app channels.
            </p>

            <h4 className="font-bold text-neutral-900 pt-2">2. Location Data</h4>
            <p>
              Location information is used strictly during active matching and order fulfillment to calculate fair billing, navigate partners, and ensure safety.
            </p>

            <h4 className="font-bold text-neutral-900 pt-2">3. Partner Visibility Prior to Booking</h4>
            <p>
              Before an order is confirmed, customers can only see aggregated active partner counts within their area. Individual partner identities and exact GPS coordinates are shielded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
