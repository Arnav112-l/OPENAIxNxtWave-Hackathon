import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapView } from '../components/MapView';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock popular stores data
  const popularStores = [
    { id: '1', name: 'Sharma Kirana', icon: '🏪', rating: 4.8, distance: '0.5 km' },
    { id: '2', name: 'Patel Provisions', icon: '🛒', rating: 4.6, distance: '1.2 km' },
    { id: '3', name: 'Kumar Store', icon: '🏬', rating: 4.9, distance: '0.8 km' },
    { id: '4', name: 'Gupta General Store', icon: '🏪', rating: 4.7, distance: '1.5 km' },
    { id: '5', name: 'Singh Groceries', icon: '🛍️', rating: 4.5, distance: '2.0 km' },
    { id: '6', name: 'Verma Store', icon: '🏬', rating: 4.8, distance: '1.8 km' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col pt-20 md:pt-24">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-8 md:mb-12 w-full">
            <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 mb-6 md:mb-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-stone-800/80 dark:to-stone-700/80 backdrop-blur-sm shadow-2xl border border-amber-200/50 dark:border-amber-800/50 animate-fade-in">
              <p className="text-amber-600 dark:text-amber-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 md:mb-6 animate-slide-down">Local Grocery Tradition</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 md:mb-6 leading-tight tracking-tight text-stone-800 dark:text-stone-50 animate-slide-up">
                Order groceries online from<br className="hidden sm:block" /><span className="sm:hidden"> </span>your local kirana shops
              </h1>
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4 sm:px-0 animate-fade-in-delay">
                Experience the tradition of your neighborhood kirana store with the convenience of modern online shopping
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8 md:mb-16 px-4 sm:px-0 animate-slide-up-delay">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 placeholder-stone-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base shadow-lg transition-all duration-300 hover:shadow-xl"
              />
              <svg className="absolute right-6 sm:right-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Popular Stores Section */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 animate-fade-in-delay-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Stores Grid */}
              <div>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-4 md:mb-6 bg-white dark:bg-stone-800/50 backdrop-blur-sm shadow-lg border border-amber-200/50 dark:border-amber-900/30 transform hover:scale-105 transition-transform duration-300">
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-stone-800 dark:text-stone-100 mb-1 md:mb-2">Popular Stores</h2>
                  <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">Discover trusted local shops in your area</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {popularStores.map((store, index) => (
                    <Link
                      key={store.id}
                      to={`/shop/${store.id}`}
                      className="rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 hover:bg-amber-50 dark:hover:bg-stone-700/50 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-300 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[160px] shadow-lg hover:shadow-xl group transform hover:scale-105 animate-fade-in-stagger"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-4xl sm:text-5xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        {store.icon}
                      </span>
                      <span className="text-stone-700 dark:text-stone-200 text-center font-medium text-sm sm:text-base group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mb-1">
                        {store.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                        <span className="flex items-center gap-1">
                          ⭐ {store.rating}
                        </span>
                        <span>•</span>
                        <span>📍 {store.distance}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Map View */}
              <div className="hidden lg:block animate-fade-in-delay-3">
                <MapView className="rounded-2xl bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 h-[500px] shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 dark:text-stone-100 mb-4">
              Why Choose Kirana Connect?
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of traditional shopping and modern convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-700 dark:to-stone-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Fast Delivery
              </h3>
              <p className="text-stone-600 dark:text-stone-300">
                Get your groceries delivered within 30 minutes from nearby stores. Quick and reliable service.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-stone-700 dark:to-stone-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Best Prices
              </h3>
              <p className="text-stone-600 dark:text-stone-300">
                Competitive pricing from local shops. Support your community while saving money.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-stone-700 dark:to-stone-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Quality Assured
              </h3>
              <p className="text-stone-600 dark:text-stone-300">
                Fresh products from trusted local vendors. Quality checked before delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 dark:text-stone-100 mb-4">
              How It Works
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Simple steps to get your groceries delivered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Browse Shops
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Explore local kirana stores near you on the map
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Select Items
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Choose products and add them to your cart
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Place Order
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Complete checkout with secure payment options
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Get Delivered
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Receive fresh groceries at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 dark:text-stone-100 mb-4">
              Shop by Category
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Find everything you need in one place
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: 'Grains', icon: '🌾', color: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30' },
              { name: 'Pulses', icon: '🫘', color: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30' },
              { name: 'Oil & Ghee', icon: '🧈', color: 'from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30' },
              { name: 'Spices', icon: '🌶️', color: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30' },
              { name: 'Dairy', icon: '🥛', color: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30' },
              { name: 'Snacks', icon: '🍪', color: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30' },
              { name: 'Beverages', icon: '☕', color: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30' },
              { name: 'Personal Care', icon: '🧴', color: 'from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30' },
              { name: 'Household', icon: '🧹', color: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30' },
              { name: 'Vegetables', icon: '🥬', color: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30' },
              { name: 'Fruits', icon: '🍎', color: 'from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30' },
              { name: 'Bakery', icon: '🍞', color: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30' },
            ].map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-stone-200/50 dark:border-stone-700`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 dark:text-stone-100 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Real experiences from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">Rajesh Kumar</h4>
                  <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-stone-600 dark:text-stone-400 italic">
                "Amazing service! Got my groceries delivered in 20 minutes. The quality is excellent and prices are reasonable."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  P
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">Priya Sharma</h4>
                  <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-stone-600 dark:text-stone-400 italic">
                "Love supporting local shops through this platform. The app is easy to use and delivery is always on time."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">Amit Patel</h4>
                  <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-stone-600 dark:text-stone-400 italic">
                "Fresh products every time. The shopkeepers are friendly and the whole experience is seamless."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-700 dark:to-orange-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and experience the convenience of online kirana shopping
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:bg-stone-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign Up Now
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                About Kirana Connect
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Connecting you with local kirana shops for convenient online grocery shopping. Supporting local businesses in the digital age.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Merchants */}
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                For Merchants
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/merchant/dashboard" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Merchant Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/merchant/onboarding" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Register Your Shop
                  </Link>
                </li>
                <li>
                  <Link to="/merchant/products" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Manage Products
                  </Link>
                </li>
                <li>
                  <Link to="/billing" className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Billing & Plans
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>support@kiranaconnect.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+91 1800-123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Mumbai, India</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <span className="text-2xl">📘</span>
                </a>
                <a href="#" className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <span className="text-2xl">🐦</span>
                </a>
                <a href="#" className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <span className="text-2xl">📸</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-stone-200 dark:border-stone-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              © 2025 Kirana Connect. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-stone-600 dark:text-stone-400">
              <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
