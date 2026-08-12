import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, Utensils, ShoppingBag, Truck, MapPin, User, Phone } from 'lucide-react';
import { CartItem, OrderType, OrderDetails, Language } from '../types';
import { getTranslation } from '../translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToWhatsApp: (orderDetails: OrderDetails) => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToWhatsApp,
  lang,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  const totalMAD = cartItems.reduce((acc, item) => acc + item.itemTotalMAD, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const orderDetails: OrderDetails = {
      customerName: customerName || 'Client Café Crème',
      phone,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber || 'Non spécifié' : undefined,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress || 'Rabat' : undefined,
      notes,
      items: cartItems,
      totalMAD,
    };

    onProceedToWhatsApp(orderDetails);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181512] border-l border-[#3A3027] text-[#F3EFE6] shadow-2xl flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-4 bg-[#12100E] border-b border-[#2A231C] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#D99B26]/20 border border-[#D99B26]/40 rounded-xl text-[#F59E0B]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold font-display text-[#FFF8E7]">{getTranslation(lang, 'yourCart')}</h2>
                <p className="text-xs text-[#A89F91]">
                  {cartItems.length} {getTranslation(lang, 'selectedArticles')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && !showConfirmClear && (
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(true)}
                  className="p-2 text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                  title={getTranslation(lang, 'clearCartBtn')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 text-[#A89F91] hover:text-white bg-[#28211A] rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Confirm Clear Banner in Drawer */}
          {showConfirmClear && cartItems.length > 0 && (
            <div className="bg-rose-950/90 border-b border-rose-500/40 p-3 flex items-center justify-between gap-2 text-xs animate-fadeIn">
              <span className="text-rose-200 font-semibold">
                {getTranslation(lang, 'clearCartConfirm')}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setShowConfirmClear(false);
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-2.5 py-1 rounded-lg text-xs transition-colors"
                >
                  {getTranslation(lang, 'clearCartConfirmBtn')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(false)}
                  className="bg-white/10 hover:bg-white/20 text-gray-300 px-2 py-1 rounded-lg text-xs transition-colors"
                >
                  {getTranslation(lang, 'clearCartCancelBtn')}
                </button>
              </div>
            </div>
          )}

          {/* Drawer Content */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#28211A] border border-[#3D332A] flex items-center justify-center text-[#D99B26] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-[#FFF8E7]">{getTranslation(lang, 'emptyCartTitle')}</h3>
              <p className="text-xs text-[#A89F91] mt-1 max-w-xs">
                {getTranslation(lang, 'emptyCartDesc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col overflow-hidden">
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#28211A]">
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        {item.menuItem.imageUrl && (
                          <img
                            src={item.menuItem.imageUrl}
                            alt={item.menuItem.name}
                            className="w-11 h-11 rounded-lg object-cover bg-black/40 border border-white/10 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#FFF8E7] leading-snug">{item.menuItem.name}</h4>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div className="text-[11px] text-[#D99B26] space-y-0.5 mt-0.5">
                              {item.selectedOptions.map((opt) => (
                                <div key={opt.optionName}>
                                  • {opt.optionName}: <span className="font-semibold">{opt.choice}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {item.specialInstructions && (
                            <p className="text-[10px] text-[#A89F91] italic mt-0.5">
                              Note: "{item.specialInstructions}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#F59E0B]">
                          {item.itemTotalMAD} MAD
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 bg-[#12100E] border border-[#2B231D] p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded bg-[#28211A] hover:bg-[#382E25] text-white flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#F59E0B] px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded bg-[#28211A] hover:bg-[#382E25] text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-rose-400/80 hover:text-rose-400 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{getTranslation(lang, 'deleteBtn')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details Input Section */}
              <div className="p-4 bg-[#12100E] border-t border-[#2A231C] space-y-3">
                {/* Order Type Toggle */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#D99B26] block mb-1.5">
                    {getTranslation(lang, 'orderTypeLabel')}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                        orderType === 'dine-in'
                          ? 'bg-[#D99B26] text-[#12100E] border-[#D99B26]'
                          : 'bg-[#1C1815] text-[#A89F91] border-[#2F2720] hover:text-white'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{getTranslation(lang, 'dineIn')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                        orderType === 'takeaway'
                          ? 'bg-[#D99B26] text-[#12100E] border-[#D99B26]'
                          : 'bg-[#1C1815] text-[#A89F91] border-[#2F2720] hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{getTranslation(lang, 'takeaway')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                        orderType === 'delivery'
                          ? 'bg-[#D99B26] text-[#12100E] border-[#D99B26]'
                          : 'bg-[#1C1815] text-[#A89F91] border-[#2F2720] hover:text-white'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{getTranslation(lang, 'delivery')}</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Inputs based on orderType */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#A89F91] block mb-0.5">{getTranslation(lang, 'customerNameLabel')}</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C8273]" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={getTranslation(lang, 'customerNamePlaceholder')}
                          className="w-full bg-[#1C1815] border border-[#2F2720] rounded-lg pl-8 pr-2 py-1.5 text-xs text-white placeholder-[#685E53] outline-none focus:border-[#D99B26]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-[#A89F91] block mb-0.5">{getTranslation(lang, 'phoneLabel')}</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C8273]" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="06 XX XX XX XX"
                          className="w-full bg-[#1C1815] border border-[#2F2720] rounded-lg pl-8 pr-2 py-1.5 text-xs text-white placeholder-[#685E53] outline-none focus:border-[#D99B26]"
                        />
                      </div>
                    </div>
                  </div>

                  {orderType === 'dine-in' && (
                    <div>
                      <label className="text-[10px] text-[#A89F91] block mb-0.5">{getTranslation(lang, 'tableNumberLabel')}</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder={getTranslation(lang, 'tableNumberPlaceholder')}
                        className="w-full bg-[#1C1815] border border-[#2F2720] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#685E53] outline-none focus:border-[#D99B26]"
                      />
                    </div>
                  )}

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-[10px] text-[#A89F91] block mb-0.5">{getTranslation(lang, 'deliveryAddressLabel')}</label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C8273]" />
                        <input
                          type="text"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder={getTranslation(lang, 'deliveryAddressPlaceholder')}
                          className="w-full bg-[#1C1815] border border-[#2F2720] rounded-lg pl-8 pr-2 py-1.5 text-xs text-white placeholder-[#685E53] outline-none focus:border-[#D99B26]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] text-[#A89F91] block mb-0.5">{getTranslation(lang, 'notesLabel')}</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={getTranslation(lang, 'notesPlaceholder')}
                      className="w-full bg-[#1C1815] border border-[#2F2720] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#685E53] outline-none focus:border-[#D99B26]"
                    />
                  </div>
                </div>

                {/* Total & Action Button */}
                <div className="pt-2 border-t border-[#2A231C]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#A89F91]">{getTranslation(lang, 'totalToPay')}</span>
                    <span className="text-xl font-extrabold text-[#F59E0B] font-display">
                      {totalMAD} MAD
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#167D7F] hover:bg-[#0E6062] text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                    <span>{getTranslation(lang, 'confirmWhatsAppBtn')}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
