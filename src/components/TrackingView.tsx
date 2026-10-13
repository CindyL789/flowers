import React, { useState, useEffect } from 'react';
import { OrderTracking } from '../types';
import { SEED_ORDERS } from '../data/seedOrders';

interface TrackingViewProps {
  initialOrderId?: string;
  allOrders?: Record<string, OrderTracking>;
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  initialOrderId = 'SF-8921',
  allOrders = SEED_ORDERS
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [activeTracking, setActiveTracking] = useState<OrderTracking>(
    allOrders[initialOrderId] || allOrders['SF-8921'] || Object.values(allOrders)[0]
  );
  const [livePulse, setLivePulse] = useState(true);
  const [smsSubscribed, setSmsSubscribed] = useState(false);
  const [simulatedStep, setSimulatedStep] = useState(activeTracking.progressPercent);

  // Sync when initialOrderId changes
  useEffect(() => {
    if (initialOrderId && allOrders[initialOrderId]) {
      setActiveTracking(allOrders[initialOrderId]);
      setSearchInput(initialOrderId);
      setSimulatedStep(allOrders[initialOrderId].progressPercent);
    }
  }, [initialOrderId, allOrders]);

  // Pulse effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse(prev => !prev);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchInput.trim().toUpperCase();
    const found = Object.values(allOrders).find(
      o => o.orderId.toUpperCase() === cleanQuery || o.trackingNumber.toUpperCase().includes(cleanQuery)
    );

