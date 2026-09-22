import React, { useState } from 'react';
import { Star, User, ArrowRight, ThumbsUp, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { DEMO_PARTNER } from '../data/mockRepository';

export const Screen18RatePartner: React.FC = () => {
  const { selectedOrderForDetails, handleSubmitRating, t, language } = useApp();

  const partner = selectedOrderForDetails?.partner || DEMO_PARTNER;
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Polite']);

  const quickTags = [
    { en: 'Punctual & Fast', hi: 'समय के पाबंद' },
    { en: 'Polite & Respectful', hi: 'विनम्र एवं आदरणीय' },
    { en: 'Careful Handling', hi: 'सावधानीपूर्वक कार्य' },
    { en: 'Queue Expert', hi: 'कतार में मददगार' },
    { en: 'Helpful & Patient', hi: 'धैर्यवान व सहायक' },
  ];

  const toggleTag = (tagEn: string) => {
    if (selectedTags.includes(tagEn)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagEn));
    } else {
      setSelectedTags([...selectedTags, tagEn]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitRating(rating, review || selectedTags.join(', '));
  };

  return (
    <div className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
      <HeaderBar title={t('rateTitle')} showBack={false} />

      <div className="flex-1 p-5 pb-6 overflow-y-auto max-w-lg mx-auto w-full flex flex-col justify-between space-y-4">
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Partner Photo & Name */}
          <div className="text-center pt-2">
            <div className="w-20 h-20 rounded-full bg-neutral-200 border-4 border-white shadow-md mx-auto mb-3 flex items-center justify-center overflow-hidden">
              <User className="w-10 h-10 text-neutral-400" />
            </div>
            <h2 className="text-xl font-black text-neutral-900">
              {partner.name}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {t('rateSub')} {partner.name}?
            </p>
          </div>

          {/* 5-Star Interactive Rating Control */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= rating;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-neutral-300 hover:scale-110 transition-transform active:scale-95"
                  >
                    <Star
                      className={`w-9 h-9 transition-colors ${
                        isFilled
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-neutral-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold text-neutral-700">
              {rating === 5 && '★★★★★ Outstanding assistance!'}
              {rating === 4 && '★★★★ Very good service'}
              {rating === 3 && '★★★ Average experience'}
              {rating <= 2 && '★★ Needs improvement'}
            </div>
          </div>

          {/* Quick Feedback Tags */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              What went well?
            </span>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.en);
                return (
                  <button
                    key={tag.en}
                    type="button"
                    onClick={() => toggleTag(tag.en)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all border ${
                      isSelected
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {language === 'hi' ? tag.hi : tag.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Review Textbox */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
              {t('optionalReviewLabel')}
            </label>
            <textarea
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={t('reviewPlaceholder')}
              className="w-full text-xs p-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white resize-none"
            />
          </div>
        </form>

        {/* Submit Button */}
        <div className="pt-4 pb-2">
          <button
            onClick={onSubmit}
            className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{t('submit')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
