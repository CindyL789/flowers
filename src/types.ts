export interface Product {
  id: string;
  name: string;
  frenchSubtitle: string;
  price: number;
  category: 'bridal' | 'centerpiece' | 'ikebana' | 'petite';
  palette: 'blanc' | 'blush' | 'terracotta' | 'monochrome' | 'garden';
  image: string;
  description: string;
  dimensions: string;
  stemCount: number;
  recipe: string[];
  vessel: string;
  isBestseller?: boolean;
  isNewSeason?: boolean;
  allowsFreshMix?: boolean;
  freshStemsOption?: {
    priceDifference: number;
    freshStemsList: string[];
    refillPrice: number;
    lifespanDays: number;
  };
}

export interface CustomStem {
  id: string;
  name: string;
  category: 'focal' | 'accent' | 'foliage';
  nature: 'silk' | 'fresh';
  pricePerStem: number;
  color: string;
  silkTexture: string;
  freshLifespan?: string;
  includesWaterVial?: boolean;
}

export interface CustomBouquetConfig {
  styleId: string;
  styleName: string;
  paletteId: string;
  paletteName: string;
  stems: Record<string, number>; // stemId -> quantity
  ribbonColor: string;
  ribbonFabric: string;
  vesselType: string;
  fragranceMist: string;
  calligraphyNote: string;
  basePrice: number;
  isHybrid?: boolean;
}

export interface CartItem {
  id: string;
  productId?: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
  isCustom?: boolean;
  compositionType?: 'pure_silk' | 'hybrid' | 'fresh_refill';
  isRefill?: boolean;
  refillTargetOrderId?: string;
  customDetails?: {
    style: string;
    palette: string;
    totalStems: number;
    silkStemsCount?: number;
    freshStemsCount?: number;
    ribbon: string;
    fragrance: string;
    note?: string;
    includesWaterVials?: boolean;
  };
}

export interface FreshRefillBundle {
  id: string;
  name: string;
  frenchTitle: string;
  compatibleWith: string;
  targetArrangementName: string;
  price: number;
  stemsList: string[];
  description: string;
  season: string;
  image: string;
  includesVials: boolean;
  lifespanText: string;
}



export type TrackingStatus = 
  | 'confirmed'
  | 'handcrafting'
  | 'inspection'
  | 'dispatched'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingMilestone {
  status: TrackingStatus;
  title: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface OrderTracking {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  serviceLevel: string;
  estimatedDelivery: string;
  originCity: string;
  destinationCity: string;
  destinationAddress: string;
  recipientName: string;
  currentStatus: TrackingStatus;
  progressPercent: number;
  temperaturePreserved: string;
  packageWeight: string;
  milestones: TrackingMilestone[];
  itemsSummary: string;
  totalAmount: number;
}
