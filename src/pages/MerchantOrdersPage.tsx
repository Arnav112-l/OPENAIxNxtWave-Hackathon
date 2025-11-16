import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerSidebar } from '../components/SellerSidebar';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  phone: string;
}

export const MerchantOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'KC-2024-001',
      customerName: 'Rahul Sharma',
      items: 5,
      total: 850,
      status: 'pending',
      date: '2024-01-15T10:30:00',
      address: '123 Main St, New Delhi',
      phone: '+91 98765 43210',
    },
    {
      id: '2',
      orderNumber: 'KC-2024-002',
      customerName: 'Priya Patel',
      items: 3,
      total: 450,
      status: 'preparing',
      date: '2024-01-15T11:15:00',
      address: '456 Park Ave, Mumbai',
      phone: '+91 98765 43211',
    },
    {
      id: '3',
      orderNumber: 'KC-2024-003',
      customerName: 'Amit Kumar',
      items: 7,
      total: 1200,
      status: 'ready',
      date: '2024-01-15T12:00:00',
      address: '789 Ring Road, Bangalore',
      phone: '+91 98765 43212',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'seller') {
      navigate('/login');
    }
  }, [navigate]);

  const statusConfig = {
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', emoji: '⏳', label: 'Pending' },
    confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', emoji: '✓', label: 'Confirmed' },
    preparing: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', emoji: '👨‍🍳', label: 'Preparing' },
    ready: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', emoji: '✅', label: 'Ready for Pickup' },
    delivered: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', emoji: '🚚', label: 'Delivered' },
    cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', emoji: '❌', label: 'Cancelled' },
  };

  const filterButtons = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { id: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
  ];

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      <SellerSidebar />
      
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => navigate('/merchant/dashboard')}
              className="flex items-center gap-2 text-accent hover:text-pink-500 dark:text-amber-400 dark:hover:text-amber-300 transition-all duration-300 font-bold group mb-6"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="text-5xl">📋</div>
              <div>
                <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100">
                  Order Management
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  {orders.length} total orders
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{orders.length}</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Total Orders</div>
            </div>
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6">
              <div className="text-3xl mb-2">⏳</div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{orders.filter(o => o.status === 'pending').length}</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Pending</div>
            </div>
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{orders.reduce((sum, o) => sum + o.total, 0)}</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Total Revenue</div>
            </div>
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{orders.filter(o => o.status === 'delivered').length}</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Delivered</div>
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
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-lg hover:shadow-xl transition-all p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">
                        {statusConfig[order.status].emoji}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                          {order.customerName} • {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-stone-600 dark:text-stone-400">Items:</span>
                        <span className="ml-2 font-semibold text-stone-800 dark:text-stone-100">{order.items}</span>
                      </div>
                      <div>
                        <span className="text-stone-600 dark:text-stone-400">Total:</span>
                        <span className="ml-2 font-bold text-amber-600 dark:text-amber-400">₹{order.total}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-stone-600 dark:text-stone-400">📍</span>
                        <span className="ml-2 text-stone-800 dark:text-stone-100">{order.address}</span>
                      </div>
                      <div>
                        <span className="text-stone-600 dark:text-stone-400">📞</span>
                        <span className="ml-2 text-stone-800 dark:text-stone-100">{order.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex flex-col gap-3">
                    <span className={`px-6 py-2 rounded-full text-sm font-semibold text-center ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}>
                      {statusConfig[order.status].label}
                    </span>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'confirmed')}
                          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all"
                        >
                          Confirm
                        </button>
                      )}
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                          className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-xl transition-all"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'ready')}
                          className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-all"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'delivered')}
                          className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all"
                        >
                          Mark Delivered
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold rounded-xl hover:bg-stone-200 dark:hover:bg-stone-600 transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl">
              <div className="text-8xl mb-6">📋</div>
              <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
                No orders in this category
              </h2>
              <p className="text-stone-600 dark:text-stone-400">
                Orders will appear here when customers place them
              </p>
            </div>
          )}
        </div>
      </div>

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
                <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Customer</h3>
                <p className="text-stone-600 dark:text-stone-400">{selectedOrder.customerName}</p>
                <p className="text-stone-600 dark:text-stone-400">{selectedOrder.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Delivery Address</h3>
                <p className="text-stone-600 dark:text-stone-400">{selectedOrder.address}</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Order Time</h3>
                <p className="text-stone-600 dark:text-stone-400">{formatDate(selectedOrder.date)}</p>
              </div>
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-stone-800 dark:text-stone-100">Total Amount</span>
                  <span className="text-amber-600 dark:text-amber-400">₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
