import { OrderTracking } from '../types';

export const SEED_ORDERS: Record<string, OrderTracking> = {
  'SF-8921': {
    orderId: 'SF-8921',
    trackingNumber: 'FX-8849-0192-US',
    carrier: 'FedEx White-Glove Signature Floral Express',
    serviceLevel: 'Climate-Regulated Courier (Signature Required)',
    estimatedDelivery: 'Today by 3:30 PM PST',
    originCity: 'San Francisco Floral Atelier, CA',
    destinationCity: 'Pacific Heights, San Francisco, CA',
    destinationAddress: '2480 Washington St, San Francisco, CA 94115',
    recipientName: 'Eleanor Vance',
    currentStatus: 'out_for_delivery',
    progressPercent: 88,
    temperaturePreserved: '68°F · 45% Humidity (Optimal Silk Preservation)',
    packageWeight: '4.8 lbs in Bespoke Hardwood Linen Crate',
    itemsSummary: '1× The Blanche Royale Bridal Bouquet (Ivory Mist Silk Ribbon)',
    totalAmount: 340,
    milestones: [
      {
        status: 'confirmed',
        title: 'Order Confirmed & Botanical Stems Allocated',
        location: 'San Francisco Atelier',
        timestamp: 'Oct 12, 09:15 AM',
        description: 'Grade-A Japanese real-touch silk stems inspected and reserved by Lead Floral Stylist.',
        completed: true,
        current: false
      },
      {
        status: 'handcrafting',
        title: 'Bespoke Hand-Assembly & Petal Steam Sculpting',
        location: 'Atelier Workroom, San Francisco',
        timestamp: 'Oct 12, 02:40 PM',
        description: 'Arrangement sculpted stem-by-stem, stems hand-wired and tied with raw frayed habotai silk ribbon.',
        completed: true,
        current: false
      },
      {
        status: 'inspection',
        title: 'White-Glove Botanical Inspection Passed',
        location: 'Quality Laboratory, San Francisco',
        timestamp: 'Oct 12, 05:10 PM',
        description: 'UV resistance checked, Rosa Damascena mist infused, placed into reinforced linen presentation crate.',
        completed: true,
        current: false
      },
      {
        status: 'dispatched',
        title: 'Handed Over to Climate-Protected Courier',
        location: 'Courier Bay, San Francisco',
        timestamp: 'Oct 13, 06:30 AM',
        description: 'Scanned into climate-controlled transit vehicle with shock-absorption suspension.',
        completed: true,
        current: false
      },
      {
        status: 'in_transit',
        title: 'Arrived at Regional Metropolitan Dispatch',
        location: 'SF Metro Sorting Facility',
        timestamp: 'Oct 13, 08:45 AM',
        description: 'Package verified intact; loaded onto dedicated White-Glove Courier Van.',
        completed: true,
        current: false
      },
      {
        status: 'out_for_delivery',
        title: 'Out for White-Glove Delivery with Courier Marcus T.',
        location: 'Pacific Heights Delivery Route',
        timestamp: 'Oct 13, 10:15 AM',
        description: 'Courier is currently 4 stops away. Signature required upon arrival.',
        completed: true,
        current: true
      },
      {
        status: 'delivered',
        title: 'Delivered & Hand-Presented',
        location: 'Recipient Address',
        timestamp: 'Estimated 3:30 PM',
        description: 'Direct handoff with receipt verification.',
        completed: false,
        current: false
      }
    ]
  },
  'SF-8402': {
    orderId: 'SF-8402',
    trackingNumber: 'FX-7721-9943-US',
    carrier: 'FedEx White-Glove Floral Express',
    serviceLevel: 'Express Insured Freight',
    estimatedDelivery: 'Tomorrow, Oct 14 by 12:00 PM CST',
    originCity: 'San Francisco Floral Atelier, CA',
    destinationCity: 'Austin, TX',
    destinationAddress: '1104 Colorado St, Suite 400, Austin, TX 78701',
    recipientName: 'Genevieve Moreau',
    currentStatus: 'in_transit',
    progressPercent: 62,
    temperaturePreserved: '70°F · 48% Humidity',
    packageWeight: '12.4 lbs (Includes Terracotta Urn Crate)',
    itemsSummary: '1× The Tuscan Terracotta Urn & Compote Vessel',
    totalAmount: 460,
    milestones: [
      {
        status: 'confirmed',
        title: 'Order Confirmed & Stems Reserved',
        location: 'San Francisco Atelier',
        timestamp: 'Oct 11, 01:20 PM',
        description: 'Silk stems pulled and assigned to Master Florist.',
        completed: true,
        current: false
      },
      {
        status: 'handcrafting',
        title: 'Handcrafted in Atelier',
        location: 'San Francisco Atelier',
        timestamp: 'Oct 11, 04:30 PM',
        description: '36-stem terracotta arrangement arranged in aged limewash vessel.',
        completed: true,
        current: false
      },
      {
        status: 'inspection',
        title: 'White-Glove Inspection & Packaging',
        location: 'San Francisco Atelier',
        timestamp: 'Oct 12, 09:00 AM',
        description: 'Certified for interstate transit with high-density foam anchors.',
        completed: true,
        current: false
      },
      {
        status: 'dispatched',
        title: 'Dispatched from Bay Area Hub',
        location: 'Oakland Air Freight Terminal',
        timestamp: 'Oct 12, 06:15 PM',
        description: 'Departed via overnight air transport.',
        completed: true,
        current: false
      },
      {
        status: 'in_transit',
        title: 'In Transit — Texas Regional Logistics Center',
        location: 'Dallas / Fort Worth Logistics Center, TX',
        timestamp: 'Oct 13, 07:20 AM',
        description: 'Package cleared sorting and en route to Austin Central Facility.',
        completed: true,
        current: true
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        location: 'Austin, TX Route',
        timestamp: 'Scheduled Oct 14',
        description: 'Final courier dispatch.',
        completed: false,
        current: false
      },
      {
        status: 'delivered',
        title: 'Delivered',
        location: 'Recipient Address',
        timestamp: 'Pending',
        description: 'Package delivered to recipient.',
        completed: false,
        current: false
      }
    ]
  }
};

