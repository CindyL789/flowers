import { Product, FreshRefillBundle } from '../types';
import bridalImg from '../assets/images/collection_bridal_white_rose_1791912868160.jpg';
import terracottaImg from '../assets/images/collection_terracotta_autumn_1791912869267.jpg';
import ikebanaImg from '../assets/images/collection_ikebana_sculptural_1791912869238.jpg';
import posyImg from '../assets/images/collection_petite_posy_1791923475616.jpg';
import mantelImg from '../assets/images/collection_mantel_runner_1791923475591.jpg';
import salonImg from '../assets/images/collection_salon_centerpiece_1791923491261.jpg';
import refillBundleImg from '../assets/images/fresh_refill_bundle_1791923491164.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-blanche-bridal',
    name: 'The Blanche Royale Bridal Bouquet',
    frenchSubtitle: 'Bouquet de Mariée Soie Impériale',
    price: 340,
    category: 'bridal',
    palette: 'blanc',
    image: bridalImg,
    description: 'An ethereal composition of real-touch Japanese silk French garden roses, layered heirloom ranunculus, and delicate frosted eucalyptus, finished with raw frayed linen silk ribbon. Optionally mix in living fragrant English garden roses that can be reordered and refreshed on demand.',
    dimensions: '14" W × 18" H',
    stemCount: 28,
    recipe: [
      '8× Real-Touch David Austin Garden Roses (Clair de Lune)',
      '6× Double-Petaled Heirloom White Ranunculus',
      '4× Grand Japanese Silk Hydrangea Bloom Clusters',
      '5× Silver Dollar Eucalyptus with Frosted Patina',
      '3× White Astrantia Wild Starflowers',
      '2× Botanical Ruscus & Olive Stems'
    ],
    vessel: 'Hand-tied with 2.5" Frayed Silk Organza Ribbon in Ivory Mist',
    isBestseller: true,
    isNewSeason: false,
    allowsFreshMix: true,
    freshStemsOption: {
      priceDifference: 35,
      freshStemsList: [
        '4× Living Fragrant David Austin English Garden Roses (in discreet silicone water vials)',
        '3× Living Silver Dollar Fragrant Eucalyptus Sprigs'
      ],
      refillPrice: 65,
      lifespanDays: 12
    }
  },
  {
    id: 'prod-terracotta-hearth',
    name: 'The Tuscan Terracotta Urn',
    frenchSubtitle: 'Grand Centre de Table Sienne',
    price: 460,
    category: 'centerpiece',
    palette: 'terracotta',
    image: terracottaImg,
    description: 'A sumptuous, autumnal dining statement featuring velvet terracotta dahlias, antique apricot garden roses, wild blackberry botanical clusters, and weathered Tuscan olive branches nestled in a porous stone ceramic vessel. Available in full archival silk or hybrid living blend.',
    dimensions: '22" W × 20" H',
    stemCount: 36,
    recipe: [
      '7× Velvet Terracotta Decorative Dahlias',
      '6× Antique Apricot & Peach Garden Roses',
      '5× Dried Wild Blackberry Clusters',
      '6× Preserved Tuscan Olive Branches with Faux Fruit',
      '6× Honey Ranunculus & Astrantia',
      '6× Feathery Pampas Grass Stems & Bronze Ruscus'
    ],
    vessel: 'Aged Limewash Terracotta Stone Compote Vessel (Included)',
    isBestseller: true,
    isNewSeason: true,
    allowsFreshMix: true,
    freshStemsOption: {
      priceDifference: 45,
      freshStemsList: [
        '4× Living Dinnerplate Terracotta Garden Dahlias (Hydration Vials)',
        '4× Living Fresh Seeded Eucalyptus & Olive Branches'
      ],
      refillPrice: 85,
      lifespanDays: 10
    }
  },
  {
    id: 'prod-sculptural-ikebana',
    name: 'The Kyoto Sculptural Ikebana',
    frenchSubtitle: 'Composition Botanique Épurée',
    price: 385,
    category: 'ikebana',
    palette: 'monochrome',
    image: ikebanaImg,
    description: 'A study in architectural restraint inspired by Japanese Sogetsu floral philosophy. Cascading white real-touch Phalaenopsis orchids counterbalance natural aged drift branches in a matte volcanic stoneware urn.',
    dimensions: '26" W × 24" H',
    stemCount: 16,
    recipe: [
      '4× Grand Stem White Phalaenopsis Orchids with Tactile Petal Coating',
      '3× Sculptural Natural Driftwood & Charred Branch Arcs',
      '4× Architectural Emerald Cycad Foliage Fronds',
      '5× Textured Botanical Seed Pods & Moss Bed Base'
    ],
    vessel: 'Hand-thrown Matte Volcanic Glaze Ceramic Urn (Included)',
    isBestseller: false,
    isNewSeason: true,
    allowsFreshMix: false
  },
  {
    id: 'prod-atelier-monarch',
    name: 'The Grand Paris Atelier Showcase',
    frenchSubtitle: 'Symphonie Botanique du Marais',
    price: 520,
    category: 'centerpiece',
    palette: 'blush',
    image: salonImg,
    description: 'Our signature salon statement piece. Soft peach peony blossoms, creamy blush heritage tea roses, and delicate trailing sweet peas hand-composed in an authentic fluted French limestone urn. Can be infused with living fresh garden peonies.',
    dimensions: '24" W × 22" H',
    stemCount: 42,
    recipe: [
      '10× French Silk Tea Roses in Soft Blush & Champagne',
      '8× Grand Duchess Heirloom Peonies',
      '6× Trailing Sweet Pea & Delphinium Sprigs',
      '8× Italian Pittosporum & Silver Dollar Foliage',
      '6× Silk Lisianthus & Waxflower Sprays',
      '4× White Lilac Infusion Stems'
    ],
    vessel: 'Fluted Architectural French Limestone Urn (Included)',
    isBestseller: false,
    isNewSeason: false,
    allowsFreshMix: true,
    freshStemsOption: {
      priceDifference: 55,
      freshStemsList: [
        '5× Living French Sweet Peas (Fragrant Lilac)',
        '3× Living Dutch Sarah Bernhardt Peonies'
      ],
      refillPrice: 95,
      lifespanDays: 9
    }
  },
  {
    id: 'prod-petite-cashmere-posy',
    name: 'The Cashmere Bedroom Posy',
    frenchSubtitle: 'Petite Composition Boudoir',
    price: 195,
    category: 'petite',
    palette: 'blush',
    image: posyImg,
    description: 'An intimate, tactile bedside or vanity arrangement with miniature silk spray roses, French vanilla ranunculus, and powdery lamb’s ear foliage in a fluted alabaster cup.',
    dimensions: '9" W × 11" H',
    stemCount: 14,
    recipe: [
      '5× French Vanilla Spray Roses',
      '3× Petite Blush Ranunculus',
      '4× Velvet Lamb’s Ear & Seeded Eucalyptus',
      '2× Star Jasmine Botanical Stems'
    ],
    vessel: 'Fluted Honed Alabaster Stone Vessel (Included)',
    isBestseller: false,
    isNewSeason: false,
    allowsFreshMix: true,
    freshStemsOption: {
      priceDifference: 25,
      freshStemsList: [
        '3× Living Fresh Vanilla Spray Roses (Miniature Water Vials)'
      ],
      refillPrice: 45,
      lifespanDays: 14
    }
  },
  {
    id: 'prod-champagne-mantelpiece',
    name: 'The Champagne Meadow Mantel Swag',
    frenchSubtitle: 'Guirlande de Cheminée Botanique',
    price: 490,
    category: 'centerpiece',
    palette: 'garden',
    image: mantelImg,
    description: 'A 4-foot elongated architectural floral runner designed for fireplace mantels, long head tables, or console surfaces. Features wild cream delphinium, butterscotch garden roses, and draped smilax vine.',
    dimensions: '48" L × 14" D × 12" H',
    stemCount: 48,
    recipe: [
      '12× Butterscotch Heritage Roses',
      '8× Cream Delphinium & Foxglove Spires',
      '12× Draped Smilax & English Ivy Tendrils',
      '10× Wild Garden Hydrangeas in Biscuit & Cream',
      '6× Champagne Peony Accents'
    ],
    vessel: 'Low-profile Flexible Steel Weighted Floral Cage (Concealed)',
    isBestseller: true,
    isNewSeason: false,
    allowsFreshMix: false
  }
];

