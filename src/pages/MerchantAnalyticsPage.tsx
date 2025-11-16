import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerSidebar } from '../components/SellerSidebar';

export const MerchantAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'seller') {
      navigate('/login');
    }
  }, [navigate]);

  const salesData = [
    { day: 'Mon', sales: 2500 },
    { day: 'Tue', sales: 3200 },
    { day: 'Wed', sales: 2800 },
    { day: 'Thu', sales: 3500 },
    { day: 'Fri', sales: 4200 },
    { day: 'Sat', sales: 5100 },
    { day: 'Sun', sales: 3800 },
  ];

  const topProducts = [
    { name: 'Basmati Rice', sales: 150, revenue: 18000 },
    { name: 'Toor Dal', sales: 95, revenue: 13300 },
    { name: 'Cooking Oil', sales: 80, revenue: 14400 },
    { name: 'Atta', sales: 200, revenue: 8000 },
    { name: 'Sugar', sales: 120, revenue: 5400 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

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
              <div className="text-5xl">📈</div>
              <div>
                <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100">
                  Analytics & Insights
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Track your business performance
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
              <div className="text-4xl mb-3">💰</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">₹24,100</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Weekly Revenue</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 12.5% from last week</div>
            </div>

            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-3">📊</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">845</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Items Sold</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">↑ 8.3% from last week</div>
            </div>

            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-3">👥</div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">342</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Total Customers</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-2">↑ 15.2% from last week</div>
            </div>

            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl mb-3">⭐</div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">4.8</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Average Rating</div>
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">Based on 156 reviews</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Sales Chart */}
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
              <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                Weekly Sales
              </h2>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={data.day} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">{data.day}</span>
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400">₹{data.sales}</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(data.sales / maxSales) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
              <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                Top Selling Products
              </h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/30 rounded-2xl border border-stone-200 dark:border-stone-700 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800 dark:text-stone-100">{product.name}</h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-600 dark:text-amber-400">₹{product.revenue}</div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">Peak Hours</h3>
                <span className="text-3xl">⏰</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Morning (8-12)</span>
                  <span className="font-bold text-stone-800 dark:text-stone-100">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Afternoon (12-5)</span>
                  <span className="font-bold text-stone-800 dark:text-stone-100">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Evening (5-10)</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">40%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">Payment Methods</h3>
                <span className="text-3xl">💳</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">UPI</span>
                  <span className="font-bold text-stone-800 dark:text-stone-100">55%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Cash</span>
                  <span className="font-bold text-stone-800 dark:text-stone-100">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Card</span>
                  <span className="font-bold text-stone-800 dark:text-stone-100">15%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">Order Status</h3>
                <span className="text-3xl">📦</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Delivered</span>
                  <span className="font-bold text-green-600 dark:text-green-400">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Pending</span>
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">6%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 dark:text-stone-400">Cancelled</span>
                  <span className="font-bold text-red-600 dark:text-red-400">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
