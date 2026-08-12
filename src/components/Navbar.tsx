import React from 'react';
import { ShoppingBag, MapPin, Clock, Star, Phone, Search } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface NavbarProps {
  cartCount: number;
  cartTotalMAD: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  lang: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotalMAD,
  onOpenCart,
  searchQuery,
  onSearchChange,
  lang,
  onSelectLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#12100E]/95 backdrop-blur-md border-b border-[#2A241F]">
      {/* Top Banner Info Bar */}
      <div className="bg-[#1A1715] text-xs text-[#C5BCAD] py-1.5 px-4 border-b border-[#231E19] hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-[#D99B26]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'address')}</span>
            </span>
            <span className="text-[#38BDF8] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'hours')}</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 bg-[#D99B26]/10 text-[#F59E0B] px-2 py-0.5 rounded-full border border-[#D99B26]/30 font-semibold">
              <Star className="w-3 h-3 fill-current text-[#F59E0B]" />
              <span>{getTranslation(lang, 'googleRating')}</span>
            </span>
            <span className="text-[#A89F91]">{getTranslation(lang, 'bistroTagline')}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Text (No CC Badge Logo) */}
        <a href="#" className="flex items-center group shrink-0">
          <div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider gold-backlit block leading-none">
              CAFÉ CRÈME
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D99B26] font-bold block mt-0.5">
              {getTranslation(lang, 'locationSubtitle')}
            </span>
          </div>
        </a>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xs mx-4 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8273]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={getTranslation(lang, 'searchPlaceholder')}
            className="w-full bg-[#1C1815] border border-[#3A322A] focus:border-[#D99B26] text-xs text-[#F3EFE6] placeholder-[#8C8273] pl-9 pr-3 py-2 rounded-full outline-none transition-colors"
          />
        </div>

        {/* Action Buttons: Language Switcher + WhatsApp + Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Pills */}
          <div className="flex items-center bg-[#1C1815] border border-[#3A322A] rounded-full p-0.5 shadow-inner">
            {(['fr', 'en', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onSelectLanguage(l)}
                className={`px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full transition-all uppercase ${
                  lang === l
                    ? 'bg-[#D99B26] text-[#12100E] shadow-sm'
                    : 'text-[#D99B26]/60 hover:text-[#D99B26]'
                }`}
                title={`Passer en ${l.toUpperCase()}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Quick WhatsApp Contact (Desktop) */}
          <a
            href="https://wa.me/?text=Bonjour%20Caf%C3%A9%20Cr%C3%A8me%20Rabat!%20Je%20souhaite%20des%20informations."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-[#167D7F]/20 hover:bg-[#167D7F]/30 text-[#38BDF8] border border-[#167D7F]/40 rounded-xl text-xs font-semibold transition-all"
            title="Contacter sur WhatsApp"
          >
            <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{getTranslation(lang, 'whatsappBtn')}</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-[#D99B26] to-[#C88300] hover:from-[#E6A100] hover:to-[#D99B26] text-[#12100E] font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs shadow-md transition-all active:scale-95 shrink-0"
            aria-label="Voir le panier"
          >
            <ShoppingBag className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">{getTranslation(lang, 'cartBtn')}</span>
            {cartCount > 0 ? (
              <span className="bg-[#12100E] text-[#F59E0B] font-bold text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full border border-[#F59E0B]/30">
                {cartCount} ({cartTotalMAD} MAD)
              </span>
            ) : (
              <span className="text-[10px] sm:text-[11px] opacity-80">(0)</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
