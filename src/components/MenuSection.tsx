import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Check, Coffee, Utensils, CupSoda, Sandwich, CookingPot, Star, Droplets, Sparkles, GlassWater } from 'lucide-react';
import { CategoryId, MenuItem, Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { getTranslation } from '../translations';

interface MenuSectionProps {
  activeCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  onAddToCart: (item: MenuItem) => void;
  lang: Language;
}

// Category Theme Configuration (Full Muted Section Backgrounds)
interface SectionTheme {
  sectionBg: string;   // Full category block background & border
  stickyBg: string;    // Sticky header backdrop & border
  cardBg: string;      // Card background & hover state
  cardBorder: string;  // Card border
  badgeBg: string;     // Icon container background
  badgeBorder: string; // Icon container border
  icon: React.ReactNode;
}

const getSectionTheme = (catId: CategoryId, subcategory?: string): SectionTheme => {
  const sub = (subcategory || '').toLowerCase();

  // 1. Coffees (Muted Amber / Golden Dark Brown)
  if (sub.includes('coffee') || sub.includes('café')) {
    return {
      sectionBg: 'bg-[#1C140D] border-[#3D2919]',
      stickyBg: 'bg-[#1C140D]/95 border-[#3D2919]',
      cardBg: 'bg-[#140E09] hover:bg-[#221810]',
      cardBorder: 'border-[#382517]',
      badgeBg: 'bg-[#2E1E13]',
      badgeBorder: 'border-[#543621]',
      icon: <Coffee className="w-5 h-5 text-[#F59E0B]" />,
    };
  }

  // 2. Sweet Tooth / Sucreries (Muted Terracotta / Dark Red-Brown)
  if (sub.includes('sweet') || sub.includes('sucrerie') || sub.includes('gourmandise')) {
    return {
      sectionBg: 'bg-[#221415] border-[#482325]',
      stickyBg: 'bg-[#221415]/95 border-[#482325]',
      cardBg: 'bg-[#180E0F] hover:bg-[#2B181A]',
      cardBorder: 'border-[#432022]',
      badgeBg: 'bg-[#381B1D]',
      badgeBorder: 'border-[#612E31]',
      icon: <Sparkles className="w-5 h-5 text-[#F87171]" />,
    };
  }

  // 3. Teas & Infusions / Refreshments (Muted Olive / Emerald Dark Green)
  if (sub.includes('tea') || sub.includes('thé') || sub.includes('refresh') || sub.includes('infusion')) {
    return {
      sectionBg: 'bg-[#111C16] border-[#224030]',
      stickyBg: 'bg-[#111C16]/95 border-[#224030]',
      cardBg: 'bg-[#0B130E] hover:bg-[#16261D]',
      cardBorder: 'border-[#1E3A2C]',
      badgeBg: 'bg-[#192E22]',
      badgeBorder: 'border-[#2C523C]',
      icon: <Droplets className="w-5 h-5 text-[#34D399]" />,
    };
  }

  // 4. Smoothies (Muted Magenta / Dark Bordeaux)
  if (sub.includes('smoothie')) {
    return {
      sectionBg: 'bg-[#20111A] border-[#441E37]',
      stickyBg: 'bg-[#20111A]/95 border-[#441E37]',
      cardBg: 'bg-[#160B12] hover:bg-[#281521]',
      cardBorder: 'border-[#3F1B33]',
      badgeBg: 'bg-[#33172A]',
      badgeBorder: 'border-[#5C284B]',
      icon: <CupSoda className="w-5 h-5 text-[#F472B6]" />,
    };
  }

  // 5. Fresh Juices (Muted Ochre / Warm Gold Dark)
  if (sub.includes('juice') || sub.includes('jus')) {
    return {
      sectionBg: 'bg-[#221A0D] border-[#453319]',
      stickyBg: 'bg-[#221A0D]/95 border-[#453319]',
      cardBg: 'bg-[#171108] hover:bg-[#281E0F]',
      cardBorder: 'border-[#3E2E16]',
      badgeBg: 'bg-[#332612]',
      badgeBorder: 'border-[#5A4320]',
      icon: <GlassWater className="w-5 h-5 text-[#FBBF24]" />,
    };
  }

  // 6. Brunch (Muted Warm Brown)
  if (catId === 'brunch' || sub.includes('brunch') || sub.includes('formule')) {
    return {
      sectionBg: 'bg-[#221712] border-[#462D20]',
      stickyBg: 'bg-[#221712]/95 border-[#462D20]',
      cardBg: 'bg-[#18100C] hover:bg-[#2A1B15]',
      cardBorder: 'border-[#41291D]',
      badgeBg: 'bg-[#352118]',
      badgeBorder: 'border-[#5E3B2B]',
      icon: <Utensils className="w-5 h-5 text-[#FB923C]" />,
    };
  }

  // 7. Burgers & Sandwiches (Muted Deep Red)
  if (catId === 'burgers' || sub.includes('burger') || sub.includes('sandwich') || sub.includes('side')) {
    return {
      sectionBg: 'bg-[#241111] border-[#4B2020]',
      stickyBg: 'bg-[#241111]/95 border-[#4B2020]',
      cardBg: 'bg-[#190B0B] hover:bg-[#2C1414]',
      cardBorder: 'border-[#431D1D]',
      badgeBg: 'bg-[#381818]',
      badgeBorder: 'border-[#612A2A]',
      icon: <Sandwich className="w-5 h-5 text-[#EF4444]" />,
    };
  }

  // 8. Crêpes (Muted Teal / Deep Cyan)
  if (catId === 'crepes' || sub.includes('crêpe') || sub.includes('crepe')) {
    return {
      sectionBg: 'bg-[#0E1E20] border-[#1C3F43]',
      stickyBg: 'bg-[#0E1E20]/95 border-[#1C3F43]',
      cardBg: 'bg-[#091416] hover:bg-[#132528]',
      cardBorder: 'border-[#19383C]',
      badgeBg: 'bg-[#152D30]',
      badgeBorder: 'border-[#265056]',
      icon: <CookingPot className="w-5 h-5 text-[#2DD4BF]" />,
    };
  }

  // Default Coffees
  return {
    sectionBg: 'bg-[#1C140D] border-[#3D2919]',
    stickyBg: 'bg-[#1C140D]/95 border-[#3D2919]',
    cardBg: 'bg-[#140E09] hover:bg-[#221810]',
    cardBorder: 'border-[#382517]',
    badgeBg: 'bg-[#2E1E13]',
    badgeBorder: 'border-[#543621]',
    icon: <Coffee className="w-5 h-5 text-[#F59E0B]" />,
  };
};

interface PillFilter {
  id: string;
  labelKey: string;
  matchFn: (item: MenuItem) => boolean;
}

const PILL_FILTERS: PillFilter[] = [
  { id: 'all', labelKey: 'pillAllItems', matchFn: () => true },
  { id: 'coffees', labelKey: 'pillCoffeesCategory', matchFn: (item) => item.subcategory === 'Coffees' },
  { id: 'sweets', labelKey: 'pillSweetsCategory', matchFn: (item) => item.subcategory === 'Sweet Tooth' },
  { id: 'teas', labelKey: 'pillTeasCategory', matchFn: (item) => item.subcategory === 'Teas' || item.subcategory === 'Refreshments' },
  { id: 'smoothies', labelKey: 'pillSmoothiesCategory', matchFn: (item) => item.category === 'smoothies' },
  { id: 'brunch', labelKey: 'pillBrunchCategory', matchFn: (item) => item.category === 'brunch' },
  { id: 'burgers', labelKey: 'pillBurgersCategory', matchFn: (item) => item.category === 'burgers' },
  { id: 'crepes', labelKey: 'pillCrepesCategory', matchFn: (item) => item.category === 'crepes' },
];

const getSectionTitle = (catId: CategoryId, subcategory: string | undefined, lang: Language): string => {
  const sub = subcategory || '';
  if (sub === 'Coffees') return getTranslation(lang, 'sectionTitleCoffees');
  if (sub === 'Sweet Tooth') return getTranslation(lang, 'sectionTitleSweets');
  if (sub === 'Teas') return getTranslation(lang, 'sectionTitleTeas');
  if (sub === 'Refreshments') return getTranslation(lang, 'sectionTitleRefreshments');
  if (sub === 'Mixology Smoothies') return getTranslation(lang, 'sectionTitleSmoothies');
  if (sub === 'Fresh Juices') return getTranslation(lang, 'sectionTitleJuices');
  if (sub === 'Formules Complete') return getTranslation(lang, 'sectionTitleBrunchFormules');
  if (sub === 'Plats de Brunch') return getTranslation(lang, 'sectionTitleBrunchPlats');
  if (sub === 'Craft Burgers') return getTranslation(lang, 'sectionTitleBurgers');
  if (sub === 'Homemade Sandwiches') return getTranslation(lang, 'sectionTitleSandwiches');
  if (sub === 'Sides') return getTranslation(lang, 'sectionTitleSides');
  if (sub === 'Crêpes Sucrées') return getTranslation(lang, 'sectionTitleCrepesSweet');
  if (sub === 'Crêpes Salées') return getTranslation(lang, 'sectionTitleCrepesSavory');

  if (catId === 'drinks') return getTranslation(lang, 'footerDrinks');
  if (catId === 'smoothies') return getTranslation(lang, 'footerSmoothies');
  if (catId === 'brunch') return getTranslation(lang, 'footerBrunch');
  if (catId === 'burgers') return getTranslation(lang, 'footerBurgers');
  if (catId === 'crepes') return getTranslation(lang, 'footerCrepes');

  return sub || catId;
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  lang,
}) => {
  const [activePill, setActivePill] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});

  const handleDirectAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1300);
  };

  // Sync external activeCategory (e.g. from footer) to activePill
  useEffect(() => {
    if (activeCategory === 'drinks') setActivePill('coffees');
    else if (activeCategory === 'smoothies') setActivePill('smoothies');
    else if (activeCategory === 'brunch') setActivePill('brunch');
    else if (activeCategory === 'burgers') setActivePill('burgers');
    else if (activeCategory === 'crepes') setActivePill('crepes');
    else if (activeCategory === 'all') setActivePill('all');
  }, [activeCategory]);

  const currentPillObj = useMemo(() => {
    return PILL_FILTERS.find((p) => p.id === activePill) || PILL_FILTERS[0];
  }, [activePill]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Pill match
      if (!currentPillObj.matchFn(item)) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q) || false;
        const matchSub = item.subcategory?.toLowerCase().includes(q) || false;
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q)) || false;
        return matchName || matchDesc || matchSub || matchTags;
      }
      return true;
    });
  }, [currentPillObj, searchQuery]);

  // Group items into logical sections with localized titles
  const groupedSections = useMemo(() => {
    const groups: {
      [key: string]: {
        id: string;
        title: string;
        categoryId: CategoryId;
        subcategory?: string;
        items: MenuItem[];
      };
    } = {};

    filteredItems.forEach((item) => {
      const groupKey = `${item.category}-${item.subcategory || 'main'}`;
      const groupTitle = getSectionTitle(item.category, item.subcategory, lang);

      if (!groups[groupKey]) {
        groups[groupKey] = {
          id: groupKey,
          title: groupTitle,
          categoryId: item.category,
          subcategory: item.subcategory,
          items: [],
        };
      }
      groups[groupKey].items.push(item);
    });

    return Object.values(groups);
  }, [filteredItems, lang]);

  const handlePillClick = (pillId: string) => {
    setActivePill(pillId);
    if (pillId === 'all') onSelectCategory('all');
    else if (pillId === 'coffees' || pillId === 'sweets' || pillId === 'teas') onSelectCategory('drinks');
    else if (pillId === 'smoothies') onSelectCategory('smoothies');
    else if (pillId === 'brunch') onSelectCategory('brunch');
    else if (pillId === 'burgers') onSelectCategory('burgers');
    else if (pillId === 'crepes') onSelectCategory('crepes');
  };

  return (
    <section id="menu-section" className="py-12 bg-[#12100E] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section: "La Carte" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-[#28211A]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D99B26] animate-pulse" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#D99B26]">
                {getTranslation(lang, 'menuTitleLabel')}
              </span>
            </div>
            
            {/* Title: La Carte */}
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#FFF8E7] gold-backlit">
              {getTranslation(lang, 'allIngredientsTitle')}
            </h2>

            {/* Description Sentence */}
            <p className="text-xs sm:text-sm text-[#C5BCAD] mt-1.5 font-medium max-w-xl">
              {getTranslation(lang, 'menuDefaultDesc')}
            </p>
          </div>

          {/* Search Result Info */}
          {searchQuery && (
            <div className="text-xs text-[#D99B26] bg-[#211C18] px-3.5 py-2 rounded-xl border border-[#3A322A] shadow-md">
              {getTranslation(lang, 'resultsFor')} « <span className="font-bold text-white">{searchQuery}</span> » : {filteredItems.length}
            </div>
          )}
        </div>

        {/* Single Filter Layer: Sub-category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {PILL_FILTERS.map((pill) => {
            const isActive = activePill === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => handlePillClick(pill.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#D99B26] text-[#12100E] shadow-lg shadow-[#D99B26]/20 scale-[1.02]'
                    : 'bg-[#1C1714] text-[#A89F91] hover:text-[#FFF8E7] hover:bg-[#251E1A] border border-[#2B231D]'
                }`}
              >
                {getTranslation(lang, pill.labelKey as any)}
              </button>
            );
          })}
        </div>

        {/* Menu Items Rendered by Grouped Full-Colored Category Sections */}
        {groupedSections.length === 0 ? (
          <div className="text-center py-16 bg-[#1A1613] rounded-2xl border border-[#2A231C]">
            <p className="text-sm text-[#A89F91]">{getTranslation(lang, 'noResults')}</p>
            <button
              onClick={() => handlePillClick('all')}
              className="mt-3 text-xs text-[#D99B26] hover:underline font-semibold cursor-pointer"
            >
              {getTranslation(lang, 'resetFilters')}
            </button>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {groupedSections.map((section) => {
              const theme = getSectionTheme(section.categoryId, section.subcategory);

              return (
                <div
                  key={section.id}
                  className={`rounded-3xl p-4 sm:p-6 md:p-8 border shadow-2xl transition-all duration-200 ${theme.sectionBg}`}
                >
                  {/* Sticky Category Header */}
                  <div className={`sticky top-[56px] z-20 backdrop-blur-md py-3 px-3.5 sm:px-5 rounded-2xl border mb-5 flex items-center justify-between shadow-lg ${theme.stickyBg}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${theme.badgeBg} ${theme.badgeBorder}`}>
                        {theme.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFF8E7] tracking-wide font-display">
                        {section.title}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold text-[#D5C9B8] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                      {section.items.length} {section.items.length === 1 ? 'article' : 'articles'}
                    </span>
                  </div>

                  {/* Item Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className={`group ${theme.cardBg} border ${theme.cardBorder} hover:border-[#D99B26]/70 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between shadow-lg relative`}
                      >
                        <div>
                          {/* Popular Badge top-right row (Repeated subcategory label removed as requested) */}
                          {item.isPopular && (
                            <div className="flex justify-end mb-2">
                              <div className="inline-flex items-center gap-1 bg-[#D99B26]/20 border border-[#D99B26]/50 text-[#F59E0B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-sm">
                                <Star className="w-3 h-3 fill-current text-[#F59E0B]" />
                                <span>{getTranslation(lang, 'popularBadge')}</span>
                              </div>
                            </div>
                          )}

                          {/* Card Content with Optional Future Photo Slot */}
                          <div className="flex gap-3 items-start mb-2">
                            {/* Optional Photo Field (collapses completely when undefined) */}
                            {item.imageUrl && (
                              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-black/40 border border-white/10">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              {/* Title & Constant Amber Price Header */}
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <h4 className="text-base font-bold text-[#FFF8E7] group-hover:text-[#F59E0B] transition-colors leading-snug">
                                  {item.name}
                                </h4>
                                
                                {/* Price: Constant Amber/Gold signal across all sections */}
                                <span className="text-lg font-black font-display text-[#F59E0B] whitespace-nowrap">
                                  {item.priceMAD} <span className="text-xs font-normal text-[#C5BCAD]">MAD</span>
                                </span>
                              </div>

                              {/* Description */}
                              {item.description && (
                                <p className="text-xs text-[#C5BCAD] leading-relaxed mb-2.5 line-clamp-2">
                                  {item.description}
                                </p>
                              )}

                              {/* Tags: Smaller & Subtler */}
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {item.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[9px] uppercase tracking-wider text-[#D5C9B8] bg-black/30 border border-white/10 px-1.5 py-0.5 rounded font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom Divider & Action */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
                          {item.options && item.options.length > 0 ? (
                            <span className="text-[11px] text-[#38BDF8] italic">{getTranslation(lang, 'customizationOption')}</span>
                          ) : (
                            <span className="text-[11px] text-[#C5BCAD]">{getTranslation(lang, 'individualPortion')}</span>
                          )}

                          {(() => {
                            const isJustAdded = !!addedItemIds[item.id];
                            return (
                              <button
                                onClick={() => handleDirectAdd(item)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 shadow-sm cursor-pointer ${
                                  isJustAdded
                                    ? 'bg-[#F59E0B] text-[#12100E] shadow-md shadow-[#F59E0B]/30 scale-[1.03]'
                                    : 'bg-white/10 hover:bg-[#D99B26] text-[#FFF8E7] hover:text-[#12100E]'
                                }`}
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>{getTranslation(lang, 'addedSuccessBtn')}</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>{getTranslation(lang, 'addBtn')}</span>
                                  </>
                                )}
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
