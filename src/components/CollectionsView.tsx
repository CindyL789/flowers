import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductDetailModal } from './ProductDetailModal';

interface CollectionsViewProps {
  onAddToCart: (product: Product, quantity: number, mistId?: string, isHybrid?: boolean) => void;
  onOpenCustomizer: (initialProduct?: Product) => void;
  onOpenRefillPortal?: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onAddToCart,
  onOpenCustomizer,
  onOpenRefillPortal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPalette, setSelectedPalette] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'stems'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPalette = selectedPalette === 'all' || item.palette === selectedPalette;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recipe.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesPalette && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stems') return b.stemCount - a.stemCount;
      return 0; // featured order default
    });
  }, [selectedCategory, selectedPalette, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E8E2D9] gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block mb-2">
            The Permanent Botanical Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            Curated Silk & Hybrid Compositions
          </h2>
        </div>
        <p className="text-sm text-[#5A524A] max-w-md font-light leading-relaxed">
          Crafted from Grade-A Japanese spun silk with optional living fresh flower mix-ins. 
          Reorder and replace living stems on demand to perpetually refresh your everlasting arrangements.
        </p>
      </div>

      {/* Fresh Stem Replenishment Banner */}
      <div className="my-6 p-4 bg-[#F2ECE3] border border-[#DDD5C9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-medium text-[#1E1B18] uppercase tracking-wider block">
            🌿 Introducing Hybrid Living Florals & La Recharge Fraîche
          </span>
          <span className="text-[#6B6158] font-light">
            You can now blend fresh living garden blooms into any silk arrangement, then reorder and replace only the fresh stems whenever you desire!
          </span>
        </div>
        {onOpenRefillPortal && (
          <button
            onClick={onOpenRefillPortal}
            className="px-4 py-2 border border-[#1E1B18] text-[#1E1B18] uppercase tracking-[0.12em] font-medium hover:bg-[#FAF8F5] whitespace-nowrap transition-colors"
          >
            Explore Fresh Refill Portal →
          </button>
        )}
      </div>

      {/* Filter and Controls Toolbar */}
      <div className="py-6 space-y-4 border-b border-[#E8E2D9]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs (Functional Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Arrangements' },
              { id: 'bridal', label: 'Bridal & Weddings' },
              { id: 'centerpiece', label: 'Grand Centerpieces' },
              { id: 'ikebana', label: 'Sculptural Ikebana' },
              { id: 'petite', label: 'Petite Boudoir' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-[#1E1B18] text-[#FAF8F5]'
                    : 'bg-[#F2ECE3] text-[#5A524A] hover:text-[#1E1B18] hover:bg-[#EAE4DC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stems, roses, dahlias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-64 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CBC0] placeholder:text-[#9A9085] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9A9085] hover:text-[#1E1B18]"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stems">Stem Density</option>
            </select>
          </div>
        </div>

        {/* Secondary Palette Filters (Unboxed Buttons) */}
        <div className="flex items-center gap-4 text-xs text-[#6B6158] pt-2">
          <span className="uppercase tracking-[0.14em] font-medium text-[#1E1B18]">Palette:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Palettes' },
              { id: 'blanc', label: 'Chantilly Blanc' },
              { id: 'blush', label: 'Antique Blush' },
              { id: 'terracotta', label: 'Tuscan Terracotta' },
              { id: 'monochrome', label: 'Monochrome Noir' },
              { id: 'garden', label: 'English Meadow' }
            ].map(pal => (
              <button
                key={pal.id}
                onClick={() => setSelectedPalette(pal.id)}
                className={`transition-colors underline-offset-4 ${
                  selectedPalette === pal.id
                    ? 'text-[#1E1B18] font-semibold underline'
                    : 'text-[#6B6158] hover:text-[#1E1B18]'
                }`}
              >
                {pal.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="py-4 text-xs text-[#7A7167] flex items-center justify-between">
        <span className="font-mono tabular-nums">
          Showing {filteredProducts.length} curated silk compositions
        </span>
        <span>Includes complimentary fragrance infusion and white-glove transit</span>
      </div>

      {/* Product Cards Grid: 3-column desktop, 2-column tablet */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#D5CBC0] bg-[#F7F4EF] p-8">
          <p className="font-serif text-xl text-[#1E1B18] mb-2">No matching arrangements found</p>
          <p className="text-xs text-[#6B6158] mb-4">Try clearing your search keyword or palette filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPalette('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.14em]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between bg-[#FAF8F5] border border-[#E2D8CC] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Product Card Image Container */}
              <div 
                className="relative aspect-[4/3] overflow-hidden bg-[#F0EAE1] cursor-pointer"
                onClick={() => setActiveModalProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {product.isBestseller && (
                  <div className="absolute top-3 left-3 bg-[#1E1B18] text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1">
                    Atelier Bestseller
                  </div>
                )}
                {product.isNewSeason && !product.isBestseller && (
                  <div className="absolute top-3 left-3 bg-[#7A5C43] text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1">
                    New Season
                  </div>
                )}

                {/* Hover Quick Add Overlay Bar */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center text-white text-xs">
                  <span className="uppercase tracking-widest text-[10px] font-medium">Click for Recipe & Options</span>
                  <span className="text-[11px] font-mono tabular-nums">{product.stemCount} Stems</span>
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#8C7A6B] font-medium mb-1">
                    {product.frenchSubtitle}
                  </div>
                  <h3 
                    onClick={() => setActiveModalProduct(product)}
                    className="font-serif text-xl text-[#1E1B18] font-normal group-hover:text-[#7A5C43] transition-colors cursor-pointer leading-snug"
                  >
                    {product.name}
                  </h3>
                  
                  {/* Clean unboxed metadata with bullet separators (Zero-Pill) */}
                  <div className="flex items-center gap-2 text-xs text-[#7A7167] mt-2">
                    <span className="font-mono tabular-nums">{product.stemCount} Stems</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.dimensions}</span>
                    {product.allowsFreshMix && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#2E5E3D] font-medium">Fresh Mix Option</span>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-[#5A524A] font-light line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price Baseline and Action Row */}
                <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                  <div>
                    <div className="text-lg font-mono tabular-nums text-[#1E1B18] font-medium">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">
                      USD · Insured Transit
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="px-3 py-2 text-xs font-medium text-[#1E1B18] border border-[#D5CBC0] hover:bg-[#F2ECE3] transition-colors uppercase tracking-[0.1em]"
                    >
                      Recipe
                    </button>
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="px-4 py-2 text-xs font-medium text-[#FAF8F5] bg-[#1E1B18] hover:bg-[#38332E] transition-colors uppercase tracking-[0.1em]"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Active Product Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={(prod, qty, mist, isHybrid) => onAddToCart(prod, qty, mist, isHybrid)}
        onCustomizeSimilar={(prod) => onOpenCustomizer(prod)}
        onGoToRefill={onOpenRefillPortal}
      />
    </div>
  );
};
