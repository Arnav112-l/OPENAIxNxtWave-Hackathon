import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerSidebar } from '../components/CustomerSidebar';
import { storageService, type StoredOrder } from '../services/storage';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    // Get current customer's orders
    const customerId = localStorage.getItem('userId') || 'customer1';
    const customerOrders = storageService.getOrdersByCustomer(customerId);
    setOrders(customerOrders);
  }, []);

  // Refresh orders (if needed for future use)
  // const refreshOrders = () => {
  //   const customerId = localStorage.getItem('userId') || 'customer1';
  //   const customerOrders = storageService.getOrdersByCustomer(customerId);
  //   setOrders(customerOrders);
  // };

  const statusColors = {
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', emoji: '⏳' },
    confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', emoji: '✓' },
    preparing: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', emoji: '👨‍🍳' },
    ready: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', emoji: '✅' },
    delivered: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', emoji: '✅' },
    cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', emoji: '❌' },
  };

  const filterButtons = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'active', label: 'Active', count: orders.filter(o => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status)).length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : filterStatus === 'active'
    ? orders.filter(order => ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status))
    : orders.filter(order => order.status === filterStatus);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleTrackOrder = () => {
    navigate(`/delivery-tracking`);
  };

  // Get shop name for an order
  const getShopName = (shopId: string) => {
    const shops = storageService.getShops();
    const shop = shops.find(s => s.id === shopId);
    return shop ? shop.name : 'Unknown Shop';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      <CustomerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-accent hover:text-pink-500 dark:text-amber-400 dark:hover:text-amber-300 transition-all duration-300 font-bold group mb-6"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">📦</div>
              <div>
                <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100">
                  My Orders
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Track and manage your orders
                </p>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8 animate-slide-down">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterStatus(btn.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                  filterStatus === btn.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-stone-800/50 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:shadow-md'
                }`}
              >
                {btn.label} {btn.count > 0 && <span className="ml-2 opacity-75">({btn.count})</span>}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl animate-fade-in">
              <div className="text-8xl mb-6">📭</div>
              <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
                No orders yet
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Start shopping to see your orders here
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Browse Shops
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-lg hover:shadow-xl transition-all p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {statusColors[order.status].emoji}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100">
                            {order.orderNumber}
                          </h3>
                          <p className="text-sm text-stone-600 dark:text-stone-400">
                            {formatDate(order.createdAt)} • {getShopName(order.shopId)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusColors[order.status].bg} ${statusColors[order.status].text}`}>
                          {order.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-stone-600 dark:text-stone-400">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </span>
                        <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-6 py-2.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 transition-all"
                      >
                        View Details
                      </button>
                      {(order.status === 'preparing' || order.status === 'ready') && (
                        <button
                          onClick={() => handleTrackOrder()}
                          className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          Track Order
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-600 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Order Number</h3>
                    <p className="text-stone-600 dark:text-stone-400">{selectedOrder.orderNumber}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                          <div>
                            <div className="font-semibold text-stone-800 dark:text-stone-100">{item.productName}</div>
                            <div className="text-sm text-stone-600 dark:text-stone-400">{item.quantity} {item.unit}</div>
                          </div>
                          <div className="text-amber-600 dark:text-amber-400 font-bold">₹{item.price * item.quantity}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Delivery Address</h3>
                    <p className="text-stone-600 dark:text-stone-400">{selectedOrder.customerAddress}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Payment Method</h3>
                    <p className="text-stone-600 dark:text-stone-400">UPI/Cash on Delivery</p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-stone-800 dark:text-stone-100">Total</span>
                      <span className="text-amber-600 dark:text-amber-400">₹{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
