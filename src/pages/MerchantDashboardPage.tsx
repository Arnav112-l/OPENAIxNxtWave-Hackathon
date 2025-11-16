import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SellerSidebar } from '../components/SellerSidebar';

export const MerchantDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { shopId } = useParams<{ shopId: string }>();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const name = localStorage.getItem('userName');
    
    if (!isLoggedIn || userType !== 'seller') {
      navigate('/login');
      return;
    }
    
    setUserName(name || 'Merchant');
  }, [navigate, shopId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Mock stats data
  const stats = {
    todayOrders: 12,
    todayRevenue: 3450,
    totalProducts: 45,
    lowStockItems: 5,
    pendingOrders: 3,
    completedOrders: 9,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900">
      <SellerSidebar />
      
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Business Dashboard
                  </h1>
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors">
                      🔍
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="text-xs uppercase tracking-wider mb-1 opacity-90">Orders</div>
                  <div className="text-3xl font-bold">{stats.todayOrders}</div>
                  <div className="text-sm opacity-80 mt-1">📊 Today</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="text-xs uppercase tracking-wider mb-1 opacity-90">Income</div>
                  <div className="text-3xl font-bold">₹{stats.todayRevenue}</div>
                  <div className="text-sm opacity-80 mt-1">💰 Revenue</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="text-xs uppercase tracking-wider mb-1 opacity-90">Products Sold</div>
                  <div className="text-3xl font-bold">{stats.completedOrders}</div>
                  <div className="text-sm opacity-80 mt-1">📦 Items</div>
                </div>
              </div>

              {/* Marketplace Section */}
              <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">Marketplace</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                      Data Analytics Overview
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      See how your account grow and how you can boost it
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-700 dark:to-stone-800 rounded-xl p-5 text-center">
                    <div className="mb-3">
                      <div className="w-20 h-20 mx-auto bg-white dark:bg-stone-600 rounded-lg flex items-center justify-center text-4xl">
                        🏪
                      </div>
                    </div>
                    <div className="text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      UPGRADE TO PRO
                    </div>
                    <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">₹29 /m</div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">100% insurance for your goods</div>
                  </div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">Finance Flow</h3>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">₹{stats.todayRevenue * 2}</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">September 2021</div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Recent Orders</h2>
                  <button
                    onClick={() => navigate('/merchant/orders')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    SEE ALL
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                      <tr>
                        <td className="py-3 text-sm text-stone-600 dark:text-stone-400">#1235465</td>
                        <td className="py-3 text-sm text-stone-900 dark:text-stone-100">DJI Mavic Pro 2</td>
                        <td className="py-3 text-sm text-stone-600 dark:text-stone-400">Sep 16, 2021</td>
                        <td className="py-3 text-sm text-stone-900 dark:text-stone-100">₹42.00</td>
                        <td className="py-3 text-right">
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Delivered</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm text-stone-600 dark:text-stone-400">#1235468</td>
                        <td className="py-3 text-sm text-stone-900 dark:text-stone-100">iPad Pro 2017 Model</td>
                        <td className="py-3 text-sm text-stone-600 dark:text-stone-400">Sep 15, 2021</td>
                        <td className="py-3 text-sm text-stone-900 dark:text-stone-100">₹932.00</td>
                        <td className="py-3 text-right">
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Cancelled</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Summary</h2>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-stone-600 dark:text-stone-400 mb-2">Your Balance</div>
                  <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">₹{stats.todayRevenue * 3}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-green-600 dark:text-green-400">▲ ₹{stats.todayRevenue}</span>
                    <span className="text-red-600 dark:text-red-400">▼ ₹1,060.00</span>
                  </div>
                </div>

                {/* Subscription Status */}
                <div className="mb-6 pb-6 border-b border-stone-200 dark:border-stone-700">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-1">
                          Current Plan
                        </div>
                        <div className="text-lg font-bold text-stone-900 dark:text-stone-100">Free Plan</div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                      Up to 50 products • Basic analytics
                    </p>
                    <button
                      onClick={() => navigate('/merchant/billing')}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all"
                    >
                      Upgrade to Pro →
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Activity</h3>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      SEE ALL
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          💰
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            Withdraw Earning
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400">12:40 am</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-stone-900 dark:text-stone-100">₹4,120</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          💳
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            Paying Website tax
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400">10:40 am</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-stone-900 dark:text-stone-100">-₹230</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Top Categories</h3>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                    Explore your top categories and keep shopping with cashback
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 rounded-xl p-4">
                      <div className="text-2xl mb-2">👟</div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Footwear</div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">18,941 units</div>
                    </div>

                    <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-4">
                      <div className="text-2xl mb-2">👜</div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Accessories</div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">26,061 units</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/merchant/products')}
                    className="w-full text-left px-4 py-3 bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📦</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">Manage Products</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/merchant/orders')}
                    className="w-full text-left px-4 py-3 bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📋</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">View Orders</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/merchant/analytics')}
                    className="w-full text-left px-4 py-3 bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📈</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">Analytics</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/merchant/profile')}
                    className="w-full text-left px-4 py-3 bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏪</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">Shop Profile</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/merchant/billing')}
                    className="w-full text-left px-4 py-3 bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💳</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">Billing</span>
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
