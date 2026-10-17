import React from 'react';
import { CartItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 250;
  const qualifiedForFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#D5CBC0] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B] block">
                Atelier Shopping Bag
              </span>
              <h2 className="font-serif text-2xl text-[#1E1B18] font-normal">
                Your Botanical Curation
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Shopping Bag"
              className="w-8 h-8 rounded-full border border-[#D5CBC0] hover:bg-[#EAE4DC] text-[#1E1B18] flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Indicator (Clean unboxed style) */}
          <div className="px-6 py-3 bg-[#F2ECE3] border-b border-[#E0D7CC] text-xs text-[#5A524A]">
            {qualifiedForFreeShipping ? (
              <span className="font-medium text-[#1E1B18]">
                ✓ Your order qualifies for complimentary White-Glove Insured Shipping
              </span>
            ) : (
              <span>
                Add ${(freeShippingThreshold - subtotal).toLocaleString()} more for complimentary insured delivery
              </span>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="font-serif text-xl text-[#1E1B18]">Your shopping bag is empty</p>
                <p className="text-xs text-[#6B6158] max-w-xs mx-auto font-light">
                  Explore our curated silk collections or craft a custom bouquet recipe in the atelier.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#E8E2D9] text-xs">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#EAE4DC] border border-[#D5CBC0] overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#1E1B18] font-normal leading-snug">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#9A9085] hover:text-[#1E1B18] text-sm"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-[11px] text-[#7A7167] mt-0.5">
                        {item.subtitle}
                      </p>

                      {/* Custom Details Tag list if bespoke */}
                      {item.isCustom && item.customDetails && (
                        <div className="mt-2 text-[10px] text-[#6B6158] space-y-0.5 bg-[#F5EFE6] p-2 border border-[#E2D8CC]">
                          <div><strong>Stems:</strong> {item.customDetails.totalStems} silk stems</div>
                          <div><strong>Ribbon:</strong> {item.customDetails.ribbon}</div>
                          <div><strong>Scent:</strong> {item.customDetails.fragrance}</div>
                        </div>
                      )}
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D5CBC0] bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#EAE4DC]"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-mono tabular-nums text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#EAE4DC]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono tabular-nums text-sm font-medium text-[#1E1B18]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E2D9] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5A524A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1E1B18] font-medium">
                    ${subtotal.toLocaleString()} USD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="text-[#1E1B18]">
                    {qualifiedForFreeShipping ? 'Complimentary' : '$25 USD'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Presentation Crate</span>
                  <span className="text-[#1E1B18]">Included</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#E8E2D9] font-medium text-[#1E1B18]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    ${(subtotal + (qualifiedForFreeShipping ? 0 : 25)).toLocaleString()} USD
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-colors text-center shadow-sm"
              >
                Proceed to Secure Checkout →
              </button>

              <div className="text-[10px] text-[#8C7A6B] text-center uppercase tracking-wider">
                🔒 256-Bit Encrypted TLS · Visa · Mastercard · Amex · Apple Pay
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
