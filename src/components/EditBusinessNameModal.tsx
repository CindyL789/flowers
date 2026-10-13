import React, { useState, useEffect } from 'react';
import { useBrand } from '../context/BrandContext';

export const EditBusinessNameModal: React.FC = () => {
  const { businessName, setBusinessName, isEditNameOpen, setIsEditNameOpen } = useBrand();
  const [inputName, setInputName] = useState(businessName);

  useEffect(() => {
    if (isEditNameOpen) {
      setInputName(businessName);
    }
  }, [isEditNameOpen, businessName]);

  if (!isEditNameOpen) return null;

  const presets = [
    'Everlasting Floral',
    'Everlasting Floral Studio',
    'Everlasting Floral & Botanicals',
    'Silk & Bloom Studio',
    'The Silk Rose Co.'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setBusinessName(inputName.trim());
      setIsEditNameOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-[#FAF8F5] max-w-lg w-full border border-[#D5CBC0] shadow-2xl p-6 sm:p-8 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-modal-title"
      >
        <button
          onClick={() => setIsEditNameOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#D5CBC0] bg-[#FAF8F5] hover:bg-[#EAE4DC] text-[#1E1B18] flex items-center justify-center text-sm transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block mb-1">
            Atelier Brand Settings
          </span>
          <h2 id="brand-modal-title" className="font-serif text-2xl text-[#1E1B18] font-normal">
            Update Business Name
          </h2>
          <p className="text-xs text-[#5A524A] font-light mt-1.5 leading-relaxed">
            Enter your business name below. It will update immediately across the storefront, header, invoices, customizer, and delivery tracking.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.14em] font-medium text-[#1E1B18] mb-1.5">
              Your Business Name
            </label>
            <input
              type="text"
              required
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="e.g. Cindy Louis Floral Atelier"
              className="w-full p-3 font-serif text-lg bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
              autoFocus
            />
          </div>

          <div>
            <span className="text-[11px] text-[#8C7A6B] uppercase tracking-wider block mb-2">
              Or pick an curated atelier suggestion:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setInputName(preset)}
                  className={`text-xs px-3 py-1.5 border transition-colors ${
                    inputName === preset
                      ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5]'
                      : 'border-[#D5CBC0] bg-[#F2ECE3] text-[#5A524A] hover:bg-[#EAE4DC] hover:text-[#1E1B18]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditNameOpen(false)}
              className="px-5 py-2.5 border border-[#D5CBC0] text-xs uppercase tracking-[0.14em] hover:bg-[#F2ECE3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#38332E] text-[#FAF8F5] text-xs uppercase tracking-[0.16em] font-medium transition-colors"
            >
              Save Business Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
