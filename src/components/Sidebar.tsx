import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  userType?: 'customer' | 'seller';
}

export const Sidebar: React.FC<SidebarProps> = ({ userType = 'customer' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const customerLinks = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/products', icon: '🛍️', label: 'Products' },
    { path: '/cart', icon: '🛒', label: 'Cart' },
    { path: '/checkout', icon: '💳', label: 'Checkout' },
    { path: '/orders', icon: '📦', label: 'Orders' },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/support', icon: '💬', label: 'Support' },
  ];

  const sellerLinks = [
    { path: '/merchant/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/merchant/products', icon: '📦', label: 'Products' },
    { path: '/merchant/orders', icon: '📋', label: 'Orders' },
    { path: '/merchant/analytics', icon: '📈', label: 'Analytics' },
    { path: '/merchant/profile', icon: '🏪', label: 'Shop Profile' },
    { path: '/merchant/billing', icon: '💳', label: 'Billing' },
  ];

  const links = userType === 'seller' ? sellerLinks : customerLinks;

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 z-40 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-700">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">🏪</span>
            <span
              className={`font-serif text-xl font-light text-stone-800 dark:text-stone-100 whitespace-nowrap transition-all duration-300 ${
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Kirana Store
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-3">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                  }`}
                >
                  <span className="text-xl min-w-[24px]">{link.icon}</span>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 font-medium ${
                      isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-stone-200 dark:border-stone-700 p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <span className="text-xl min-w-[24px]">🚪</span>
            <span
              className={`whitespace-nowrap transition-all duration-300 font-medium ${
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
