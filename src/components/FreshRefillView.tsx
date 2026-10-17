import React, { useState } from 'react';
import { FreshRefillBundle, CartItem } from '../types';
import { FRESH_REFILL_BUNDLES, PRODUCTS } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

interface FreshRefillViewProps {
  onAddRefillToBag: (item: CartItem) => void;
  onTrackOrder: () => void;
}

export const FreshRefillView: React.FC<FreshRefillViewProps> = ({
  onAddRefillToBag,
  onTrackOrder
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(FRESH_REFILL_BUNDLES[0].id);
  const [orderLookupId, setOrderLookupId] = useState<string>('SF-8921');
  const [frequency, setFrequency] = useState<'one-time' | 'bi-weekly' | 'monthly'>('one-time');
  const [orderLinked, setOrderLinked] = useState<boolean>(true);

  const selectedBundle = FRESH_REFILL_BUNDLES.find(b => b.id === selectedBundleId) || FRESH_REFILL_BUNDLES[0];
  const targetProduct = PRODUCTS.find(p => p.id === selectedBundle.compatibleWith) || PRODUCTS[0];

  // Pricing based on frequency
  const effectivePrice = frequency === 'one-time' 
    ? selectedBundle.price 
    : Math.round(selectedBundle.price * 0.85); // 15% discount on auto-refill

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderLookupId.trim().toUpperCase().includes('8921')) {
      setSelectedBundleId('refill-blanche-classic');
      setOrderLinked(true);
    } else if (orderLookupId.trim().toUpperCase().includes('8402')) {
      setSelectedBundleId('refill-terracotta-autumn');
      setOrderLinked(true);
    } else {
      setOrderLinked(true);
    }
  };

  const handleAddRefill = () => {
    const refillCartItem: CartItem = {
      id: `refill-${Date.now()}`,
      productId: selectedBundle.id,
      title: selectedBundle.name,
      subtitle: `${selectedBundle.frenchTitle} · ${frequency === 'one-time' ? 'Single Refresh' : 'Subscription Refresh'}`,
      price: effectivePrice,
      quantity: 1,
      image: selectedBundle.image,
      compositionType: 'fresh_refill',
      isRefill: true,
      refillTargetOrderId: orderLookupId || undefined,
      customDetails: {
        style: `Fresh Refill for ${selectedBundle.targetArrangementName}`,
        palette: selectedBundle.season,
        totalStems: selectedBundle.stemsList.length,
        ribbon: 'Pre-trimmed for silicone hydration vials',
        fragrance: 'Living botanical natural scent',
        includesWaterVials: true
      }
    };

    onAddRefillToBag(refillCartItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#E8E2D9] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block mb-2">
            La Recharge Fraîche · The Botanical Cycle
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            Reorder & Replace Fresh Living Stems
          </h2>
        </div>
        <p className="text-sm text-[#5A524A] max-w-md font-light leading-relaxed">
          Keep your permanent silk foundation everlasting while constantly renewing living floral perfume. 
          Fresh stems arrive conditioned in silicone water reservoirs with foolproof replacement guides.
        </p>
      </div>

      {/* Order Lookup or Existing Arrangement Bar */}
      <div className="py-6 border-b border-[#E8E2D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleLookup} className="flex items-center gap-2 max-w-md w-full">
          <input
            type="text"
            value={orderLookupId}
            onChange={(e) => setOrderLookupId(e.target.value)}
            placeholder="Enter past Order ID (e.g. SF-8921)"
            className="flex-1 px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] uppercase tracking-wider focus:outline-none focus:border-[#1E1B18]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#38332E]"
          >
            Find My Arrangement
          </button>
        </form>

        <div className="text-xs text-[#6B6158]">
          <span className="font-medium text-[#1E1B18]">Order Linked:</span>{' '}
          {orderLinked ? (
            <span className="text-[#2E5E3D] font-medium">#{orderLookupId} ({selectedBundle.targetArrangementName})</span>
          ) : (
            <span>Select an arrangement model below</span>
          )}
        </div>
      </div>

      {/* Main Grid: Anatomy Breakdown + Bundle Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        
        {/* Left Column (5 cols): Visual Anatomy & Replacement Mechanics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F2ECE3] border border-[#DDD5C9] p-6 shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B] block">
              Arrangement Anatomy
            </span>
            <h3 className="font-serif text-2xl text-[#1E1B18] font-normal mt-0.5">
              Permanent Silk Base vs. Living Stems
            </h3>

            {/* Arrangement Showcase Photo with Dual Callouts */}
            <div className="relative aspect-[4/3] my-4 overflow-hidden bg-[#E2D8CC] border border-[#D5CBC0]">
              <ImageWithFallback
                src={selectedBundle.image}
                alt={selectedBundle.targetArrangementName}
                fallbackTitle={selectedBundle.targetArrangementName}
                fallbackSubtitle={selectedBundle.season}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end text-white text-xs">
                <span className="font-serif text-lg">{selectedBundle.targetArrangementName}</span>
                <span className="text-[11px] text-[#FAF8F5]/90">Hybrid Silk & Living Floral Composition</span>
              </div>
            </div>

            {/* Dual Layers Specification (Zero-Pill clean lists) */}
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-[#FAF8F5] border border-[#D5CBC0]">
                <div className="flex items-center gap-2 font-medium text-[#1E1B18] uppercase tracking-wider text-[11px] mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E1B18] inline-block" />
                  <span>Layer 1: Permanent Archival Silk (Never Replaced)</span>
                </div>
                <p className="text-[#5A524A] font-light leading-relaxed">
                  The primary architectural structure (focal roses, hydrangeas, vessel, wired foundation). UV-proof and everlasting.
                </p>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#2E5E3D]/40">
                <div className="flex items-center gap-2 font-medium text-[#2E5E3D] uppercase tracking-wider text-[11px] mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E5E3D] inline-block" />
                  <span>Layer 2: Living Cut Blooms (Reorder & Replace)</span>
                </div>
                <p className="text-[#5A524A] font-light leading-relaxed">
                  Slotted into discreet silicone hydration reservoirs. Provides fresh living fragrance and natural dewiness.
                </p>
              </div>
            </div>

            {/* How to Replace in 90 Seconds */}
            <div className="pt-6 border-t border-[#DDD5C9]">
              <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#1E1B18] block mb-2">
                How Fresh Stem Replacement Works:
              </span>
              <ol className="space-y-2 text-xs text-[#5A524A] font-light">
                <li className="flex gap-2">
                  <span className="font-mono text-[#8C7A6B]">01.</span>
                  <span>Gently slide out the previous living stems from their silicone water tubes concealed within the silk foliage.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-[#8C7A6B]">02.</span>
                  <span>Unbox your freshly harvested chilled stems and snip 1/4" off the base with floral shears.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-[#8C7A6B]">03.</span>
                  <span>Slot the fresh stems back into the water vials. Your arrangement is instantly revived!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Choose Refill Bundle & Frequency */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Compatible Arrangement Refill */}
          <div>
            <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18] block mb-1">
              1. Select Your Fresh Floral Refill Recipe
            </span>
            <p className="text-xs text-[#6B6158] mb-4">
              Choose an exact match replenishment bundle or explore seasonal bloom variations.
            </p>

            <div className="space-y-3">
              {FRESH_REFILL_BUNDLES.map(bundle => (
                <div
                  key={bundle.id}
                  onClick={() => setSelectedBundleId(bundle.id)}
                  className={`p-4 border cursor-pointer transition-all ${
                    selectedBundleId === bundle.id
                      ? 'border-[#1E1B18] bg-[#F2ECE3]'
                      : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#B5A898]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E0D7CC]">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#8C7A6B] block">
                        For: {bundle.targetArrangementName}
                      </span>
                      <h4 className="font-serif text-lg text-[#1E1B18] font-normal">
                        {bundle.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono tabular-nums text-base font-medium text-[#1E1B18]">
                        ${bundle.price} USD
                      </span>
                      <span className="block text-[11px] text-[#2E5E3D] font-light">
                        {bundle.lifespanText}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A524A] font-light pt-2 leading-relaxed">
                    {bundle.description}
                  </p>

                  {/* Included Stems List */}
                  <div className="mt-3 pt-2 border-t border-[#E0D7CC]/60">
                    <span className="text-[10px] uppercase tracking-wider text-[#1E1B18] font-medium block mb-1">
                      Fresh Harvest Contents:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#6B6158]">
                      {bundle.stemsList.map((stem, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-[#2E5E3D]">✦</span>
                          <span>{stem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Replenishment Frequency */}
          <div className="pt-6 border-t border-[#E8E2D9]">
            <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18] block mb-1">
              2. Replenishment Schedule
            </span>
            <p className="text-xs text-[#6B6158] mb-3">
              Order on-demand whenever your blooms fade, or activate automatic fresh deliveries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setFrequency('one-time')}
                className={`p-3 border cursor-pointer text-center transition-colors ${
                  frequency === 'one-time'
                    ? 'border-[#1E1B18] bg-[#F2ECE3]'
                    : 'border-[#E2D8CC] bg-[#FAF8F5]'
                }`}
              >
                <div className="font-serif text-base text-[#1E1B18]">One-Time Refill</div>
                <span className="font-mono text-xs text-[#6B6158] block mt-0.5">
                  ${selectedBundle.price} USD
                </span>
                <span className="text-[10px] text-[#8C7A6B] block mt-1">Single replenishment</span>
              </div>

              <div
                onClick={() => setFrequency('bi-weekly')}
                className={`p-3 border cursor-pointer text-center transition-colors ${
                  frequency === 'bi-weekly'
                    ? 'border-[#1E1B18] bg-[#F2ECE3]'
                    : 'border-[#E2D8CC] bg-[#FAF8F5]'
                }`}
              >
                <div className="font-serif text-base text-[#1E1B18]">Bi-Weekly Cycle</div>
                <span className="font-mono text-xs text-[#2E5E3D] font-medium block mt-0.5">
                  ${Math.round(selectedBundle.price * 0.85)} USD (Save 15%)
                </span>
                <span className="text-[10px] text-[#8C7A6B] block mt-1">Continuous peak freshness</span>
              </div>

              <div
                onClick={() => setFrequency('monthly')}
                className={`p-3 border cursor-pointer text-center transition-colors ${
                  frequency === 'monthly'
                    ? 'border-[#1E1B18] bg-[#F2ECE3]'
                    : 'border-[#E2D8CC] bg-[#FAF8F5]'
                }`}
              >
                <div className="font-serif text-base text-[#1E1B18]">Monthly Refresh</div>
                <span className="font-mono text-xs text-[#2E5E3D] font-medium block mt-0.5">
                  ${Math.round(selectedBundle.price * 0.90)} USD (Save 10%)
                </span>
                <span className="text-[10px] text-[#8C7A6B] block mt-1">Monthly fresh infusion</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-mono tabular-nums text-[#1E1B18] font-medium">
                ${effectivePrice.toLocaleString()} USD
              </div>
              <div className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">
                Includes Insured Cold-Chain Floral Transit
              </div>
            </div>

            <button
              onClick={handleAddRefill}
              className="px-8 py-3.5 bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-colors text-center shadow-sm"
            >
              Add Fresh Replenishment to Bag →
            </button>
          </div>

          <div className="p-4 bg-[#F5EFE6] border border-[#DDD5C9] text-xs text-[#6B6158] flex items-center justify-between">
            <span>Already have an in-transit replacement order?</span>
            <button
              onClick={onTrackOrder}
              className="underline font-medium text-[#1E1B18] hover:text-[#7A5C43]"
            >
              Track Living Floral Delivery →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
