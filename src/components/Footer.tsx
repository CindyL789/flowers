import React, { useState } from 'react';
import { AppTab } from './Navbar';
import { useBrand } from '../context/BrandContext';

interface FooterProps {
  onSelectTab: (tab: AppTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { businessName, setIsEditNameOpen } = useBrand();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E2D9] pt-16 pb-12 text-xs text-[#5A524A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#E8E2D9]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl tracking-[0.16em] uppercase text-[#1E1B18] block">
                {businessName}
              </span>
              <button
                onClick={() => setIsEditNameOpen(true)}
                className="text-[10px] uppercase tracking-wider text-[#8C7A6B] hover:text-[#1E1B18] px-1.5 py-0.5 border border-[#D5CBC0]"
                title="Change business name"
              >
                Edit
              </button>
            </div>
            <p className="font-light text-[#6B6158] max-w-sm leading-relaxed">
              Haute Floristerie Immortelle. Handcrafted in our bespoke studio from Grade-A Japanese spun silk and fresh living botanical mix-ins. 
              Timeless floral artistry crafted for weddings, residences, and architectural environments.
            </p>
            <div className="text-[11px] text-[#8C7A6B] uppercase tracking-wider">
              Studio: Pacific Heights, San Francisco · Nationwide White-Glove Transit
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <div className="font-medium uppercase tracking-[0.16em] text-[#1E1B18]">
              The Atelier
            </div>
            <ul className="space-y-2 font-light">
              <li>
                <button
                  onClick={() => onSelectTab('collections')}
                  className="hover:text-[#1E1B18] transition-colors"
                >
                  Permanent Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('customizer')}
                  className="hover:text-[#1E1B18] transition-colors"
                >
                  Custom Bouquet Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('refill')}
                  className="hover:text-[#2E5E3D] font-medium transition-colors text-[#2E5E3D]"
                >
                  Reorder Fresh Stems Refill
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tracking')}
                  className="hover:text-[#1E1B18] transition-colors"
                >
                  Real-Time Courier Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Archival Policy */}
          <div className="space-y-3">
            <div className="font-medium uppercase tracking-[0.16em] text-[#1E1B18]">
              Botanical Care & Refill
            </div>
            <ul className="space-y-2 font-light text-[#6B6158]">
              <li>Permanent silk stems: Lifetime archival UV resilience</li>
              <li>Living fresh stems: Concealed silicone water reservoirs</li>
              <li>Fresh refills: 90-second slide-and-replace design</li>
              <li>Complimentary flower food packets with every refill delivery</li>
            </ul>
          </div>

          {/* Newsletter / Atelier Gazette */}
          <div className="space-y-3">
            <div className="font-medium uppercase tracking-[0.16em] text-[#1E1B18]">
              The Botanical Gazette
            </div>
            <p className="font-light leading-relaxed text-[#6B6158]">
              Receive private invitations to seasonal fresh bloom harvests, hybrid recipes, and floral design previews.
            </p>
            
            {subscribed ? (
              <p className="text-[#2E5E3D] font-medium text-xs">
                ✓ Thank you. Your atelier correspondence is registered.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] text-xs focus:outline-none focus:border-[#1E1B18]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.14em] hover:bg-[#38332E] transition-colors"
                >
                  Request Gazette Privileges
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C7A6B]">
          <div>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1E1B18] cursor-pointer">White-Glove Shipping Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#1E1B18] cursor-pointer">Living Refill Guarantee</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsEditNameOpen(true)}
              className="hover:text-[#1E1B18] cursor-pointer underline underline-offset-2"
            >
              Change Business Name
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
