import React from 'react';
import { MapPin, Clock, Star, MessageSquare, ArrowUpRight } from 'lucide-react';
import { CategoryId, Language } from '../types';
import { getTranslation } from '../translations';

interface FooterProps {
  onSelectCategory: (cat: CategoryId | 'all') => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, lang }) => {
  return (
    <footer className="bg-[#0D0B0A] text-[#C5BCAD] border-t border-[#231E19] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <div>
                <span className="font-display text-2xl font-bold tracking-wider gold-backlit block leading-none">
                  CAFÉ CRÈME
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#D99B26] font-bold block mt-0.5">
                  {getTranslation(lang, 'locationSubtitle')}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9E9587] leading-relaxed">
              {getTranslation(lang, 'heroTagline')}
            </p>

            <div className="flex items-center gap-2">
              <span className="bg-[#D99B26]/10 text-[#F59E0B] px-2.5 py-1 rounded-full border border-[#D99B26]/30 font-bold flex items-center gap-1 text-[11px]">
                <Star className="w-3 h-3 fill-current" />
                <span>{getTranslation(lang, 'googleRating')}</span>
              </span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FFF8E7] uppercase tracking-wider">
              {getTranslation(lang, 'footerNavTitle')}
            </h4>
            <ul className="space-y-2 text-[#9E9587]">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {getTranslation(lang, 'footerAllArticles')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('drinks')}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {getTranslation(lang, 'footerDrinks')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('smoothies')}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {getTranslation(lang, 'footerSmoothies')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('brunch')}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {getTranslation(lang, 'footerBrunch')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('burgers')}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {getTranslation(lang, 'footerBurgers')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('crepes')}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {getTranslation(lang, 'footerCrepes')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-5 space-y-3 bg-[#13100E] p-5 rounded-2xl border border-[#231E19]">
            <h4 className="text-xs font-bold text-[#FFF8E7] uppercase tracking-wider">
              {getTranslation(lang, 'footerInfoTitle')}
            </h4>

            <div className="space-y-2.5 text-[#C5BCAD]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">{getTranslation(lang, 'footerAddressHeader')}</span>
                  <span className="text-[11px] text-[#9E9587]">
                    {getTranslation(lang, 'address')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <div>
                  <span className="font-semibold text-white">{getTranslation(lang, 'footerHoursHeader')}</span>{' '}
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {getTranslation(lang, 'footerHoursValue')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://wa.me/?text=Bonjour%20Caf%C3%A9%20Cr%C3%A8me%20Rabat!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#167D7F] hover:bg-[#0E6062] text-white px-4 py-2 rounded-xl font-bold transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{getTranslation(lang, 'orderWhatsAppBtn')}</span>
                </a>

                <a
                  href="https://maps.google.com/?q=16+Rue+Aguelmane+Sidi+Ali+Rabat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#231E19] hover:bg-[#2F2720] text-[#E2D9CC] px-3 py-2 rounded-xl font-medium transition-all"
                >
                  <span>{getTranslation(lang, 'footerGoogleMaps')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1C1815] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#786F63]">
          <p>© {new Date().getFullYear()} {getTranslation(lang, 'copyright')}</p>
          <p>16 Rue Aguelmane Sidi Ali, Agdal Rabat • Rating 4.8★</p>
        </div>

      </div>
    </footer>
  );
};
