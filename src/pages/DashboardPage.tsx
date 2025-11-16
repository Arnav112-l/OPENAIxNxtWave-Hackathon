import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerSidebar } from '../components/CustomerSidebar';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const name = localStorage.getItem('userName');
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    setUserName(name || 'Customer');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
      <CustomerSidebar />
      
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Discover local shops and order your essentials
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold mb-2">Browse Shops</h3>
              <p className="text-amber-50">Explore local stores near you</p>
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold mb-2">My Cart</h3>
              <p className="text-pink-50">View your shopping cart</p>
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-2">My Orders</h3>
              <p className="text-purple-50">Track your deliveries</p>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold mb-2">My Profile</h3>
              <p className="text-green-50">Manage your account</p>
            </button>
          </div>

          {/* Support Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-3xl shadow-xl mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🎧</div>
              <div>
                <h3 className="text-xl font-bold mb-1">Need Help?</h3>
                <p className="text-blue-50">Our support team is here for you 24/7</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/support')}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Contact Support
            </button>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
            <h2 className="text-3xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
              Recent Orders
            </h2>
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-xl">No orders yet</p>
              <p className="text-sm mt-2">Start shopping to see your orders here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