    if (found) {
      setActiveTracking(found);
      setSimulatedStep(found.progressPercent);
    } else {
      alert(`No order found matching "${searchInput}". Try order #SF-8921 or #SF-8402.`);
    }
  };

  const handleQuickSelect = (id: string) => {
    if (allOrders[id]) {
      setActiveTracking(allOrders[id]);
      setSearchInput(id);
      setSimulatedStep(allOrders[id].progressPercent);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Section Header */}
      <div className="pb-8 border-b border-[#E8E2D9] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#8C7A6B] block mb-2">
            White-Glove Courier Logistics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            Real-Time Shipment Tracking
          </h2>
        </div>
        <p className="text-sm text-[#5A524A] max-w-md font-light leading-relaxed">
          Every silk arrangement travels inside a climate-regulated wooden presentation crate with real-time transit telemetry and shock sensor monitoring.
        </p>
      </div>

      {/* Search & Quick Order Pills */}
      <div className="py-6 border-b border-[#E8E2D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Order ID (e.g. SF-8921) or Tracking #"
            className="flex-1 px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#D5CBC0] text-[#1E1B18] uppercase tracking-wider focus:outline-none focus:border-[#1E1B18]"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#38332E] transition-colors"
          >
            Track
          </button>
        </form>

        {/* Quick Test Orders Selector */}
        <div className="flex items-center gap-3 text-xs text-[#6B6158] flex-wrap">
          <span className="font-medium text-[#1E1B18] uppercase tracking-wider text-[11px]">Quick View Orders:</span>
          {Object.keys(allOrders).map((orderKey) => (
            <button
              key={orderKey}
              onClick={() => handleQuickSelect(orderKey)}
              className={`px-3 py-1 text-xs font-mono transition-colors border ${
                activeTracking.orderId === orderKey
                  ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5]'
                  : 'border-[#D5CBC0] bg-[#FAF8F5] text-[#1E1B18] hover:bg-[#F2ECE3]'
              }`}
            >
              #{orderKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracking Details Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        
        {/* Left Column (7 cols): Map & Telemetry Strip */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Card */}
          <div className="bg-[#F2ECE3] border border-[#DDD5C9] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D5CBC0]">
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C7A6B] font-medium block">
                  Order Reference #{activeTracking.orderId}
                </span>
                <h3 className="font-serif text-2xl text-[#1E1B18] font-normal mt-0.5">
                  {activeTracking.itemsSummary}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-[#6B6158] block">Estimated Delivery</span>
                <span className="font-serif text-lg text-[#1E1B18] font-medium">
                  {activeTracking.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Status Headline with Live Indicator */}
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span 
                  className={`w-2.5 h-2.5 rounded-full ${livePulse ? 'bg-[#3D7A50]' : 'bg-[#2E5E3D]'} transition-colors`} 
                  title="Live GPS Telemetry Active"
                />
                <span className="text-xs uppercase tracking-[0.14em] font-medium text-[#1E1B18]">
                  {activeTracking.currentStatus === 'out_for_delivery'
                    ? 'Out for White-Glove Delivery'
                    : activeTracking.currentStatus === 'in_transit'
                    ? 'In Transit with Climate Courier'
                    : 'Atelier Preparation & Steaming'}
                </span>
              </div>
              <span className="text-xs font-mono tabular-nums text-[#6B6158]">
                Tracking: {activeTracking.trackingNumber}
              </span>
            </div>
          </div>

          {/* Interactive Simulated Route Map */}
          <div className="bg-[#FAF8F5] border border-[#DDD5C9] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] text-xs">
              <span className="uppercase tracking-[0.14em] font-medium text-[#1E1B18]">
                Live Geographic Transit Route
              </span>
              <span className="text-[#6B6158] font-mono tabular-nums">
                Route Progress: {simulatedStep}%
              </span>
            </div>

            {/* Visual SVG Transit Schematic Map */}
            <div className="relative aspect-[16/9] w-full my-4 bg-[#F5EFE6] border border-[#E2D8CC] overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2D8CC" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="600" height="300" fill="url(#grid)" />

                {/* Simulated Topography / Route Curve */}
                <path
                  d="M 80 180 C 220 80, 360 220, 520 120"
                  fill="none"
                  stroke="#D0C4B4"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                />

                {/* Active Progress Trajectory Line */}
                <path
                  d="M 80 180 C 220 80, 360 220, 520 120"
                  fill="none"
                  stroke="#1E1B18"
                  strokeWidth="4"
                  strokeDasharray={`${(simulatedStep / 100) * 500} 500`}
                />

                {/* Origin Point: San Francisco Atelier */}
                <circle cx="80" cy="180" r="8" fill="#1E1B18" stroke="#FAF8F5" strokeWidth="3" />
                <text x="80" y="210" fontSize="11" fill="#1E1B18" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                  Origin: SF Atelier
                </text>

                {/* Waypoint 1: Regional Hub */}
                <circle cx="280" cy="130" r="5" fill="#7A5C43" stroke="#FAF8F5" strokeWidth="2" />
                <text x="280" y="115" fontSize="10" fill="#6B6158" textAnchor="middle" fontFamily="sans-serif">
                  Regional Sorting Center
                </text>

                {/* Waypoint 2: Delivery Terminal */}
                <circle cx="440" cy="175" r="5" fill="#7A5C43" stroke="#FAF8F5" strokeWidth="2" />
                <text x="440" y="200" fontSize="10" fill="#6B6158" textAnchor="middle" fontFamily="sans-serif">
                  Metro Hub
                </text>

                {/* Destination Point */}
                <circle cx="520" cy="120" r="8" fill="#7A5C43" stroke="#FAF8F5" strokeWidth="3" />
                <text x="520" y="95" fontSize="11" fill="#1E1B18" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                  {activeTracking.destinationCity}
                </text>

                {/* Live Moving Courier Vehicle Indicator */}
                {(() => {
                  const t = simulatedStep / 100;
                  // Bezier calculation
                  const p0 = { x: 80, y: 180 };
                  const p1 = { x: 220, y: 80 };
                  const p2 = { x: 360, y: 220 };
                  const p3 = { x: 520, y: 120 };
                  
                  const cx = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
                  const cy = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;

                  return (
                    <g transform={`translate(${cx}, ${cy})`}>
                      <circle r="16" fill="#1E1B18" fillOpacity="0.15" />
                      <circle r="9" fill="#1E1B18" stroke="#FAF8F5" strokeWidth="2" />
                      <rect x="-18" y="-32" width="36" height="16" rx="2" fill="#1E1B18" />
                      <text x="0" y="-21" fontSize="9" fill="#FAF8F5" textAnchor="middle" fontFamily="sans-serif">
                        VAN
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Route Status Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#5A524A] pt-3">
              <div>
                <span className="text-[#8C7A6B] block text-[10px] uppercase tracking-wider">Carrier</span>
                <span className="font-medium text-[#1E1B18]">{activeTracking.carrier}</span>
              </div>
              <div>
                <span className="text-[#8C7A6B] block text-[10px] uppercase tracking-wider">Recipient</span>
                <span className="font-medium text-[#1E1B18]">{activeTracking.recipientName}</span>
              </div>
              <div>
                <span className="text-[#8C7A6B] block text-[10px] uppercase tracking-wider">Delivery Address</span>
                <span className="font-medium text-[#1E1B18] truncate block" title={activeTracking.destinationAddress}>
                  {activeTracking.destinationAddress}
                </span>
              </div>
              <div>
                <span className="text-[#8C7A6B] block text-[10px] uppercase tracking-wider">Service Tier</span>
                <span className="font-medium text-[#1E1B18]">Signature White-Glove</span>
              </div>
            </div>
          </div>

          {/* Environmental Telemetry Box (Archival Silk Safeguard) */}
          <div className="bg-[#FAF8F5] border border-[#DDD5C9] p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8C7A6B] block mb-1">
                Climate Chamber
              </span>
              <span className="font-mono tabular-nums text-[#1E1B18] font-medium">
                {activeTracking.temperaturePreserved}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8C7A6B] block mb-1">
                Impact / Shock Sensor
              </span>
              <span className="text-[#2E5E3D] font-medium">
                Safe · Zero Drops Recorded
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8C7A6B] block mb-1">
                Packaging Spec
              </span>
              <span className="text-[#1E1B18] font-light">
                {activeTracking.packageWeight}
              </span>
            </div>
          </div>

          {/* SMS / Email Notification Subscriptions */}
          <div className="bg-[#F5EFE6] border border-[#DDD5C9] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-medium text-[#1E1B18] block">Live Delivery SMS Alerts</span>
              <span className="text-[#6B6158] font-light">Receive real-time courier ETA pings directly to your mobile phone.</span>
            </div>
            <button
              onClick={() => setSmsSubscribed(!smsSubscribed)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-colors whitespace-nowrap ${
                smsSubscribed
                  ? 'bg-[#2E5E3D] text-[#FAF8F5]'
                  : 'border border-[#1E1B18] text-[#1E1B18] hover:bg-[#FAF8F5]'
              }`}
            >
              {smsSubscribed ? '✓ SMS Subscribed' : 'Enable Mobile Alerts'}
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Milestone Audit Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] border border-[#DDD5C9] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] text-xs">
              <span className="uppercase tracking-[0.14em] font-medium text-[#1E1B18]">
                Shipment Milestones
              </span>
              <span className="font-mono tabular-nums text-[#6B6158]">
                {activeTracking.milestones.filter(m => m.completed).length} of {activeTracking.milestones.length} Completed
              </span>
            </div>

            {/* Vertical Stepper Timeline */}
            <div className="relative pt-6 pl-4 space-y-8 before:absolute before:left-[21px] before:top-8 before:bottom-6 before:w-0.5 before:bg-[#E2D8CC]">
              {activeTracking.milestones.map((milestone, idx) => {
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Step Icon / Circle */}
                    <div 
                      className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                        milestone.completed
                          ? 'bg-[#1E1B18] text-[#FAF8F5]'
                          : 'bg-[#EAE4DC] text-[#7A7167] border border-[#D5CBC0]'
                      }`}
                    >
                      {milestone.completed ? '✓' : idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`text-xs font-medium ${milestone.completed ? 'text-[#1E1B18]' : 'text-[#8C7A6B]'}`}>
                          {milestone.title}
                        </span>
                        <span className="font-mono tabular-nums text-[11px] text-[#7A7167]">
                          {milestone.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8C7A6B]">
                        {milestone.location}
                      </div>
                      <p className="text-xs text-[#5A524A] font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Signature Policy Warning */}
            <div className="mt-8 pt-4 border-t border-[#E8E2D9] text-xs text-[#6B6158] space-y-1.5">
              <div className="font-medium text-[#1E1B18]">White-Glove Delivery Notice:</div>
              <p className="font-light leading-relaxed">
                To guarantee the preservation of our bespoke silk arrangements, adult signature is required upon delivery. If unavailable, our courier will store the consignment in an accredited climate vault and re-attempt delivery.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
