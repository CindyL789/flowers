import React, { useState, useEffect } from 'react';
import { Product, CartItem, OrderTracking } from './types';
import { PRODUCTS } from './data/products';
import { SEED_ORDERS } from './data/seedOrders';
import { Navbar, AppTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CollectionsView } from './components/CollectionsView';
import { CustomizerView } from './components/CustomizerView';
import { FreshRefillView } from './components/FreshRefillView';
import { TrackingView } from './components/TrackingView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EditBusinessNameModal } from './components/EditBusinessNameModal';
import { Footer } from './components/Footer';
import { BrandProvider } from './context/BrandContext';
import bridalImg from './assets/images/collection_bridal_white_rose_1791912868160.jpg';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<AppTab>('collections');
  
  // Cart items state with initial sample item
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'cart-init-1',
        productId: 'prod-blanche-bridal',
        title: 'The Blanche Royale Bridal Bouquet',
        subtitle: 'Bouquet de Mariée Soie Impériale · Rosa Damascena Mist',
        price: 340,
        quantity: 1,
        image: bridalImg,
        compositionType: 'pure_silk'
      }
    ];
  });

  // Orders state with pre-seeded orders
  const [allOrders, setAllOrders] = useState<Record<string, OrderTracking>>(() => {
    try {
      const saved = localStorage.getItem('atelier_orders');
      if (saved) {
        return { ...SEED_ORDERS, ...JSON.parse(saved) };
      }
    } catch (e) {
      // ignore
    }
    return SEED_ORDERS;
  });

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('SF-8921');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_orders', JSON.stringify(allOrders));
    } catch (e) {
      // ignore
    }
  }, [allOrders]);

  // Total cart items count
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Add standard or hybrid product to cart
  const handleAddToCart = (product: Product, quantity: number, mistId?: string, isHybrid?: boolean) => {
    const itemPrice = isHybrid && product.freshStemsOption
      ? product.price + product.freshStemsOption.priceDifference
      : product.price;

    const itemSubtitle = isHybrid
      ? `${product.frenchSubtitle} · Hybrid Silk & Living Blooms (Refill Eligible)`
      : `${product.frenchSubtitle} · 100% Archival Silk`;

    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id && item.compositionType === (isHybrid ? 'hybrid' : 'pure_silk'));
      if (existing) {
        return prev.map(item =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}`,
          productId: product.id,
          title: product.name,
          subtitle: itemSubtitle,
          price: itemPrice,
          quantity,
          image: product.image,
          compositionType: isHybrid ? 'hybrid' : 'pure_silk'
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  // Add bespoke custom bouquet or refill bundle to cart
  const handleAddCustomToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // On successful checkout payment
  const handleOrderSuccess = (newOrder: OrderTracking) => {
    setAllOrders(prev => ({
      ...prev,
      [newOrder.orderId]: newOrder
    }));
    setActiveTrackingOrderId(newOrder.orderId);
    setCartItems([]);
    setCurrentTab('tracking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18]">
      {/* Top Bar with 3-Zone Contract */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'collections' && (
          <>
            <HeroBanner
              onExploreCollections={() => {
                const el = document.getElementById('collections-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCustomizer={() => {
                setCurrentTab('customizer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <div id="collections-grid">
              <CollectionsView
                onAddToCart={handleAddToCart}
                onOpenCustomizer={() => {
                  setCurrentTab('customizer');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenRefillPortal={() => {
                  setCurrentTab('refill');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </>
        )}

        {currentTab === 'customizer' && (
          <CustomizerView
            onAddCustomToCart={handleAddCustomToCart}
            onOpenCollections={() => {
              setCurrentTab('collections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToRefillPortal={() => {
              setCurrentTab('refill');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'refill' && (
          <FreshRefillView
            onAddRefillToBag={handleAddCustomToCart}
            onTrackOrder={() => {
              setCurrentTab('tracking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'tracking' && (
          <TrackingView
            initialOrderId={activeTrackingOrderId}
            allOrders={allOrders}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Secure Payment Gateway Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Brand Customization Modal */}
      <EditBusinessNameModal />

      {/* Quiet Editorial Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AppContent />
    </BrandProvider>
  );
}
