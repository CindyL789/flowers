import { CustomStem } from '../types';

export interface BouquetStyleOption {
  id: string;
  name: string;
  frenchTitle: string;
  basePrice: number;
  description: string;
  recommendedStems: number;
}

export interface PaletteOption {
  id: string;
  name: string;
  hexColors: string[];
  description: string;
}

export const BOUQUET_STYLES: BouquetStyleOption[] = [
  {
    id: 'bridal-hand-tied',
    name: 'Bridal Couture Hand-Tied',
    frenchTitle: 'Bouquet de Cérémonie',
    basePrice: 160,
    description: 'Generous organic silhouette with natural botanical movement and flowing hand-dyed ribbons.',
    recommendedStems: 24
  },
  {
    id: 'architectural-ikebana',
    name: 'Architectural Ikebana Stems',
    frenchTitle: 'Ligne Sculpturale',
    basePrice: 140,
    description: 'Disciplined asymmetrical lines focusing on stem form, negative space, and sculptural poise.',
    recommendedStems: 14
  },
  {
    id: 'grand-dining-centerpiece',
    name: 'Grand Dining Statement',
    frenchTitle: 'Grand Centre de Table',
    basePrice: 220,
    description: 'Sumptuous 360-degree dome arrangement designed for reception tables and dramatic entry consoles.',
    recommendedStems: 36
  },
  {
    id: 'petite-posy',
    name: 'Intimate Dressing Posy',
    frenchTitle: 'Petite Boudoir',
    basePrice: 95,
    description: 'Delicate, tightly clustered blooms suited for bedside tables, vanity mirrors, and gifting.',
    recommendedStems: 12
  }
];

export const PALETTE_OPTIONS: PaletteOption[] = [
  {
    id: 'blanc-sage',
    name: 'Chantilly Blanc & Silver Sage',
    hexColors: ['#F9F8F6', '#E5E0D8', '#8A9A86', '#4B5547'],
    description: 'Pure creamy whites, alabaster ranunculus, and frosted eucalyptus'
  },
  {
    id: 'antique-blush',
    name: 'Antique Blush & Cashmere',
    hexColors: ['#F5E6E3', '#E8C5BE', '#D4A373', '#606C38'],
    description: 'Soft peach English garden roses, tea rose blush, and warm honey foliage'
  },
  {
    id: 'tuscan-terracotta',
    name: 'Tuscan Terracotta & Hearth Ochre',
    hexColors: ['#C86D51', '#DDA15E', '#BC6C25', '#4A3B32'],
    description: 'Velvet terracotta dahlias, burnt ochre, and sun-ripened olive branches'
  },
  {
    id: 'monochrome-noir',
    name: 'Velvet Plum & Smoked Noir',
    hexColors: ['#3A242B', '#5A3D46', '#B08968', '#1C1917'],
    description: 'Deep midnight bordeaux, smoked blackberry botanicals, and dark foliage'
  }
];

export const FOCAL_STEMS: CustomStem[] = [
  {
    id: 'stem-garden-rose',
    name: 'Archival Silk Garden Rose',
    category: 'focal',
    nature: 'silk',
    pricePerStem: 14,
    color: '#F4ECE1',
    silkTexture: 'Permanent real-touch Japanese silk with layered 80-petal cup'
  },
  {
    id: 'stem-fresh-garden-rose',
    name: 'Fresh English Garden Rose (Living)',
    category: 'focal',
    nature: 'fresh',
    pricePerStem: 12,
    color: '#FFF9F0',
    silkTexture: 'Living cut bloom with silicone hydration vial · 10–14 days freshness · Reorderable',
    freshLifespan: '10–14 days',
    includesWaterVial: true
  },
  {
    id: 'stem-peony',
    name: 'Archival Silk Grand Duchess Peony',
    category: 'focal',
    nature: 'silk',
    pricePerStem: 16,
    color: '#E8D4CF',
    silkTexture: 'Permanent crinkled silk organza with natural feathered petal edges'
  },
  {
    id: 'stem-fresh-peony',
    name: 'Fresh Dutch Peony (Living)',
    category: 'focal',
    nature: 'fresh',
    pricePerStem: 15,
    color: '#F2D6D3',
    silkTexture: 'Living seasonal peony in hydration reservoir · Natural floral aroma · Reorderable',
    freshLifespan: '8–11 days',
    includesWaterVial: true
  },
  {
    id: 'stem-orchid',
    name: 'White Phalaenopsis Orchid Spray',
    category: 'focal',
    nature: 'silk',
    pricePerStem: 18,
    color: '#FAFAFA',
    silkTexture: 'Permanent architectural wax-touch silk with lifelike center'
  },
  {
    id: 'stem-ranunculus',
    name: 'Double French Ranunculus',
    category: 'focal',
    nature: 'silk',
    pricePerStem: 12,
    color: '#F7E7CE',
    silkTexture: 'Permanent concentric tightly spun micro-silk petals'
  },
  {
    id: 'stem-fresh-dahlia',
    name: 'Fresh Tuscan Garden Dahlia (Living)',
    category: 'focal',
    nature: 'fresh',
    pricePerStem: 11,
    color: '#C86D51',
    silkTexture: 'Living farm-grown dinnerplate dahlia with water reservoir · Reorderable',
    freshLifespan: '9–12 days',
    includesWaterVial: true
  },
  {
    id: 'stem-calla',
    name: 'Fluted Alabaster Calla Lily',
    category: 'focal',
    nature: 'silk',
    pricePerStem: 13,
    color: '#FAF6EE',
    silkTexture: 'Permanent sculptural molded polyurethane-silk blend'
  }
];

