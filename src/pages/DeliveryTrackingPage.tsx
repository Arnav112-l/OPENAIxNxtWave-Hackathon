import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerSidebar } from '../components/CustomerSidebar';

interface DeliveryStatus {
  status: 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
  timestamp: string;
  message: string;
}

interface DeliveryAgent {
  name: string;
  phone: string;
  rating: number;
  vehicleNumber: string;
  photo: string;
}

export const DeliveryTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  
  const currentStatus: 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' = 'out-for-delivery';
  const [estimatedTime, setEstimatedTime] = useState(15);

  // Mock delivery data
  const orderDetails = {
    orderId: orderId || 'ORD-2024-11-16-001',
    items: [
      { name: 'Basmati Rice', nameHi: 'बासमती चावल', quantity: 2, unit: 'kg' },
      { name: 'Toor Dal', nameHi: 'तूर दाल', quantity: 1, unit: 'kg' },
      { name: 'Cooking Oil', nameHi: 'खाना पकाने का तेल', quantity: 1, unit: 'L' },
    ],
    shopName: 'Sharma Kirana Store',
    shopAddress: 'Shop No. 12, MG Road, Mumbai - 400001',
    deliveryAddress: 'Flat 301, Building A, Sunshine Apartments, Andheri West, Mumbai - 400053',
    totalAmount: 485,
    orderTime: '2:30 PM',
  };

  const deliveryAgent: DeliveryAgent = {
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    rating: 4.8,
    vehicleNumber: 'MH-02-AB-1234',
    photo: '🛵',
  };

  const statusTimeline: DeliveryStatus[] = [
    { status: 'confirmed', timestamp: '2:30 PM', message: 'Order confirmed by shop' },
    { status: 'preparing', timestamp: '2:35 PM', message: 'Your order is being prepared' },
    { status: 'out-for-delivery', timestamp: '2:50 PM', message: 'Out for delivery' },
    { status: 'delivered', timestamp: '--', message: 'Order delivered' },
  ];

  useEffect(() => {
    // Simulate delivery progress
    const timer = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getStatusIndex = (status: string) => {
    const statuses = ['confirmed', 'preparing', 'out-for-delivery', 'delivered'];
    return statuses.indexOf(status);
  };

  const currentStatusIndex = getStatusIndex(currentStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
      <CustomerSidebar />
      
      <div className="ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/orders')}
              className="flex items-center gap-2 text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors font-medium group mb-6"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Orders</span>
            </button>

            <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-xl border border-amber-200/50 dark:border-amber-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    🚚 Out for Delivery
                  </h1>
                  <p className="text-stone-600 dark:text-stone-400">
                    Order #{orderDetails.orderId}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                    {estimatedTime} min
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Estimated arrival
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Status & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Tracking Map Placeholder */}
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-xl border border-amber-200/50 dark:border-amber-900/30">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  📍 Live Tracking
                </h2>
                <div className="relative bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-700 dark:to-stone-600 rounded-2xl h-[300px] flex items-center justify-center overflow-hidden">
                  {/* Google Maps Background */}
                  <img 
                    src="/map.png" 
                    alt="Delivery Route Map" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Animated delivery vehicle */}
                  <div className="absolute top-1/4 left-1/4 animate-bounce z-10">
                    <div className="text-6xl drop-shadow-lg">🛵</div>
                  </div>
                  
                  {/* Start point */}
                  <div className="absolute bottom-10 left-10 text-4xl drop-shadow-lg z-10">
                    🏪
                  </div>

                  {/* End point */}
                  <div className="absolute top-10 right-10 text-4xl drop-shadow-lg z-10">
                    🏠
                  </div>

                  {/* Status overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-amber-300 dark:border-amber-700">
                      <p className="text-stone-900 dark:text-stone-100 text-sm font-semibold">
                        🚀 Your delivery is on the way!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-xl border border-amber-200/50 dark:border-amber-900/30">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                  📦 Order Status
                </h2>
                
                <div className="space-y-6">
                  {statusTimeline.map((item, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    
                    return (
                      <div key={item.status} className="flex gap-4">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-amber-500 to-orange-500 scale-110 shadow-lg' 
                              : 'bg-stone-300 dark:bg-stone-600'
                          } ${isCurrent ? 'animate-pulse' : ''}`}>
                            {isCompleted && item.status !== 'delivered' ? '✓' : index + 1}
                          </div>
                          {index < statusTimeline.length - 1 && (
                            <div className={`w-1 h-16 transition-all duration-500 ${
                              index < currentStatusIndex 
                                ? 'bg-gradient-to-b from-amber-500 to-orange-500' 
                                : 'bg-stone-300 dark:bg-stone-600'
                            }`} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold ${
                              isCompleted 
                                ? 'text-stone-900 dark:text-stone-100' 
                                : 'text-stone-500 dark:text-stone-400'
                            }`}>
                              {item.message}
                            </h3>
                            {item.timestamp !== '--' && (
                              <span className="text-sm text-stone-500 dark:text-stone-400">
                                {item.timestamp}
                              </span>
                            )}
                          </div>
                          {isCurrent && (
                            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium animate-pulse">
                              ⚡ In Progress
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-xl border border-amber-200/50 dark:border-amber-900/30">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  🛒 Order Items
                </h2>
                
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-700 rounded-xl">
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          {item.name}
                        </p>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                          {item.nameHi}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-600">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      ₹{orderDetails.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Delivery Agent & Addresses */}
            <div className="space-y-6">
              {/* Delivery Agent Card */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4">🚴 Delivery Partner</h2>
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{deliveryAgent.photo}</div>
                  <h3 className="text-xl font-bold mb-1">{deliveryAgent.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span>⭐</span>
                    <span className="font-semibold">{deliveryAgent.rating}</span>
                  </div>
                  <p className="text-sm opacity-90">{deliveryAgent.vehicleNumber}</p>
                </div>

                <a
                  href={`tel:${deliveryAgent.phone}`}
                  className="block w-full bg-white text-amber-600 text-center py-3 rounded-xl font-semibold hover:bg-stone-50 transition-all shadow-lg mb-3"
                >
                  📞 Call Delivery Partner
                </a>

                <button className="block w-full bg-white/20 backdrop-blur-sm text-white text-center py-3 rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30">
                  💬 Chat with Partner
                </button>
              </div>

              {/* Addresses */}
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-xl border border-amber-200/50 dark:border-amber-900/30">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
                  📍 Addresses
                </h2>
                
                <div className="space-y-4">
                  {/* Pickup Address */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-700 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏪</span>
                      <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                          Pickup from
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                          {orderDetails.shopName}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          {orderDetails.shopAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-300 dark:border-amber-700">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏠</span>
                      <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                          Delivering to
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                          {orderDetails.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-xl border border-amber-200/50 dark:border-amber-900/30">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
                  🆘 Need Help?
                </h2>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-stone-50 dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📞</span>
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          Call Support
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          1800-123-4567
                        </p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full text-left p-3 bg-stone-50 dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">❌</span>
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          Cancel Order
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          Get full refund
                        </p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigate('/support')}
                    className="w-full text-left p-3 bg-stone-50 dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💬</span>
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          Report Issue
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          We're here to help
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
