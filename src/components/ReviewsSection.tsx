import React from 'react';
import { Star, ThumbsUp, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/menuData';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-[#12100E] border-b border-[#28211A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#D99B26]/10 border border-[#D99B26]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#F59E0B] mb-3">
            <Star className="w-4 h-4 fill-current text-[#F59E0B]" />
            <span>{getTranslation(lang, 'reviewsRatingLabel')}</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-[#FFF8E7]">
            {getTranslation(lang, 'reviewsTitle')}
          </h2>
          <p className="text-xs text-[#A89F91] mt-2">
            {getTranslation(lang, 'reviewsSubtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1A1613] border border-[#2B231D] p-5 rounded-2xl flex flex-col justify-between shadow-md relative group hover:border-[#D99B26]/40 transition-all"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F59E0B]" />
                  ))}
                  <span className="text-[10px] text-[#A89F91] ml-2">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-[#C5BCAD] leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Tag */}
              <div className="pt-3 border-t border-[#261F19] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#FFF8E7]">{rev.author}</h4>
                  <span className="text-[10px] text-[#A89F91]">Habitué Rabat</span>
                </div>
                {rev.tag && (
                  <span className="text-[10px] bg-[#28211A] text-[#38BDF8] px-2 py-0.5 rounded-md border border-[#3A2F25]">
                    {rev.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Google Badge Trust Footer */}
        <div className="mt-8 pt-6 border-t border-[#231E19] flex flex-wrap items-center justify-center gap-6 text-xs text-[#A89F91]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D99B26]" />
            <span>{getTranslation(lang, 'googleVerified')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="w-4 h-4 text-[#167D7F]" />
            <span>{getTranslation(lang, 'positivePercentage')}</span>
          </span>
        </div>

      </div>
    </section>
  );
};
