import React from 'react';
import { X, Send, Copy, Check, MessageSquare, ShieldCheck } from 'lucide-react';
import { OrderDetails, Language } from '../types';
import { getTranslation } from '../translations';

interface WhatsAppModalProps {
  orderDetails: OrderDetails | null;
  onClose: () => void;
  onClearCartAndFinish: () => void;
  lang: Language;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  orderDetails,
  onClose,
  onClearCartAndFinish,
  lang,
}) => {
  if (!orderDetails) return null;

  const [copied, setCopied] = React.useState(false);

  // Generate formatted WhatsApp message string
  const formatOrderMessage = (): string => {
    const lines: string[] = [];
    lines.push(`*NOUVELLE COMMANDE — CAFÉ CRÈME RABAT* ☕✨`);
    lines.push(`-----------------------------------`);
    lines.push(`👤 *Client:* ${orderDetails.customerName}`);
    if (orderDetails.phone) lines.push(`📞 *Tél:* ${orderDetails.phone}`);

    if (orderDetails.orderType === 'dine-in') {
      lines.push(`🪑 *Type:* Sur Place ${orderDetails.tableNumber ? `(${orderDetails.tableNumber})` : ''}`);
    } else if (orderDetails.orderType === 'takeaway') {
      lines.push(`🛍️ *Type:* À Emporter`);
    } else {
      lines.push(`🛵 *Type:* Livraison à Domicile`);
      if (orderDetails.deliveryAddress) {
        lines.push(`📍 *Adresse:* ${orderDetails.deliveryAddress}`);
      }
    }

    lines.push(`-----------------------------------`);
    lines.push(`📋 *DÉTAIL DE LA COMMANDE:*`);

    orderDetails.items.forEach((item, index) => {
      let itemLine = `${index + 1}. *${item.quantity}x ${item.menuItem.name}* (${item.itemTotalMAD} MAD)`;
      lines.push(itemLine);

      if (item.selectedOptions && item.selectedOptions.length > 0) {
        item.selectedOptions.forEach((opt) => {
          lines.push(`   └ _${opt.optionName}: ${opt.choice}_`);
        });
      }

      if (item.specialInstructions) {
        lines.push(`   └ _Note: ${item.specialInstructions}_`);
      }
    });

    lines.push(`-----------------------------------`);
    if (orderDetails.notes) {
      lines.push(`📝 *Remarques:* ${orderDetails.notes}`);
    }
    lines.push(`💰 *TOTAL:* *${orderDetails.totalMAD} MAD*`);
    lines.push(`-----------------------------------`);
    lines.push(`Envoyé depuis le site web de Café Crème Rabat 🇲🇦`);

    return lines.join('\n');
  };

  const rawMessage = formatOrderMessage();
  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
    onClearCartAndFinish();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1A1715] border border-[#3D332A] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#12100E] border-b border-[#2A231C] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-[#FFF8E7]">
                {getTranslation(lang, 'waModalTitle')}
              </h2>
              <p className="text-xs text-emerald-400 font-semibold">
                {getTranslation(lang, 'waModalSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#A89F91] hover:text-white bg-[#28211A] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center gap-2 text-xs text-[#C5BCAD] bg-[#211C18] p-3 rounded-xl border border-[#3A322A]">
            <ShieldCheck className="w-4 h-4 text-[#D99B26] shrink-0" />
            <span>
              {getTranslation(lang, 'waNotice')}
            </span>
          </div>

          {/* Formatted Text Box */}
          <div className="relative bg-[#0F1411] border border-emerald-900/50 rounded-xl p-4 font-mono text-xs text-emerald-300/90 whitespace-pre-wrap leading-relaxed shadow-inner">
            <button
              onClick={handleCopyText}
              className="absolute top-3 right-3 bg-[#1C2520] hover:bg-[#2A3830] text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold border border-emerald-800/60 flex items-center gap-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span>{getTranslation(lang, 'copiedText')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{getTranslation(lang, 'copyText')}</span>
                </>
              )}
            </button>
            {rawMessage}
          </div>

          {/* Order Brief */}
          <div className="bg-[#151210] p-3.5 rounded-xl border border-[#2B231D] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#A89F91] block">{getTranslation(lang, 'orderTotalLabel')}</span>
              <span className="text-xs text-[#E2D9CC]">
                {orderDetails.items.length} article(s) • {orderDetails.orderType.toUpperCase()}
              </span>
            </div>
            <span className="text-xl font-extrabold text-[#F59E0B] font-display">
              {orderDetails.totalMAD} MAD
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#12100E] border-t border-[#2A231C] flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-[#28211A] hover:bg-[#382E25] text-[#C5BCAD] text-xs font-bold rounded-xl transition-colors"
          >
            {getTranslation(lang, 'modifyOrderBtn')}
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>{getTranslation(lang, 'sendWhatsAppBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
