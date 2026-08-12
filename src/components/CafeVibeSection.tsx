import React from 'react';
import { Coffee, Sparkles, HeartHandshake } from 'lucide-react';
import interiorImg from '../assets/images/cafe_creme_interior_1786534550115.jpg';
import tajineImg from '../assets/images/moroccan_brunch_tajine_1786534563930.jpg';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface CafeVibeSectionProps {
  lang: Language;
}

export const CafeVibeSection: React.FC<CafeVibeSectionProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-[#161310] border-t border-b border-[#2A231C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#D99B26]">
            {getTranslation(lang, 'vibeBadge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF8E7] mt-1.5 gold-backlit">
            {getTranslation(lang, 'vibeTitle')}
          </h2>
          <p className="text-sm text-[#A89F91] mt-3 leading-relaxed">
            {getTranslation(lang, 'vibeDesc')}
          </p>
        </div>

        {/* Feature Grid with Images & Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left Image Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-[#3D332A] shadow-2xl group">
            <img
              src={interiorImg}
              alt="Café Crème Interior Rabat Chess Table Mug Wall"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 bg-[#1A1715]/90 backdrop-blur-md p-4 rounded-xl border border-[#382E25]">
              <span className="text-[10px] text-[#D99B26] font-bold uppercase tracking-wider block">
                {getTranslation(lang, 'mugWallTag')}
              </span>
              <p className="text-xs text-[#FFF8E7] font-semibold mt-0.5">
                {getTranslation(lang, 'mugWallDesc')}
              </p>
            </div>
          </div>

          {/* Right Cards Stack */}
          <div className="space-y-4">
            <div className="bg-[#1C1815] p-5 rounded-2xl border border-[#2F2720] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#28211A] border border-[#3A2F25] text-[#F59E0B] shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#FFF8E7]">{getTranslation(lang, 'cardMugTitle')}</h3>
                <p className="text-xs text-[#A89F91] mt-1 leading-relaxed">
                  {getTranslation(lang, 'cardMugDesc')}
                </p>
              </div>
            </div>

            <div className="bg-[#1C1815] p-5 rounded-2xl border border-[#2F2720] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#28211A] border border-[#3A2F25] text-[#38BDF8] shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#FFF8E7]">{getTranslation(lang, 'cardChessTitle')}</h3>
                <p className="text-xs text-[#A89F91] mt-1 leading-relaxed">
                  {getTranslation(lang, 'cardChessDesc')}
                </p>
              </div>
            </div>

            <div className="bg-[#1C1815] p-5 rounded-2xl border border-[#2F2720] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#28211A] border border-[#3A2F25] text-[#167D7F] shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#FFF8E7]">{getTranslation(lang, 'cardFreshTitle')}</h3>
                <p className="text-xs text-[#A89F91] mt-1 leading-relaxed">
                  {getTranslation(lang, 'cardFreshDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Image Feature — Moroccan Brunch Tajine */}
        <div className="bg-[#1C1815] border border-[#3D332A] rounded-2xl overflow-hidden p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D99B26]">
              {getTranslation(lang, 'khliiBrunchLabel')}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF8E7]">
              {getTranslation(lang, 'khliiBrunchTitle')}
            </h3>
            <p className="text-xs text-[#C5BCAD] leading-relaxed">
              {getTranslation(lang, 'khliiBrunchDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="bg-[#28211A] text-[#F59E0B] px-3 py-1 rounded-full border border-[#3D332A] font-semibold">
                {getTranslation(lang, 'khliiTag1')}
              </span>
              <span className="bg-[#28211A] text-[#F59E0B] px-3 py-1 rounded-full border border-[#3D332A] font-semibold">
                {getTranslation(lang, 'khliiTag2')}
              </span>
              <span className="bg-[#28211A] text-[#F59E0B] px-3 py-1 rounded-full border border-[#3D332A] font-semibold">
                {getTranslation(lang, 'khliiTag3')}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#3D332A]">
            <img
              src={tajineImg}
              alt="Moroccan Brunch Khlii Tajine Cafe Creme"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
