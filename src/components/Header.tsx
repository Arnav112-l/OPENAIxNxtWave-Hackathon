import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getTotalItems();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(!!loggedIn);
    setUserName(name || '');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search functionality here
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-amber-50/90 dark:bg-stone-900/90 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-amber-200/50 dark:border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg sm:text-xl md:text-2xl font-serif font-light text-stone-800 dark:text-stone-100 tracking-wide">kirana store</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/products"
                className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
              >
                products
              </Link>

              {!isLoggedIn && (
                <Link
                  to="/merchant/onboard"
                  className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                >
                  for merchants
                </Link>
              )}

              {isLoggedIn ? (
                <>
                  <Link
                    to="/orders"
                    className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                  >
                    orders
                  </Link>
                  <Link
                    to="/checkout"
                    className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                  >
                    checkout
                  </Link>
                  <Link
                    to="/profile"
                    className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                  >
                    {userName || 'profile'}
                  </Link>
                  <Link
                    to="/support"
                    className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                  >
                    support
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                  >
                    login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-sm font-light tracking-wide"
                  >
                    signup
                  </Link>
                </>
              )}
            </div>

            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 sm:p-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-stone-800/50"
              aria-label="Search"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-stone-800/50"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-stone-800/50"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white text-xs sm:text-sm font-light tracking-wide rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all whitespace-nowrap"
            >
              <span className="hidden sm:inline">Cart </span>
              <span className="sm:hidden">🛒 </span>
              {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, shops..."
                className="w-full px-4 py-2 pr-10 rounded-lg bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 animate-fade-in">
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
            >
              products
            </Link>

            {!isLoggedIn && (
              <Link
                to="/merchant/onboard"
                onClick={() => setIsMenuOpen(false)}
                className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
              >
                for merchants
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
                >
                  orders
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
                >
                  checkout
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
                >
                  {userName || 'profile'}
                </Link>
                <Link
                  to="/support"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
                >
                  support
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg bg-amber-50 dark:bg-stone-800/50 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-200/50 dark:border-amber-900/30 transition-all text-sm font-light tracking-wide"
                >
                  signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
