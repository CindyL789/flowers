import React from 'react';
import { useBrand } from '../context/BrandContext';

export type AppTab = 'collections' | 'customizer' | 'refill' | 'tracking';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart
}) => {
  const { businessName, setIsEditNameOpen } = useBrand();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line) with discreet edit affordance */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('collections')}
            className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.16em] font-normal text-[#1E1B18] hover:text-[#7A5C43] transition-colors whitespace-nowrap uppercase text-left truncate max-w-[280px] sm:max-w-none"
          >
            {businessName}
          </button>
          <button
            onClick={() => setIsEditNameOpen(true)}
            title="Edit business name"
            aria-label="Edit business name"
            className="text-[10px] uppercase tracking-widest text-[#8C7A6B] hover:text-[#1E1B18] px-1.5 py-0.5 border border-[#D5CBC0] hover:border-[#1E1B18] transition-colors whitespace-nowrap shrink-0"
          >
            Edit
          </button>
        </div>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-medium text-[#5A524A]">
          <button
            onClick={() => onSelectTab('collections')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b transition-colors ${
              currentTab === 'collections'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent hover:border-[#8C7A6B] hover:text-[#1E1B18]'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => onSelectTab('customizer')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b transition-colors ${
              currentTab === 'customizer'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent hover:border-[#8C7A6B] hover:text-[#1E1B18]'
            }`}
          >
            Bouquet Atelier
          </button>
          <button
            onClick={() => onSelectTab('refill')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b transition-colors flex items-center gap-1.5 ${
              currentTab === 'refill'
                ? 'border-[#2E5E3D] text-[#2E5E3D] font-semibold'
                : 'border-transparent hover:border-[#2E5E3D] hover:text-[#2E5E3D]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E3D]" />
            <span>Fresh Refill</span>
          </button>
          <button
            onClick={() => onSelectTab('tracking')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b transition-colors ${
              currentTab === 'tracking'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent hover:border-[#8C7A6B] hover:text-[#1E1B18]'
            }`}
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Shopping Bag) */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`Shopping Bag with ${cartCount} items`}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#D5CBC0] bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1E1B18] text-xs uppercase tracking-[0.12em] font-medium transition-all"
          >
            <span>Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-[11px] font-mono tabular-nums flex items-center justify-center font-normal transition-transform group-hover:scale-105">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile subnav bar so mobile users can navigate seamlessly */}
      <div className="lg:hidden flex items-center justify-around px-3 py-2.5 border-t border-[#E8E2D9] text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium text-[#5A524A] bg-[#FAF8F5] overflow-x-auto">
        <button
          onClick={() => onSelectTab('collections')}
          className={`whitespace-nowrap px-2 ${currentTab === 'collections' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Collections
        </button>
        <button
          onClick={() => onSelectTab('customizer')}
          className={`whitespace-nowrap px-2 ${currentTab === 'customizer' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Atelier
        </button>
        <button
          onClick={() => onSelectTab('refill')}
          className={`whitespace-nowrap px-2 text-[#2E5E3D] ${currentTab === 'refill' ? 'font-bold underline' : ''}`}
        >
          Fresh Refill
        </button>
        <button
          onClick={() => onSelectTab('tracking')}
          className={`whitespace-nowrap px-2 ${currentTab === 'tracking' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Tracking
        </button>
      </div>
    </header>
  );
};
