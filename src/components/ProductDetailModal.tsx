import React, { useState } from 'react';
import { Product } from '../types';
import { FRAGRANCE_MISTS } from '../data/customizerOptions';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedMist: string, isHybrid?: boolean) => void;
  onCustomizeSimilar: (product: Product) => void;
  onGoToRefill?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onCustomizeSimilar,
  onGoToRefill
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedMist, setSelectedMist] = useState(FRAGRANCE_MISTS[0].id);
  const [isHybridSelected, setIsHybridSelected] = useState(false);

  if (!product) return null;

  const currentMistObj = FRAGRANCE_MISTS.find(m => m.id === selectedMist) || FRAGRANCE_MISTS[0];
  const unitPrice = isHybridSelected && product.freshStemsOption 
    ? product.price + product.freshStemsOption.priceDifference 
    : product.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FAF8F5] max-w-4xl w-full border border-[#D5CBC0] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF8F5]/80 hover:bg-[#EAE4DC] text-[#1E1B18] flex items-center justify-center transition-colors text-lg border border-[#D5CBC0]"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Craft Guarantee */}
          <div className="md:col-span-6 bg-[#F2ECE3] relative p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E2D9]">
            <div className="aspect-[4/3] md:aspect-square overflow-hidden bg-[#E2D8CC] border border-[#DDD5C9] relative">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                fallbackSubtitle={product.frenchSubtitle}
                className="w-full h-full object-cover"
              />
              {product.isBestseller && (
                <div className="absolute top-3 left-3 bg-[#1E1B18] text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1">
                  Atelier Bestseller
                </div>
              )}
              {isHybridSelected && (
                <div className="absolute bottom-3 left-3 bg-[#2E5E3D] text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1">
                  Hybrid: Silk + Living Blooms
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDD5C9] space-y-2 text-xs text-[#5A524A]">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#1E1B18]">Vessel Inclusion:</span>
                <span>{product.vessel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#1E1B18]">Dimensions:</span>
                <span className="font-mono tabular-nums">{product.dimensions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#1E1B18]">Stem Density:</span>
                <span className="font-mono tabular-nums">{product.stemCount} Hand-wired Stems</span>
              </div>
              {product.allowsFreshMix && (
                <div className="flex items-center justify-between text-[#2E5E3D] font-medium pt-1">
                  <span>Fresh Refill Eligible:</span>
                  <span>Yes · Reorderable on-demand</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Narrative, Botanical Recipe & Purchase */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C7A6B] font-medium mb-1">
                {product.frenchSubtitle}
              </div>
              <h2 id="product-modal-title" className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal leading-snug">
                {product.name}
              </h2>
              
              <div className="mt-3 text-xl font-mono tabular-nums text-[#1E1B18] font-medium">
                ${unitPrice.toLocaleString()}
                <span className="text-xs text-[#7A7167] font-sans font-light ml-2 uppercase tracking-wider">
                  USD · Insured Delivery Included
                </span>
              </div>

              <p className="mt-4 text-sm text-[#5A524A] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Botanical Medium Selector: 100% Silk vs Hybrid Fresh Flower Mix */}
              {product.allowsFreshMix && product.freshStemsOption && (
                <div className="mt-5 p-3.5 bg-[#F2ECE3] border border-[#DDD5C9] space-y-3">
                  <div className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18] flex items-center justify-between">
                    <span>Botanical Medium Composition</span>
                    <span className="text-[10px] text-[#2E5E3D]">Fresh Replacement Available</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsHybridSelected(false)}
                      className={`p-2.5 text-left border transition-colors ${
                        !isHybridSelected
                          ? 'border-[#1E1B18] bg-[#FAF8F5] text-[#1E1B18] font-medium'
                          : 'border-[#D5CBC0] bg-transparent text-[#6B6158]'
                      }`}
                    >
                      <div className="font-serif text-sm">100% Archival Silk</div>
                      <div className="text-[10px] text-[#7A7167]">Permanent & zero upkeep</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsHybridSelected(true)}
                      className={`p-2.5 text-left border transition-colors ${
                        isHybridSelected
                          ? 'border-[#2E5E3D] bg-[#FAF8F5] text-[#1E1B18] font-medium ring-1 ring-[#2E5E3D]'
                          : 'border-[#D5CBC0] bg-transparent text-[#6B6158]'
                      }`}
                    >
                      <div className="font-serif text-sm text-[#2E5E3D]">
                        Hybrid Fresh Mix (+${product.freshStemsOption.priceDifference})
                      </div>
                      <div className="text-[10px] text-[#7A7167]">With fresh living blooms</div>
                    </button>
                  </div>

                  {isHybridSelected && (
                    <div className="text-[11px] text-[#5A524A] pt-2 border-t border-[#DDD5C9] space-y-1">
                      <div className="font-medium text-[#1E1B18]">Living Fresh Stems Included:</div>
                      <ul className="space-y-0.5 text-[#6B6158]">
                        {product.freshStemsOption.freshStemsList.map((stem, i) => (
                          <li key={i}>• {stem}</li>
                        ))}
                      </ul>
                      <p className="text-[10px] text-[#2E5E3D] pt-1">
                        ✦ When the fresh stems fade in ~{product.freshStemsOption.lifespanDays} days, you can reorder fresh replacement blooms for ${product.freshStemsOption.refillPrice} through our Refill Portal!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Botanical Recipe Breakdown */}
              <div className="mt-5 pt-4 border-t border-[#E8E2D9]">
                <div className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-3">
                  Botanical Stem Composition
                </div>
                <ul className="space-y-1.5 text-xs text-[#5A524A] font-light">
                  {product.recipe.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8C7A6B] font-serif text-sm">✦</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fragrance Infusion Mist Choice */}
              <div className="mt-5 pt-4 border-t border-[#E8E2D9]">
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-2">
                  Complimentary Atelier Botanical Scent Infusion
                </label>
                <select
                  value={selectedMist}
                  onChange={(e) => setSelectedMist(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                >
                  {FRAGRANCE_MISTS.map((mist) => (
                    <option key={mist.id} value={mist.id}>
                      {mist.name} — {mist.notes}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-[#7A7167] italic">
                  Notes: {currentMistObj.notes}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#E8E2D9] space-y-3">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#D5CBC0] bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-10 flex items-center justify-center text-sm hover:bg-[#F2ECE3] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-mono tabular-nums text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-10 flex items-center justify-center text-sm hover:bg-[#F2ECE3] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, selectedMist, isHybridSelected);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-colors text-center"
                >
                  Add to Bag · ${(unitPrice * quantity).toLocaleString()}
                </button>
              </div>

              {/* Customize Similar In Atelier */}
              <button
                onClick={() => {
                  onCustomizeSimilar(product);
                  onClose();
                }}
                className="w-full py-2.5 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#F2ECE3] text-xs uppercase tracking-[0.14em] font-medium transition-colors text-center"
              >
                Customize Stems in Atelier Studio →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
