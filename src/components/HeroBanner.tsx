import React from 'react';
import { useBrand } from '../context/BrandContext';
import { ImageWithFallback } from './ImageWithFallback';
import heroImg from '../assets/images/hero_silk_floral_atelier_1791912867580.jpg';

interface HeroBannerProps {
  onExploreCollections: () => void;
  onOpenCustomizer: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCollections,
  onOpenCustomizer,
}) => {
  const { businessName } = useBrand();

  return (
    <section className="relative bg-[#FAF8F5] border-b border-[#E8E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#8C7A6B]">
                {businessName} · Haute Floristerie Immortelle
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#1E1B18] text-balance">
                Everlasting botanical artistry in pure spun silk.
              </h1>
              <p className="text-base sm:text-lg text-[#5A524A] font-light leading-relaxed max-w-xl">
                Sculpted from hypoallergenic Japanese real-touch silk and hand-steamed in our atelier. 
                Heirloom bouquets, architectural floral statements, and hybrid living botanical creations designed to endure for lifetimes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCollections}
                className="px-7 py-3.5 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#38332E] transition-colors whitespace-nowrap shadow-sm"
              >
                Browse Collections
              </button>
              <button
                onClick={onOpenCustomizer}
                className="px-7 py-3.5 border border-[#1E1B18] text-[#1E1B18] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#EFE9DF] transition-colors whitespace-nowrap"
              >
                Customize a Bouquet
              </button>
            </div>

            {/* Unboxed Editorial Craftsmanship Markers (Strict Zero-Pill) */}
            <div className="pt-6 border-t border-[#E8E2D9] grid grid-cols-3 gap-6 text-xs text-[#6B6158]">
              <div>
                <div className="font-medium text-[#1E1B18] uppercase tracking-[0.1em] mb-1">Real-Touch Silk</div>
                <div className="font-light text-[11px] leading-normal">Botanical tactile feel with lifetime UV resilience</div>
              </div>
              <div>
                <div className="font-medium text-[#1E1B18] uppercase tracking-[0.1em] mb-1">Hand-Steamed</div>
                <div className="font-light text-[11px] leading-normal">Each petal shaped individually by master florists</div>
              </div>
              <div>
                <div className="font-medium text-[#1E1B18] uppercase tracking-[0.1em] mb-1">White-Glove Courier</div>
                <div className="font-light text-[11px] leading-normal">Insured climate-regulated live GPS tracking</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Imagery Showcase with Resilient Fallback */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-[#EAE4DC] border border-[#DDD5C9] shadow-md group">
              <ImageWithFallback
                src={heroImg}
                alt="Floral atelier displaying luxury handcrafted silk flower arrangements"
                fallbackTitle={businessName}
                fallbackSubtitle="Permanent Silk Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent text-white text-xs flex justify-between items-end pointer-events-none">
                <div>
                  <span className="font-serif text-base block font-normal tracking-wide">{businessName}</span>
                  <span className="text-[11px] text-white/80 uppercase tracking-widest font-light">Botanical Collection</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-white/90">Bespoke Curation</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
