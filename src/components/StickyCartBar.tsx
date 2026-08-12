import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Check, X } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface StickyCartBarProps {
  cartCount: number;
  cartTotalMAD: number;
  onOpenCart: () => void;
  onClearCart: () => void;
  lang: Language;
}

export const StickyCartBar: React.FC<StickyCartBarProps> = ({
  cartCount,
  cartTotalMAD,
  onOpenCart,
  onClearCart,
  lang,
}) => {
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  if (cartCount <= 0) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-auto sm:right-6 sm:w-[440px] z-40 animate-slide-up">
      <div
        onClick={onOpenCart}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenCart()}
        className="w-full bg-gradient-to-r from-[#1C140D]/95 via-[#231A12]/95 to-[#1C140D]/95 border border-[#D99B26]/60 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex items-center justify-between gap-2.5 text-[#FFF8E7] cursor-pointer hover:border-[#F59E0B] transition-all group active:scale-[0.98]"
      >
        {/* Left Section: Trash Icon / Confirm Mode + Bag & Price */}
        {showConfirmClear ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-rose-950/80 border border-rose-500/50 rounded-xl px-2.5 py-1.5 text-xs animate-fadeIn"
          >
            <span className="text-rose-200 font-semibold text-[11px]">
              {getTranslation(lang, 'clearCartConfirm')}
            </span>
            <button
              type="button"
              onClick={() => {
                onClearCart();
                setShowConfirmClear(false);
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-2 py-0.5 rounded-md text-[11px] flex items-center gap-0.5 transition-colors"
              title={getTranslation(lang, 'clearCartConfirmBtn')}
            >
              <Check className="w-3 h-3" />
              <span>{getTranslation(lang, 'clearCartConfirmBtn')}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmClear(false)}
              className="bg-white/10 hover:bg-white/20 text-gray-300 p-1 rounded-md transition-colors"
              title={getTranslation(lang, 'clearCartCancelBtn')}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            {/* Trash Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmClear(true);
              }}
              className="p-2 rounded-xl text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all shrink-0"
              title={getTranslation(lang, 'clearCartBtn')}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Cart Icon & Badge */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#D99B26]/20 border border-[#D99B26]/40 text-[#F59E0B] shrink-0">
              <ShoppingBag className="w-4.5 h-4.5" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-[#12100E] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-bounce-subtle">
                {cartCount}
              </span>
            </div>

            <div className="text-left">
              <p className="text-[11px] text-[#C5BCAD] font-medium leading-tight">
                {cartCount} {getTranslation(lang, 'stickyCartItems')}
              </p>
              <p className="text-sm font-black text-[#F59E0B] leading-tight">
                {cartTotalMAD} <span className="text-xs font-bold text-[#E2D9CC]">MAD</span>
              </p>
            </div>
          </div>
        )}

        {/* Right: View Cart CTA */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#D99B26] to-[#C88300] group-hover:from-[#E6A100] group-hover:to-[#D99B26] text-[#12100E] font-extrabold px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0">
          <span>{getTranslation(lang, 'stickyCartTitle')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
