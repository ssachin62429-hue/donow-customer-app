import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { HelpCircle, ArrowLeft, Camera, CheckCircle2, Send, AlertTriangle } from 'lucide-react';

export const Screen15SupportTicket: React.FC = () => {
  const { navigate, t } = usePartner();
  const [category, setCategory] = useState<'cash' | 'behaviour' | 'app'>('cash');
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-home')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
            24x7 Partner Care
          </span>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4">
            <div>
              <h2 className="text-2xl font-black text-neutral-950">
                {t('supportTitle')}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {t('supportSubtitle')}
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-neutral-700 tracking-wide">
                {t('issueCategoryLabel')}
              </label>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setCategory('cash')}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between ${
                    category === 'cash'
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{t('catCash')}</span>
                  {category === 'cash' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('behaviour')}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between ${
                    category === 'behaviour'
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{t('catBehaviour')}</span>
                  {category === 'behaviour' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('app')}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between ${
                    category === 'app'
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{t('catApp')}</span>
                  {category === 'app' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>

            {/* Description Text Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-neutral-700 tracking-wide">
                {t('describeIssueLabel')}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('describePlaceholder')}
                required
                className="w-full p-3 rounded-xl border-2 border-neutral-800 text-xs font-medium text-neutral-900 bg-neutral-50 focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-neutral-700 tracking-wide">
                {t('attachPhotoLabel')}
              </label>
              <div
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`p-3.5 rounded-xl border-2 border-dashed flex items-center justify-between cursor-pointer transition-colors ${
                  hasPhoto
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs font-bold">
                  <Camera className="w-4 h-4" />
                  <span>{hasPhoto ? 'Photo Attached (evidence.jpg)' : 'Tap to attach photo / receipt'}</span>
                </div>
                {hasPhoto && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 text-white font-bold rounded-2xl text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>{t('submitTicketBtn')}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="my-auto text-center space-y-5 py-10">
            <div className="w-20 h-20 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center border-2 border-emerald-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-neutral-950">
                Ticket Created
              </h3>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
                {t('ticketSuccessMsg')}
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-left text-xs space-y-1 max-w-sm mx-auto">
              <span className="font-bold text-neutral-500 uppercase text-[10px]">Reference Number</span>
              <p className="font-mono font-black text-sm text-neutral-900">#DN-PT-8832</p>
              <p className="text-[11px] text-neutral-600">Assigned Agent: Senior Partner Executive</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('partner-home')}
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 text-white font-bold rounded-2xl text-sm transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
