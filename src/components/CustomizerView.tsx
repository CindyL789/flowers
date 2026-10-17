import React, { useState, useMemo } from 'react';
import { 
  BOUQUET_STYLES, 
  PALETTE_OPTIONS, 
  FOCAL_STEMS, 
  ACCENT_STEMS, 
  RIBBON_OPTIONS, 
  VESSEL_OPTIONS, 
  FRAGRANCE_MISTS 
} from '../data/customizerOptions';
import { CartItem } from '../types';
import bridalImg from '../assets/images/collection_bridal_white_rose_1791912868160.jpg';

interface CustomizerViewProps {
  onAddCustomToCart: (item: CartItem) => void;
  onOpenCollections: () => void;
  onGoToRefillPortal?: () => void;
}

export const CustomizerView: React.FC<CustomizerViewProps> = ({
  onAddCustomToCart,
  onOpenCollections,
  onGoToRefillPortal
}) => {
  // Customizer state
  const [selectedStyleId, setSelectedStyleId] = useState<string>('bridal-hand-tied');
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('blanc-sage');
  
  // Stem quantities mapping
  const [stemCounts, setStemCounts] = useState<Record<string, number>>({
    'stem-garden-rose': 6,
    'stem-fresh-garden-rose': 3,
    'stem-peony': 4,
    'stem-ranunculus': 3,
    'stem-eucalyptus': 4,
    'stem-fresh-eucalyptus': 2,
    'stem-olive': 3,
    'stem-astrantia': 2
  });

  const [selectedRibbonId, setSelectedRibbonId] = useState<string>('ribbon-pearl');
  const [selectedVesselId, setSelectedVesselId] = useState<string>('vessel-ribbon-only');
  const [selectedMistId, setSelectedMistId] = useState<string>('mist-rosa');
  const [calligraphyNote, setCalligraphyNote] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('Bespoke Atelier Creation');
  const [activeTab, setActiveTab] = useState<'style' | 'stems' | 'foliage' | 'finishing'>('style');
  const [stemNatureFilter, setStemNatureFilter] = useState<'all' | 'silk' | 'fresh'>('all');

  // Selected option objects
  const selectedStyle = BOUQUET_STYLES.find(s => s.id === selectedStyleId) || BOUQUET_STYLES[0];
  const selectedPalette = PALETTE_OPTIONS.find(p => p.id === selectedPaletteId) || PALETTE_OPTIONS[0];
  const selectedRibbon = RIBBON_OPTIONS.find(r => r.id === selectedRibbonId) || RIBBON_OPTIONS[0];
  const selectedVessel = VESSEL_OPTIONS.find(v => v.id === selectedVesselId) || VESSEL_OPTIONS[0];
  const selectedMist = FRAGRANCE_MISTS.find(m => m.id === selectedMistId) || FRAGRANCE_MISTS[0];

  // Helper to update stem count
  const updateStem = (stemId: string, delta: number) => {
    setStemCounts(prev => {
      const current = prev[stemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [stemId]: next };
    });
  };

  // Stem calculations
  const totalStemsCount = useMemo(() => {
    return Object.values(stemCounts).reduce((sum, count) => sum + count, 0);
  }, [stemCounts]);

  const allStems = [...FOCAL_STEMS, ...ACCENT_STEMS];

  const silkStemsCount = useMemo(() => {
    return allStems
      .filter(s => s.nature === 'silk')
      .reduce((sum, s) => sum + (stemCounts[s.id] || 0), 0);
  }, [stemCounts, allStems]);

  const freshStemsCount = useMemo(() => {
    return allStems
      .filter(s => s.nature === 'fresh')
      .reduce((sum, s) => sum + (stemCounts[s.id] || 0), 0);
  }, [stemCounts, allStems]);

  const stemsCost = useMemo(() => {
    let sum = 0;
    allStems.forEach(stem => {
      const count = stemCounts[stem.id] || 0;
      sum += count * stem.pricePerStem;
    });
    return sum;
  }, [stemCounts, allStems]);

  // Grand Total Calculation
  const totalPrice = useMemo(() => {
    return selectedStyle.basePrice + stemsCost + selectedVessel.price;
  }, [selectedStyle.basePrice, stemsCost, selectedVessel.price]);

  // Handle Add to Bag
  const handleAddToCart = () => {
    const isHybrid = freshStemsCount > 0;
    const customCartItem: CartItem = {
      id: `custom-${Date.now()}`,
      title: customTitle || 'Bespoke Silk & Living Atelier Creation',
      subtitle: `${selectedStyle.name} · ${selectedPalette.name} ${isHybrid ? '(Hybrid Blend)' : '(100% Silk)'}`,
      price: totalPrice,
      quantity: 1,
      image: bridalImg,
      isCustom: true,
      compositionType: isHybrid ? 'hybrid' : 'pure_silk',
      customDetails: {
        style: selectedStyle.name,
        palette: selectedPalette.name,
        totalStems: totalStemsCount,
        silkStemsCount,
        freshStemsCount,
        ribbon: `${selectedRibbon.name} (${selectedRibbon.fabric})`,
        fragrance: selectedMist.name,
        note: calligraphyNote || undefined,
        includesWaterVials: isHybrid
      }
    };
    onAddCustomToCart(customCartItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#E8E2D9] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block mb-2">
            The Bespoke Studio · Haute Floristerie
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            Interactive Bouquet Atelier
          </h2>
        </div>
        <p className="text-sm text-[#5A524A] max-w-md font-light leading-relaxed">
          Design your one-of-a-kind silk composition or blend in fresh living blossoms with hydration vials. 
          Fresh living stems can be easily reordered and replaced through our refill portal whenever you wish!
        </p>
      </div>

      {/* Main Studio Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        
        {/* Left Column (5 cols): Live Visual Composition Rendering & Telemetry */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="sticky top-28 bg-[#F5EFE6] border border-[#DDD5C9] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2D8CC] text-xs">
              <span className="uppercase tracking-[0.16em] font-medium text-[#1E1B18]">
                Atelier Visualizer
              </span>
              <span className="font-mono tabular-nums text-[#6B6158]">
                {totalStemsCount} Stems Selected
              </span>
            </div>

            {/* Dynamic Visual Bouquet Canvas Illustration */}
            <div className="relative aspect-square w-full my-6 bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center overflow-hidden p-6">
              {/* Decorative radial subtle background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${selectedPalette.hexColors[0]}, transparent 70%)`
                }}
              />

              {/* Dynamic SVG Arrangement Composition */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-h-[320px]">
                <defs>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
                  </filter>
                </defs>

                {/* Vessel / Ribbon Base */}
                {selectedVesselId === 'vessel-limestone' ? (
                  <path d="M 150 290 Q 200 310 250 290 L 260 370 Q 200 380 140 370 Z" fill="#D6CFC4" stroke="#9E9689" strokeWidth="2" />
                ) : selectedVesselId === 'vessel-ceramic-matte' ? (
                  <ellipse cx="200" cy="330" rx="65" ry="45" fill="#3D3A37" stroke="#262422" strokeWidth="2" />
                ) : selectedVesselId === 'vessel-smoked-glass' ? (
                  <rect x="155" y="270" width="90" height="90" rx="8" fill="#B38A58" fillOpacity="0.4" stroke="#7A562B" strokeWidth="2" />
                ) : (
                  // Hand-tied Stem Wrap & Ribbon
                  <g>
                    <line x1="180" y1="270" x2="185" y2="380" stroke="#4A5844" strokeWidth="7" strokeLinecap="round" />
                    <line x1="200" y1="265" x2="200" y2="385" stroke="#3D4B38" strokeWidth="8" strokeLinecap="round" />
                    <line x1="220" y1="270" x2="215" y2="380" stroke="#4A5844" strokeWidth="7" strokeLinecap="round" />
                    <rect x="170" y="295" width="60" height="20" rx="4" fill={selectedRibbon.colorHex} stroke="#C4B8AA" strokeWidth="1" filter="url(#shadow)" />
                    <path d="M 185 315 Q 170 350 160 385" fill="none" stroke={selectedRibbon.colorHex} strokeWidth="8" strokeLinecap="round" />
                    <path d="M 215 315 Q 230 350 240 385" fill="none" stroke={selectedRibbon.colorHex} strokeWidth="8" strokeLinecap="round" />
                  </g>
                )}

                {/* Foliage Layer (Fanned Stems) */}
                {Array.from({ length: Math.min(18, (stemCounts['stem-eucalyptus'] || 0) + (stemCounts['stem-fresh-eucalyptus'] || 0) + (stemCounts['stem-olive'] || 0) + (stemCounts['stem-fern'] || 0)) }).map((_, idx) => {
                  const angle = (idx * 20 - 160) * (Math.PI / 180);
                  const radius = 110 + (idx % 3) * 15;
                  const x = 200 + Math.cos(angle) * radius;
                  const y = 200 + Math.sin(angle) * (radius * 0.7);
                  return (
                    <g key={`foliage-${idx}`}>
                      <line x1="200" y1="240" x2={x} y2={y} stroke="#556B2F" strokeWidth="2.5" opacity="0.8" />
                      <ellipse 
                        cx={x} 
                        cy={y} 
                        rx={10 + (idx % 4) * 3} 
                        ry={7 + (idx % 3) * 2} 
                        fill={selectedPalette.hexColors[2] || '#606C38'} 
                        transform={`rotate(${idx * 25}, ${x}, ${y})`}
                        opacity="0.9"
                      />
                    </g>
                  );
                })}

                {/* Focal Flowers Layer (Roses, Peonies, Orchids) */}
                {Array.from({ length: Math.min(22, (stemCounts['stem-garden-rose'] || 0) + (stemCounts['stem-fresh-garden-rose'] || 0) + (stemCounts['stem-peony'] || 0) + (stemCounts['stem-fresh-peony'] || 0) + (stemCounts['stem-orchid'] || 0) + (stemCounts['stem-ranunculus'] || 0) + (stemCounts['stem-fresh-dahlia'] || 0)) }).map((_, idx) => {
                  const angle = (idx * 32 - 120) * (Math.PI / 180);
                  const radius = 30 + (idx % 4) * 24;
                  const x = 200 + Math.cos(angle) * radius;
                  const y = 185 + Math.sin(angle) * (radius * 0.65);
                  const color = idx % 2 === 0 ? selectedPalette.hexColors[0] : selectedPalette.hexColors[1];
                  const size = 18 + (idx % 3) * 5;
                  const isLivingStem = idx < freshStemsCount;

                  return (
                    <g key={`focal-${idx}`} filter="url(#shadow)">
                      <circle cx={x} cy={y} r={size} fill={color} stroke={isLivingStem ? '#2E5E3D' : '#E2D4C3'} strokeWidth={isLivingStem ? '2' : '1'} />
                      <circle cx={x} cy={y} r={size * 0.7} fill="none" stroke="#D8C2AF" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx={x} cy={y} r={size * 0.4} fill="#F0E3D3" opacity="0.8" />
                      <circle cx={x} cy={y} r={3} fill="#BCA188" />
                      {/* Fresh living bloom dewdrop highlight */}
                      {isLivingStem && (
                        <circle cx={x - 6} cy={y - 6} r={2.5} fill="#70A880" />
                      )}
                    </g>
                  );
                })}

                {/* Accent Starflowers & Berries */}
                {Array.from({ length: Math.min(10, (stemCounts['stem-astrantia'] || 0) + (stemCounts['stem-fresh-sweetpea'] || 0) + (stemCounts['stem-berries'] || 0)) }).map((_, idx) => {
                  const x = 150 + (idx * 25) % 110;
                  const y = 130 + (idx * 18) % 80;
                  return (
                    <circle key={`accent-${idx}`} cx={x} cy={y} r="4" fill="#3D2B35" stroke="#FAF8F5" strokeWidth="1" />
                  );
                })}
              </svg>
            </div>

            {/* Botanical Composition Breakdown */}
            <div className="space-y-2 text-xs text-[#5A524A] pt-4 border-t border-[#E2D8CC]">
              <div className="flex justify-between">
                <span className="text-[#1E1B18] font-medium">Style Base:</span>
                <span>{selectedStyle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E1B18] font-medium">Archival Silk Stems:</span>
                <span className="font-mono tabular-nums">{silkStemsCount} Stems (Everlasting)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2E5E3D] font-medium">Living Fresh Blooms:</span>
                <span className="font-mono tabular-nums text-[#2E5E3D]">
                  {freshStemsCount} Stems {freshStemsCount > 0 ? '(Reorderable)' : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E1B18] font-medium">Ribbon:</span>
                <span>{selectedRibbon.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E1B18] font-medium">Scent Infusion:</span>
                <span>{selectedMist.name}</span>
              </div>
            </div>

            {/* Fresh Stem Reorder Assurance Notice */}
            {freshStemsCount > 0 && (
              <div className="p-2.5 bg-[#FAF8F5] border border-[#2E5E3D]/30 text-[11px] text-[#2E5E3D] mt-3">
                🌿 Includes silicone water vials. Whenever the fresh blooms fade, simply reorder fresh stems in 1 click!
              </div>
            )}

            {/* Total Price and Action */}
            <div className="mt-6 pt-5 border-t border-[#E2D8CC] flex items-center justify-between">
              <div>
                <div className="text-2xl font-mono tabular-nums text-[#1E1B18] font-medium">
                  ${totalPrice.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">
                  USD · Made to Order in Atelier
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={totalStemsCount < 4}
                className={`px-6 py-3 text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  totalStemsCount >= 4
                    ? 'bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5]'
                    : 'bg-[#C8C0B5] text-[#7A7167] cursor-not-allowed'
                }`}
              >
                Add Custom Bouquet
              </button>
            </div>
            {totalStemsCount < 4 && (
              <p className="text-[11px] text-[#A2503B] text-center mt-2">
                Please add at least 4 stems to complete your bouquet recipe.
              </p>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Step Controls & Customization Engine */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Customizer Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-3 text-xs uppercase tracking-[0.14em] font-medium">
            <button
              onClick={() => setActiveTab('style')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'style'
                  ? 'border-[#1E1B18] text-[#1E1B18]'
                  : 'border-transparent text-[#7A7167] hover:text-[#1E1B18]'
              }`}
            >
              1. Silhouette & Palette
            </button>
            <button
              onClick={() => setActiveTab('stems')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'stems'
                  ? 'border-[#1E1B18] text-[#1E1B18]'
                  : 'border-transparent text-[#7A7167] hover:text-[#1E1B18]'
              }`}
            >
              2. Focal Blooms (Silk & Fresh)
            </button>
            <button
              onClick={() => setActiveTab('foliage')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'foliage'
                  ? 'border-[#1E1B18] text-[#1E1B18]'
                  : 'border-transparent text-[#7A7167] hover:text-[#1E1B18]'
              }`}
            >
              3. Foliage & Accents
            </button>
            <button
              onClick={() => setActiveTab('finishing')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'finishing'
                  ? 'border-[#1E1B18] text-[#1E1B18]'
                  : 'border-transparent text-[#7A7167] hover:text-[#1E1B18]'
              }`}
            >
              4. Ribbon, Vessel & Scent
            </button>
          </div>

          {/* TAB 1: Style & Palette */}
          {activeTab === 'style' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  Select Architectural Silhouette
                </h3>
                <p className="text-xs text-[#6B6158] mb-4">
                  Each structure sets the base floral framework, wiring gauge, and proportions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BOUQUET_STYLES.map(style => (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`p-4 border cursor-pointer transition-all ${
                        selectedStyleId === style.id
                          ? 'border-[#1E1B18] bg-[#F2ECE3]'
                          : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#B5A898]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-serif text-lg text-[#1E1B18]">{style.name}</span>
                        <span className="font-mono tabular-nums text-xs font-medium text-[#1E1B18]">
                          ${style.basePrice} base
                        </span>
                      </div>
                      <p className="text-xs text-[#5A524A] font-light leading-relaxed mb-3">
                        {style.description}
                      </p>
                      <span className="text-[11px] text-[#8C7A6B] block">
                        Recommended Stem Density: ~{style.recommendedStems} stems
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Color Palettes */}
              <div className="pt-6 border-t border-[#E8E2D9]">
                <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  Curated Botanical Palette
                </h3>
                <p className="text-xs text-[#6B6158] mb-4">
                  Governs petal hues, tea dye washes, and coordinating silk ribbons.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PALETTE_OPTIONS.map(palette => (
                    <div
                      key={palette.id}
                      onClick={() => setSelectedPaletteId(palette.id)}
                      className={`p-4 border cursor-pointer transition-all ${
                        selectedPaletteId === palette.id
                          ? 'border-[#1E1B18] bg-[#F2ECE3]'
                          : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#B5A898]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {palette.hexColors.map((hex, i) => (
                          <span
                            key={i}
                            className="w-5 h-5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                      <div className="font-serif text-base text-[#1E1B18]">{palette.name}</div>
                      <p className="text-xs text-[#5A524A] font-light mt-1">
                        {palette.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setActiveTab('stems')}
                  className="px-6 py-2.5 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.16em]"
                >
                  Continue to Focal Blooms →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Focal Blooms (Silk & Fresh) */}
          {activeTab === 'stems' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                    Select Focal Blossoms (Mix Archival Silk & Living Fresh)
                  </h3>
                  <p className="text-xs text-[#6B6158]">
                    Combine permanent silk blooms with freshly harvested living flowers equipped with hydration vials.
                  </p>
                </div>

                {/* Filter Nature (All, Silk, Fresh) */}
                <div className="flex items-center gap-1 bg-[#F2ECE3] p-1 text-xs">
                  <button
                    onClick={() => setStemNatureFilter('all')}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                      stemNatureFilter === 'all' ? 'bg-[#1E1B18] text-[#FAF8F5]' : 'text-[#6B6158]'
                    }`}
                  >
                    All Stems
                  </button>
                  <button
                    onClick={() => setStemNatureFilter('silk')}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                      stemNatureFilter === 'silk' ? 'bg-[#1E1B18] text-[#FAF8F5]' : 'text-[#6B6158]'
                    }`}
                  >
                    Silk Only
                  </button>
                  <button
                    onClick={() => setStemNatureFilter('fresh')}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                      stemNatureFilter === 'fresh' ? 'bg-[#2E5E3D] text-[#FAF8F5]' : 'text-[#6B6158]'
                    }`}
                  >
                    Living Fresh
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {FOCAL_STEMS
                  .filter(stem => stemNatureFilter === 'all' || stem.nature === stemNatureFilter)
                  .map(stem => {
                    const count = stemCounts[stem.id] || 0;
                    return (
                      <div
                        key={stem.id}
                        className={`p-4 border bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                          stem.nature === 'fresh' ? 'border-[#2E5E3D]/40 bg-[#FAFBF9]' : 'border-[#E2D8CC]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-4 h-4 rounded-full border border-black/15 inline-block shrink-0"
                              style={{ backgroundColor: stem.color }}
                            />
                            <span className="font-serif text-base text-[#1E1B18]">{stem.name}</span>
                            <span className="font-mono tabular-nums text-xs text-[#7A7167]">
                              ${stem.pricePerStem}/stem
                            </span>
                            {stem.nature === 'fresh' ? (
                              <span className="text-[10px] text-[#2E5E3D] uppercase tracking-wider font-semibold border border-[#2E5E3D]/40 px-1.5 py-0.5">
                                Living Fresh Bloom
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider font-medium">
                                Archival Silk
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B6158] font-light pl-7">
                            {stem.silkTexture}
                          </p>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <div className="flex items-center border border-[#D5CBC0] bg-[#FAF8F5]">
                            <button
                              onClick={() => updateStem(stem.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#F2ECE3] transition-colors"
                              aria-label={`Decrease ${stem.name}`}
                            >
                              −
                            </button>
                            <span className="w-9 text-center font-mono tabular-nums text-sm font-medium">
                              {count}
                            </span>
                            <button
                              onClick={() => updateStem(stem.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#F2ECE3] transition-colors"
                              aria-label={`Increase ${stem.name}`}
                            >
                              +
                            </button>
                          </div>
                          <span className="w-16 text-right font-mono tabular-nums text-xs text-[#1E1B18]">
                            ${count * stem.pricePerStem}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setActiveTab('style')}
                  className="px-5 py-2.5 border border-[#D5CBC0] text-[#1E1B18] text-xs uppercase tracking-[0.14em]"
                >
                  ← Back to Silhouette
                </button>
                <button
                  onClick={() => setActiveTab('foliage')}
                  className="px-6 py-2.5 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.16em]"
                >
                  Continue to Foliage & Accents →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Foliage & Accents */}
          {activeTab === 'foliage' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  Textural Foliage & Secondary Botanical Accents
                </h3>
                <p className="text-xs text-[#6B6158] mb-4">
                  Add depth, movement, and natural aroma with silk or living aromatic foliage.
                </p>
              </div>

              <div className="space-y-3">
                {ACCENT_STEMS.map(stem => {
                  const count = stemCounts[stem.id] || 0;
                  return (
                    <div
                      key={stem.id}
                      className={`p-4 border bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        stem.nature === 'fresh' ? 'border-[#2E5E3D]/40 bg-[#FAFBF9]' : 'border-[#E2D8CC]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full border border-black/15 inline-block shrink-0"
                            style={{ backgroundColor: stem.color }}
                          />
                          <span className="font-serif text-base text-[#1E1B18]">{stem.name}</span>
                          <span className="font-mono tabular-nums text-xs text-[#7A7167]">
                            ${stem.pricePerStem}/stem
                          </span>
                          {stem.nature === 'fresh' ? (
                            <span className="text-[10px] text-[#2E5E3D] uppercase tracking-wider font-semibold border border-[#2E5E3D]/40 px-1.5 py-0.5">
                              Living Fresh Foliage
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider font-medium">
                              Archival Silk
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B6158] font-light pl-7">
                          {stem.silkTexture}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="flex items-center border border-[#D5CBC0] bg-[#FAF8F5]">
                          <button
                            onClick={() => updateStem(stem.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#F2ECE3] transition-colors"
                            aria-label={`Decrease ${stem.name}`}
                          >
                            −
                          </button>
                          <span className="w-9 text-center font-mono tabular-nums text-sm font-medium">
                            {count}
                          </span>
                          <button
                            onClick={() => updateStem(stem.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#F2ECE3] transition-colors"
                            aria-label={`Increase ${stem.name}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="w-16 text-right font-mono tabular-nums text-xs text-[#1E1B18]">
                          ${count * stem.pricePerStem}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setActiveTab('stems')}
                  className="px-5 py-2.5 border border-[#D5CBC0] text-[#1E1B18] text-xs uppercase tracking-[0.14em]"
                >
                  ← Back to Stems
                </button>
                <button
                  onClick={() => setActiveTab('finishing')}
                  className="px-6 py-2.5 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.16em]"
                >
                  Continue to Finishing Touches →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Finishing Touches */}
          {activeTab === 'finishing' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Ribbon Selection */}
              <div>
                <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  1. Silk Ribbon Tie (Included)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {RIBBON_OPTIONS.map(ribbon => (
                    <div
                      key={ribbon.id}
                      onClick={() => setSelectedRibbonId(ribbon.id)}
                      className={`p-3 border cursor-pointer flex items-center gap-3 transition-colors ${
                        selectedRibbonId === ribbon.id
                          ? 'border-[#1E1B18] bg-[#F2ECE3]'
                          : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#B5A898]'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/15 inline-block shrink-0 shadow-sm"
                        style={{ backgroundColor: ribbon.colorHex }}
                      />
                      <div>
                        <div className="text-xs font-medium text-[#1E1B18]">{ribbon.name}</div>
                        <div className="text-[11px] text-[#7A7167]">{ribbon.fabric}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vessel Pairing */}
              <div className="pt-6 border-t border-[#E8E2D9]">
                <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  2. Vessel & Display Base
                </h3>
                <div className="space-y-2 mt-3">
                  {VESSEL_OPTIONS.map(vessel => (
                    <div
                      key={vessel.id}
                      onClick={() => setSelectedVesselId(vessel.id)}
                      className={`p-3 border cursor-pointer flex items-center justify-between transition-colors ${
                        selectedVesselId === vessel.id
                          ? 'border-[#1E1B18] bg-[#F2ECE3]'
                          : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#B5A898]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium text-[#1E1B18]">{vessel.name}</div>
                        <div className="text-[11px] text-[#6B6158] font-light">{vessel.description}</div>
                      </div>
                      <span className="font-mono tabular-nums text-xs text-[#1E1B18]">
                        {vessel.price === 0 ? 'Included' : `+$${vessel.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fragrance Infusion Mist */}
              <div className="pt-6 border-t border-[#E8E2D9]">
                <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  3. Botanical Olfactory Infusion (Complimentary)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {FRAGRANCE_MISTS.map(mist => (
                    <div
                      key={mist.id}
                      onClick={() => setSelectedMistId(mist.id)}
                      className={`p-3 border cursor-pointer transition-colors ${
                        selectedMistId === mist.id
                          ? 'border-[#1E1B18] bg-[#F2ECE3]'
                          : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#B5A898]'
                      }`}
                    >
                      <div className="text-xs font-medium text-[#1E1B18]">{mist.name}</div>
                      <div className="text-[11px] text-[#7A7167] font-light mt-0.5">{mist.notes}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Calligraphy Keepsake Note */}
              <div className="pt-6 border-t border-[#E8E2D9]">
                <label className="block text-sm uppercase tracking-[0.16em] font-medium text-[#1E1B18] mb-1">
                  4. Hand-Calligraphed Keepsake Note (Optional)
                </label>
                <p className="text-xs text-[#6B6158] mb-3">
                  Inscribed by our resident calligrapher on handmade cotton rag paper with wax seal.
                </p>
                <textarea
                  value={calligraphyNote}
                  onChange={(e) => setCalligraphyNote(e.target.value)}
                  placeholder="e.g. Dearest Camille, celebrating our forever love on our wedding day..."
                  rows={3}
                  className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setActiveTab('foliage')}
                  className="px-5 py-2.5 border border-[#D5CBC0] text-[#1E1B18] text-xs uppercase tracking-[0.14em]"
                >
                  ← Back to Foliage
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={totalStemsCount < 4}
                  className={`px-7 py-3 text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                    totalStemsCount >= 4
                      ? 'bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5]'
                      : 'bg-[#C8C0B5] text-[#7A7167] cursor-not-allowed'
                  }`}
                >
                  Complete Recipe & Add to Bag · ${totalPrice.toLocaleString()}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
