import React, { createContext, useContext, useState } from 'react';

interface BrandContextType {
  businessName: string;
  setBusinessName: (name: string) => void;
  isEditNameOpen: boolean;
  setIsEditNameOpen: (open: boolean) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessName, setBusinessNameState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('atelier_business_name');
      if (saved && saved.trim() && saved !== 'SÈVE & SOIE' && saved !== 'Cindy Louis Floral Atelier') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'Everlasting Floral';
  });

  const [isEditNameOpen, setIsEditNameOpen] = useState(false);

  const setBusinessName = (newName: string) => {
    const trimmed = newName.trim();
    if (trimmed) {
      setBusinessNameState(trimmed);
      try {
        localStorage.setItem('atelier_business_name', trimmed);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <BrandContext.Provider value={{ businessName, setBusinessName, isEditNameOpen, setIsEditNameOpen }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
