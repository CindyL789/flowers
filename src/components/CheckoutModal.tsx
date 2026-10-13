import React, { useState } from 'react';
import { CartItem, OrderTracking } from '../types';
import { createNewOrderTracking } from '../data/seedOrders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: OrderTracking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  // Steps: 'form' | 'processing' | 'confirmed'
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [processingStatus, setProcessingStatus] = useState<string>('');
  
  // Payment tab
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'express' | 'installments'>('card');
  
  // Shipping form fields
  const [fullName, setFullName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@lifestyle.com');
  const [phone, setPhone] = useState('+1 (415) 302-8819');
  const [address, setAddress] = useState('2480 Washington St');
  const [apt, setApt] = useState('Penthouse A');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('94115');

  // Card form fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [cardholderName, setCardholderName] = useState('ELEANOR VANCE');
  const [saveCard, setSaveCard] = useState(true);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  // Generated completed order
  const [completedOrder, setCompletedOrder] = useState<OrderTracking | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 250;
  const shippingCost = isFreeShipping ? 0 : 25;
  const discountAmount = subtotal * appliedDiscount;
  const tax = (subtotal - discountAmount) * 0.0825; // 8.25% CA sales tax
  const grandTotal = subtotal - discountAmount + shippingCost + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BOTANICAL10') {
      setAppliedDiscount(0.10);
      setPromoMessage('10% Atelier Welcome Privileges Applied');
    } else if (promoCode.trim().toUpperCase() === 'BRIDAL20') {
      setAppliedDiscount(0.20);
      setPromoMessage('20% Bridal Suite VIP Courtesy Applied');
    } else {
      setPromoMessage('Invalid invitation code. Try "BOTANICAL10"');
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    setProcessingStatus('Initiating 256-bit TLS handshake with payment network...');

    setTimeout(() => {
      setProcessingStatus('Authorizing transaction with issuing bank...');
    }, 900);

    setTimeout(() => {
      setProcessingStatus('Allocating white-glove climate courier reservation...');
    }, 1800);

    setTimeout(() => {
      const generatedOrderId = `SF-${Math.floor(8000 + Math.random() * 1900)}`;
      const itemsSummary = items.map(i => `${i.quantity}× ${i.title}`).join(', ');
      
      const newOrder = createNewOrderTracking(
        generatedOrderId,
        fullName,
        `${address} ${apt ? `, ${apt}` : ''}`,
        `${city}, ${state} ${zip}`,
        itemsSummary,
        grandTotal
      );

      setCompletedOrder(newOrder);
      setCheckoutStep('confirmed');
      onOrderSuccess(newOrder);
    }, 2800);
  };

  // Card brand detection helper
  const getCardBrand = (num: string) => {
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    return 'Credit Card';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FAF8F5] max-w-4xl w-full border border-[#D5CBC0] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        {/* Modal Close Button */}
        {checkoutStep !== 'processing' && (
          <button
            onClick={onClose}
            aria-label="Close Checkout"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-[#D5CBC0] bg-[#FAF8F5] hover:bg-[#EAE4DC] text-[#1E1B18] flex items-center justify-center transition-colors text-sm"
          >
            ✕
          </button>
        )}

        {/* STEP 1: CHECKOUT FORM */}
        {checkoutStep === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            
            {/* Left Column (7 cols): Shipping & Payment Details */}
            <form onSubmit={handleProcessPayment} className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#E8E2D9]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block">
                  Encrypted Payment Gateway
                </span>
                <h2 id="checkout-modal-title" className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal mt-0.5">
                  White-Glove Order Checkout
                </h2>
              </div>

              {/* SECTION: SHIPPING DESTINATION */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18] pb-1 border-b border-[#E8E2D9]">
                  1. Shipping Destination (Courier Delivery)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      Email for Tracking Updates *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      Suite / Apt
                    </label>
                    <input
                      type="text"
                      value={apt}
                      onChange={(e) => setApt(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                      ZIP / Postal *
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                    Mobile Phone (For Courier Live Delivery ETA SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                  />
                </div>
              </div>

              {/* SECTION: PAYMENT METHOD SELECTOR */}
              <div className="space-y-4 pt-4 border-t border-[#E8E2D9]">
                <div className="flex items-center justify-between pb-1 border-b border-[#E8E2D9]">
                  <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18]">
                    2. Payment Method
                  </span>
                  <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">
                    🔒 TLS 256-Bit Encrypted
                  </span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium border text-center transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5]'
                        : 'border-[#D5CBC0] bg-[#FAF8F5] text-[#5A524A] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('express')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium border text-center transition-colors ${
                      paymentMethod === 'express'
                        ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5]'
                        : 'border-[#D5CBC0] bg-[#FAF8F5] text-[#5A524A] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('installments')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium border text-center transition-colors ${
                      paymentMethod === 'installments'
                        ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5]'
                        : 'border-[#D5CBC0] bg-[#FAF8F5] text-[#5A524A] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    Klarna (4x)
                  </button>
                </div>

                {/* Tab: Credit / Debit Card Form */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#F5EFE6] border border-[#DDD5C9] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#5A524A]">
                      <span className="font-medium text-[#1E1B18]">{getCardBrand(cardNumber)}</span>
                      <span className="font-mono text-[11px] text-[#7A7167]">PCI DSS Level-1 Compliant</span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                          Expiration (MM/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                          Security CVC *
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#6B6158] uppercase tracking-wider mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-[#5A524A] cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="accent-[#1E1B18]"
                      />
                      <span>Securely remember this card for future floral commissions</span>
                    </label>
                  </div>
                )}

                {/* Tab: Apple Pay / Express Checkout */}
                {paymentMethod === 'express' && (
                  <div className="p-6 bg-[#1E1B18] text-[#FAF8F5] text-center space-y-4">
                    <div className="text-xl font-medium tracking-tight">Pay Express Checkout</div>
                    <p className="text-xs text-[#C8C0B5] max-w-sm mx-auto font-light leading-relaxed">
                      Instant biometric authorization using your saved Apple Wallet card and shipping address.
                    </p>
                    <div className="text-xs font-mono text-[#D5CBC0]">
                      Total to Authorize: ${grandTotal.toLocaleString()} USD
                    </div>
                  </div>
                )}

                {/* Tab: Installments (Klarna) */}
                {paymentMethod === 'installments' && (
                  <div className="p-5 bg-[#F2ECE3] border border-[#DDD5C9] space-y-3 text-xs text-[#5A524A]">
                    <div className="font-serif text-lg text-[#1E1B18]">Klarna · 4 Interest-Free Payments</div>
                    <p className="font-light leading-relaxed">
                      Split your silk floral investment into 4 equal bi-weekly installments of{' '}
                      <strong className="font-mono text-[#1E1B18]">${(grandTotal / 4).toFixed(2)} USD</strong>. Zero interest, zero hidden fees.
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-2">
                      <div className="p-2 bg-[#FAF8F5] border border-[#D5CBC0]">
                        <span className="block text-[#8C7A6B]">Due Today</span>
                        <span className="font-mono font-medium">${(grandTotal / 4).toFixed(2)}</span>
                      </div>
                      <div className="p-2 bg-[#FAF8F5] border border-[#D5CBC0]">
                        <span className="block text-[#8C7A6B]">In 2 Weeks</span>
                        <span className="font-mono font-medium">${(grandTotal / 4).toFixed(2)}</span>
                      </div>
                      <div className="p-2 bg-[#FAF8F5] border border-[#D5CBC0]">
                        <span className="block text-[#8C7A6B]">In 4 Weeks</span>
                        <span className="font-mono font-medium">${(grandTotal / 4).toFixed(2)}</span>
                      </div>
                      <div className="p-2 bg-[#FAF8F5] border border-[#D5CBC0]">
                        <span className="block text-[#8C7A6B]">In 6 Weeks</span>
                        <span className="font-mono font-medium">${(grandTotal / 4).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center shadow-md"
              >
                Authorize & Confirm Order · ${grandTotal.toLocaleString()} USD
              </button>

              <div className="text-[10px] text-[#7A7167] text-center leading-relaxed">
                By clicking Authorize, you confirm acceptance of our Silk Preservation Guarantee and White-Glove transit charter. Your card is charged securely via 256-bit encryption.
              </div>
            </form>

            {/* Right Column (5 cols): Order Summary, Line Items & Promo Code */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F5EFE6] space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B] block">
                  Commission Summary
                </span>
                <h3 className="font-serif text-xl text-[#1E1B18] font-normal mb-4">
                  {items.length} {items.length === 1 ? 'Arrangement' : 'Arrangements'}
                </h3>

                {/* Line Items Scroll */}
                <div className="space-y-4 max-h-56 overflow-y-auto pr-2 border-b border-[#DDD5C9] pb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="w-14 h-16 bg-[#E2D8CC] overflow-hidden shrink-0 border border-[#D5CBC0]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-serif text-sm text-[#1E1B18] leading-tight">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#7A7167]">
                          Qty: {item.quantity} · {item.subtitle}
                        </div>
                        <div className="font-mono tabular-nums text-xs font-medium text-[#1E1B18] mt-1">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-4 border-b border-[#DDD5C9] pb-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Atelier Code (e.g. BOTANICAL10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 p-2 text-xs uppercase tracking-wider bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-wider hover:bg-[#38332E]"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] mt-1.5 ${appliedDiscount > 0 ? 'text-[#2E5E3D] font-medium' : 'text-[#8C7A6B]'}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 space-y-2 text-xs text-[#5A524A]">
                  <div className="flex justify-between">
                    <span>Arrangements Subtotal</span>
                    <span className="font-mono tabular-nums text-[#1E1B18]">${subtotal.toLocaleString()}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-[#2E5E3D]">
                      <span>VIP Privilege Discount</span>
                      <span className="font-mono tabular-nums">- ${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured White-Glove Transit</span>
                    <span>{isFreeShipping ? 'Complimentary' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8.25%)</span>
                    <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium text-[#1E1B18] pt-3 border-t border-[#DDD5C9]">
                    <span>Total Investment</span>
                    <span className="font-mono tabular-nums font-semibold">${grandTotal.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-[#DDD5C9] text-[11px] text-[#6B6158] space-y-1">
                <div className="font-medium text-[#1E1B18]">Archival Guarantee:</div>
                <p>100% Japanese silk flowers with UV stabilizer. Arrives ready to display inside reinforced linen presentation crate.</p>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: PROCESSING SIMULATION */}
        {checkoutStep === 'processing' && (
          <div className="py-24 px-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto border-3 border-[#1E1B18] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7A6B] block">
              Securing Transaction
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal">
              Communicating with Payment Network
            </h3>
            <p className="text-sm font-mono text-[#5A524A] max-w-md mx-auto">
              {processingStatus}
            </p>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
        {checkoutStep === 'confirmed' && completedOrder && (
          <div className="p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1E1B18] text-[#FAF8F5] flex items-center justify-center font-serif text-2xl">
              ✓
            </div>
            
            <div>
              <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block mb-1">
                Payment Authorized & Cleared
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
                Thank You for Your Commission
              </h2>
            </div>

            <p className="text-sm text-[#5A524A] max-w-lg mx-auto font-light leading-relaxed">
              Your bespoke silk order <strong className="font-mono font-medium text-[#1E1B18]">#{completedOrder.orderId}</strong> has been allocated to our master florists. Real-time shipping telemetry is now live.
            </p>

            {/* Receipt Details Box */}
            <div className="max-w-xl mx-auto bg-[#F2ECE3] border border-[#DDD5C9] p-6 text-left space-y-3 text-xs text-[#5A524A]">
              <div className="flex justify-between py-1 border-b border-[#E0D7CC]">
                <span className="font-medium text-[#1E1B18]">Order Reference:</span>
                <span className="font-mono font-semibold text-[#1E1B18]">#{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0D7CC]">
                <span className="font-medium text-[#1E1B18]">Courier Tracking Number:</span>
                <span className="font-mono text-[#1E1B18]">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0D7CC]">
                <span className="font-medium text-[#1E1B18]">White-Glove Courier:</span>
                <span>{completedOrder.carrier}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0D7CC]">
                <span className="font-medium text-[#1E1B18]">Delivery Destination:</span>
                <span>{completedOrder.destinationAddress}, {completedOrder.destinationCity}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-[#1E1B18]">Total Paid:</span>
                <span className="font-mono font-bold text-[#1E1B18]">${completedOrder.totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  onClose();
                }}
                className="px-6 py-3 border border-[#1E1B18] text-[#1E1B18] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#F2ECE3] transition-colors"
              >
                Continue Browsing
              </button>

              <button
                onClick={() => {
                  onClose();
                  // Handled by parent to route to tracking view
                }}
                className="px-7 py-3 bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sm"
              >
                Track This Shipment in Real-Time →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
