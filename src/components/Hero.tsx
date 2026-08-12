import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenWhatsApp?: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, lang }) => {
  return (
    <section className="relative bg-[#12100E] border-b border-[#2B231D] overflow-hidden min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-72px)] flex flex-col justify-center items-center py-6 sm:py-12">
      {/* Background Photo Hero with Facade Sign Clearly Visible & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://i.ibb.co/BVmb91NQ/cafecrhero.webp"
          alt="Café Crème Exterior Facade Rabat"
          className="w-full h-full object-cover object-[center_top] sm:object-[center_15%] brightness-100 contrast-[1.02] hero-kenburns"
          referrerPolicy="no-referrer"
        />

        {/* Facade Sign Lighting Up Radial Glow Pulse */}
        <div className="absolute inset-0 hero-facade-glow pointer-events-none" />

        {/* Opening Dim Overlay (Fades out as sign lights up) */}
        <div className="absolute inset-0 bg-[#0A0807] hero-dim-overlay pointer-events-none" />

        {/* Soft gradient overlay: keeps facade clear while ensuring text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/60 via-45% to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/75 via-[#12100E]/35 via-50% to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center flex flex-col items-center justify-center">
        <div className="space-y-4 sm:space-y-6 lg:space-y-7 max-w-2xl mx-auto flex flex-col items-center justify-center">
          
          {/* 1. Eyebrow */}
          <p className="text-[#F59E0B] text-xs sm:text-sm font-extrabold uppercase tracking-widest drop-shadow-md text-center animate-hero-reveal delay-eyebrow">
            {getTranslation(lang, 'heroEyebrow')}
          </p>

          {/* 2. Main Title - Centered & Directly on photo with gold backlight */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight gold-backlit text-center animate-hero-reveal delay-title">
            CAFÉ CRÈME
          </h1>

          {/* 3. Short Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#E2D9CC] font-medium tracking-wide drop-shadow-md text-center animate-hero-reveal delay-subtitle max-w-lg">
            {getTranslation(lang, 'heroSubtitle')}
          </p>

          {/* 4. Single Line Stats */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-[#FFF8E7] drop-shadow-lg pt-1 animate-hero-reveal delay-stats">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#F59E0B] shrink-0" />
            <span className="text-[#F59E0B] font-extrabold text-base sm:text-lg">4,8</span>
            <span className="text-[#A89F91]">•</span>
            <span>{getTranslation(lang, 'heroStatsSingleLine')}</span>
          </div>

          {/* 5. Testimonial Snippet */}
          <p className="text-xs sm:text-sm text-[#FFF8E7] italic font-medium leading-snug drop-shadow-md text-center animate-hero-reveal delay-quote max-w-md pt-3 sm:pt-4">
            {getTranslation(lang, 'heroQuoteText')}
            <span className="text-[#C5BCAD] not-italic font-normal text-xs ml-1.5 block sm:inline mt-0.5 sm:mt-0">
              {getTranslation(lang, 'heroQuoteSource')}
            </span>
          </p>

          {/* 6. Single CTA Button - "Découvrir la Carte →" */}
          <div className="flex items-center justify-center pt-2 sm:pt-3 animate-hero-reveal delay-cta">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D99B26] to-[#C88300] hover:from-[#E6A100] hover:to-[#D99B26] text-[#12100E] font-extrabold px-8 py-4 rounded-xl shadow-2xl transition-all active:scale-95 group text-sm sm:text-base"
            >
              <span>{getTranslation(lang, 'discoverMenuBtn')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 7. Low-weight Functional Status Line */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#E2D9CC] drop-shadow-md animate-hero-reveal delay-bottom">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{getTranslation(lang, 'heroBadgeHours')}</span>
          </div>

        </div>
      </div>
    </section>
  );
};
