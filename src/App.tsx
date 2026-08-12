import { useState, useEffect } from 'react';
import { CategoryId, MenuItem, CartItem, SelectedOption, OrderDetails, Language } from './types';
import { detectInitialLanguage } from './translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { StickyCartBar } from './components/StickyCartBar';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { CafeVibeSection } from './components/CafeVibeSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Language state with localStorage persistence and navigator.language auto-detect
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cafe_creme_lang');
      if (saved && (saved === 'fr' || saved === 'en' || saved === 'ar')) {
        return saved as Language;
      }
      return detectInitialLanguage();
    } catch (e) {
      return 'fr';
    }
  });

  // Sync lang to localStorage and document attributes
  useEffect(() => {
    try {
      localStorage.setItem('cafe_creme_lang', lang);
    } catch (e) {
      console.error('Failed to save language to localStorage', e);
    }
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Cart state persisted in localStorage for seamless experience
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe_creme_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderDetailsForWhatsApp, setOrderDetailsForWhatsApp] = useState<OrderDetails | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cafe_creme_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Ensure page always opens at scroll position 0 so the sticky navbar is immediately visible
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Cart helper calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalMAD = cartItems.reduce((sum, item) => sum + item.itemTotalMAD, 0);

  // Direct add item to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    options?: SelectedOption[],
    specialInstructions: string = ''
  ) => {
    const finalOptions =
      options && options.length > 0
        ? options
        : item.options?.map((opt) => ({
            optionName: opt.name,
            choice: opt.defaultChoice || opt.choices[0] || '',
          })) || [];

    let extraCost = 0;
    finalOptions.forEach((opt) => {
      const match = opt.choice.match(/\+(\d+)\s*MAD/i);
      if (match) {
        extraCost += parseInt(match[1], 10);
      }
    });

    const unitPrice = item.priceMAD + extraCost;
    const itemTotalMAD = unitPrice * quantity;

    const existingIndex = cartItems.findIndex((ci) => {
      if (ci.menuItem.id !== item.id) return false;
      if (ci.specialInstructions !== specialInstructions) return false;
      if (ci.selectedOptions.length !== finalOptions.length) return false;
      return ci.selectedOptions.every(
        (o, idx) =>
          o.optionName === finalOptions[idx]?.optionName && o.choice === finalOptions[idx]?.choice
      );
    });

    if (existingIndex > -1) {
      setCartItems((prev) => {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        const newTotal = unitPrice * newQty;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          itemTotalMAD: newTotal,
        };
        return updated;
      });
    } else {
      const newCartItem: CartItem = {
        id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        menuItem: item,
        quantity,
        selectedOptions: finalOptions,
        specialInstructions,
        itemTotalMAD,
      };
      setCartItems((prev) => [...prev, newCartItem]);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            let extraCost = 0;
            ci.selectedOptions.forEach((opt) => {
              const match = opt.choice.match(/\+(\d+)\s*MAD/i);
              if (match) extraCost += parseInt(match[1], 10);
            });
            const unitPrice = ci.menuItem.priceMAD + extraCost;
            return {
              ...ci,
              quantity: newQty,
              itemTotalMAD: unitPrice * newQty,
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsAppDirect = () => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
    } else {
      window.open(
        'https://wa.me/?text=Bonjour%20Caf%C3%A9%20Cr%C3%A8me%20Rabat!%20Je%20souhaite%20passer%20une%20commande.',
        '_blank'
      );
    }
  };

  return (
    <div className={`min-h-screen bg-[#12100E] text-[#F3EFE6] font-sans antialiased flex flex-col selection:bg-[#D99B26] selection:text-[#12100E] ${cartCount > 0 ? 'pb-20 sm:pb-24' : ''}`}>
      {/* Top Sticky Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotalMAD={cartTotalMAD}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) scrollToMenu();
        }}
        lang={lang}
        onSelectLanguage={setLang}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenWhatsApp={openWhatsAppDirect}
          lang={lang}
        />

        {/* Menu Section */}
        <MenuSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onAddToCart={(item) => handleAddToCart(item)}
          lang={lang}
        />

        {/* Cafe Vibe & Atmosphere Section */}
        <CafeVibeSection lang={lang} />

        {/* Reviews Showcase */}
        <ReviewsSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToMenu();
        }}
        lang={lang}
      />

      {/* Sticky Bottom Cart Bar */}
      <StickyCartBar
        cartCount={cartCount}
        cartTotalMAD={cartTotalMAD}
        onOpenCart={() => setIsCartOpen(true)}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Side Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToWhatsApp={(details) => {
          setIsCartOpen(false);
          setOrderDetailsForWhatsApp(details);
        }}
        lang={lang}
      />

      {/* WhatsApp Pre-Send Confirmation Modal */}
      <WhatsAppModal
        orderDetails={orderDetailsForWhatsApp}
        onClose={() => setOrderDetailsForWhatsApp(null)}
        onClearCartAndFinish={handleClearCart}
        lang={lang}
      />
    </div>
  );
}