export const FRESH_REFILL_BUNDLES: FreshRefillBundle[] = [
  {
    id: 'refill-blanche-classic',
    name: 'The Blanche Royale Fresh Stems Replenishment',
    frenchTitle: 'Recharge Fraîche · Roses Anglaises Vivantes',
    compatibleWith: 'prod-blanche-bridal',
    targetArrangementName: 'The Blanche Royale Bridal Bouquet',
    price: 65,
    stemsList: [
      '4× Living David Austin English Garden Roses (Ivory Cream)',
      '3× Fresh California Silver Dollar Eucalyptus Stems',
      '2× Living White Astrantia Blooms'
    ],
    description: 'Direct replacement bundle for the living stems in your Blanche Royale bouquet. Stems arrive freshly cut, hydrated in silicone water vials, and pre-trimmed to slot seamlessly into your permanent silk base.',
    season: 'Year-Round Signature Harvest',
    image: refillBundleImg,
    includesVials: true,
    lifespanText: '10–14 days freshness'
  },
  {
    id: 'refill-terracotta-autumn',
    name: 'The Tuscan Terracotta Living Stems Refill',
    frenchTitle: 'Recharge Fraîche · Dahlias & Olivier Vivants',
    compatibleWith: 'prod-terracotta-hearth',
    targetArrangementName: 'The Tuscan Terracotta Urn',
    price: 85,
    stemsList: [
      '4× Living Tuscan Terracotta Dinnerplate Dahlias',
      '4× Freshly Harvested Sonoma Olive Branches',
      '2× Living Apricot Garden Spray Roses'
    ],
    description: 'Replace faded living stems in your terracotta urn with fresh, richly fragrant California-grown blooms. Preserves your permanent silk structure while renewing the scent and natural botanical moisture.',
    season: 'Autumn / Warm Harvest Season',
    image: terracottaImg,
    includesVials: true,
    lifespanText: '9–12 days freshness'
  },
  {
    id: 'refill-paris-peony-swap',
    name: 'The Paris Salon Seasonal Peony Twist',
    frenchTitle: 'Variation Saisonnière · Pivoines de Printemps',
    compatibleWith: 'prod-atelier-monarch',
    targetArrangementName: 'The Grand Paris Atelier Showcase',
    price: 95,
    stemsList: [
      '5× Living Dutch Sarah Bernhardt Pink Peonies',
      '4× Fresh Sweet Pea Stems with Natural Perfume',
      '3× Living Italian Pittosporum Branches'
    ],
    description: 'Transform your existing Paris Atelier centerpiece for the current season by slotting in live blooming peonies and fragrant sweet peas alongside your permanent heirloom silk flowers.',
    season: 'Spring / Summer Flush',
    image: salonImg,
    includesVials: true,
    lifespanText: '8–11 days freshness'
  },
  {
    id: 'refill-boudoir-posy',
    name: 'The Cashmere Bedroom Living Refill',
    frenchTitle: 'Recharge Boudoir · Roses Parfumées',
    compatibleWith: 'prod-petite-cashmere-posy',
    targetArrangementName: 'The Cashmere Bedroom Posy',
    price: 45,
    stemsList: [
      '4× Living Fresh Vanilla Spray Roses',
      '2× Fresh Lamb’s Ear Botanical Sprigs'
    ],
    description: 'A delicate fresh stem refresh designed for your bedside or vanity vase. Brings fresh garden perfume into your bedroom while retaining your archival silk foundation.',
    season: 'Year-Round Harvest',
    image: posyImg,
    includesVials: true,
    lifespanText: '12–15 days freshness'
  }
];