export const ACCENT_STEMS: CustomStem[] = [
  {
    id: 'stem-eucalyptus',
    name: 'Silver Dollar Frosted Eucalyptus',
    category: 'foliage',
    nature: 'silk',
    pricePerStem: 8,
    color: '#8A9A86',
    silkTexture: 'Permanent soft-touch matte round foliage with silvery frost'
  },
  {
    id: 'stem-fresh-eucalyptus',
    name: 'Fresh California Eucalyptus (Living)',
    category: 'foliage',
    nature: 'fresh',
    pricePerStem: 6,
    color: '#71856E',
    silkTexture: 'Fresh living aromatic branches releasing natural essential oils · 14–20 days',
    freshLifespan: '14–20 days',
    includesWaterVial: true
  },
  {
    id: 'stem-olive',
    name: 'Preserved Tuscan Olive Branch',
    category: 'foliage',
    nature: 'silk',
    pricePerStem: 9,
    color: '#556B2F',
    silkTexture: 'Permanent bicolor slender leaves with handcrafted faux olive drupes'
  },
  {
    id: 'stem-fresh-sweetpea',
    name: 'Fresh French Sweet Pea (Living)',
    category: 'accent',
    nature: 'fresh',
    pricePerStem: 8,
    color: '#E0C8D8',
    silkTexture: 'Living trailing blossoms with delicate honey perfume · 7–10 days · Reorderable',
    freshLifespan: '7–10 days',
    includesWaterVial: true
  },
  {
    id: 'stem-astrantia',
    name: 'White Astrantia Starflower',
    category: 'accent',
    nature: 'silk',
    pricePerStem: 7,
    color: '#EFECE6',
    silkTexture: 'Permanent delicate starburst silk calyx'
  },
  {
    id: 'stem-fern',
    name: 'Feathery Maidenhair Fern',
    category: 'foliage',
    nature: 'silk',
    pricePerStem: 8,
    color: '#4B6B48',
    silkTexture: 'Permanent micro-perforated sheer silk fronds'
  },
  {
    id: 'stem-berries',
    name: 'Smoked Blackberry Cluster',
    category: 'accent',
    nature: 'silk',
    pricePerStem: 7,
    color: '#382B35',
    silkTexture: 'Permanent hand-dipped matte botanical cluster'
  }
];

export const RIBBON_OPTIONS = [
  { id: 'ribbon-pearl', name: 'Raw Frayed Silk in Pearl Mist', colorHex: '#F6F3EE', fabric: '100% Habotai Silk' },
  { id: 'ribbon-sage', name: 'Eucalyptus Sage Chiffon', colorHex: '#A2B09F', fabric: 'Sheer French Chiffon' },
  { id: 'ribbon-blush', name: 'Antique Blush Organza', colorHex: '#E8C5BE', fabric: 'Crinkled Organza Silk' },
  { id: 'ribbon-noir', name: 'Velvet Charcoal Ribbon', colorHex: '#262626', fabric: 'Plush Double-Faced Velvet' }
];

export const FRAGRANCE_MISTS = [
  { id: 'mist-rosa', name: 'Rosa Damascena Infusion', notes: 'Grasse Rose, Bulgarian Rose Otto, Cashmere Woods' },
  { id: 'mist-neroli', name: 'Neroli Blossom & Petitgrain', notes: 'Orange Flower Water, Citrus Leaf, Amber Accord' },
  { id: 'mist-whitetea', name: 'Imperial White Tea & Thyme', notes: 'Silver Needle Tea, Crushed Thyme, Cedar Leaf' },
  { id: 'mist-none', name: 'Pure Unscented (Allergen-Free)', notes: 'Natural pristine silk with zero olfactory additives' }
];

export const VESSEL_OPTIONS = [
  { id: 'vessel-ribbon-only', name: 'Hand-Tied Presentation Stem Wrap', description: 'Finished with custom silk ribbon, ready to hold or place in your own vase', price: 0 },
  { id: 'vessel-limestone', name: 'Fluted French Limestone Urn', description: 'Heavy natural stone compote with aged botanical patina', price: 65 },
  { id: 'vessel-ceramic-matte', name: 'Hand-Thrown Volcanic Matte Ceramic', description: 'Artisanal stoneware with textured mineral glaze', price: 45 },
  { id: 'vessel-smoked-glass', name: 'Smoked Amber Handblown Glass Cylinder', description: 'Heavy weighted base with subtle organic bubble inclusions', price: 38 }
];