export function createNewOrderTracking(
  orderId: string,
  recipientName: string,
  destinationAddress: string,
  cityStateZip: string,
  itemsSummary: string,
  totalAmount: number
): OrderTracking {
  const trackingNumber = `FX-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-US`;
  
  return {
    orderId,
    trackingNumber,
    carrier: 'FedEx White-Glove Signature Floral Express',
    serviceLevel: 'Climate-Regulated Priority Courier (Insured & Guaranteed)',
    estimatedDelivery: 'Oct 16 by 2:00 PM',
    originCity: 'San Francisco Floral Atelier, CA',
    destinationCity: cityStateZip || 'Los Angeles, CA',
    destinationAddress: destinationAddress || '1020 Wilshire Blvd, Suite 12B',
    recipientName: recipientName || 'Valued Collector',
    currentStatus: 'confirmed',
    progressPercent: 20,
    temperaturePreserved: '68°F · 45% Humidity Control',
    packageWeight: '6.2 lbs in Custom Atelier Gift Crate',
    itemsSummary,
    totalAmount,
    milestones: [
      {
        status: 'confirmed',
        title: 'Order Confirmed & Botanical Recipe Staged',
        location: 'San Francisco Atelier',
        timestamp: 'Just now',
        description: 'Payment authorized via 256-bit secure gateway. Stems allocated to atelier bench.',
        completed: true,
        current: true
      },
      {
        status: 'handcrafting',
        title: 'Handcrafting & Silk Petal Steaming',
        location: 'San Francisco Atelier',
        timestamp: 'Scheduled for this afternoon',
        description: 'Master florists shape each petal with custom brass sculpting irons.',
        completed: false,
        current: false
      },
      {
        status: 'inspection',
        title: 'White-Glove Quality Inspection',
        location: 'San Francisco Atelier',
        timestamp: 'Scheduled tomorrow morning',
        description: 'Stem security, scent infusion, and presentation boxing.',
        completed: false,
        current: false
      },
      {
        status: 'dispatched',
        title: 'Dispatched with Insured Courier',
        location: 'Courier Bay, San Francisco',
        timestamp: 'Scheduled tomorrow afternoon',
        description: 'Assigned to climate-regulated floral transport vehicle.',
        completed: false,
        current: false
      },
      {
        status: 'in_transit',
        title: 'In Transit',
        location: 'Regional Logistics Network',
        timestamp: 'Estimated Oct 15',
        description: 'Tracking telemetry active throughout transit.',
        completed: false,
        current: false
      },
      {
        status: 'out_for_delivery',
        title: 'Out for White-Glove Delivery',
        location: 'Destination Local Route',
        timestamp: 'Estimated Oct 16',
        description: 'Courier arrives with signature verification.',
        completed: false,
        current: false
      },
      {
        status: 'delivered',
        title: 'Delivered',
        location: destinationAddress || 'Destination',
        timestamp: 'Pending',
        description: 'Completed delivery.',
        completed: false,
        current: false
      }
    ]
  };
}
