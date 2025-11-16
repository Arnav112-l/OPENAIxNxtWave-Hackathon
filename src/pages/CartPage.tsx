import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Header } from '../components/Header';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryFee = cart.length > 0 ? 30 : 0;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      alert('Promo code applied! 10% discount');
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    alert(`Order placed successfully! Total: ₹${total}`);
    clearCart();
    setDiscount(0);
    setPromoCode('');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-2">
                  Shopping Cart
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:bg-stone-300 dark:hover:bg-stone-600 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-16 text-center animate-fade-in">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-3xl font-serif font-light text-stone-800 dark:text-stone-100 mb-4">
                Your cart is empty
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8">
                Looks like you haven't added anything to your cart yet
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6 animate-slide-up hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-6">
                      {/* Product Icon */}
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-stone-700 dark:to-stone-600 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                        {item.product.category === 'dairy' ? '🥛' :
                         item.product.category === 'staples' ? '🌾' :
                         item.product.category === 'snacks' ? '🍪' :
                         item.product.category === 'beverages' ? '🥤' : '🛒'}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                          {item.product.nameHi} • {item.product.unit}
                        </p>
                        <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          ₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-700 rounded-xl p-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-10 h-10 bg-white dark:bg-stone-600 rounded-lg font-bold text-xl hover:bg-stone-200 dark:hover:bg-stone-500 transition-all shadow-sm"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-bold text-xl text-stone-800 dark:text-stone-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-bold text-xl hover:shadow-lg transition-all"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.productId, 0)}
                          className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 sticky top-24 animate-fade-in">
                  <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="SAVE10"
                        className="flex-1 px-4 py-3 bg-stone-100 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 text-stone-800 dark:text-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:bg-stone-300 dark:hover:bg-stone-600 transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-stone-600 dark:text-stone-400">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600 dark:text-stone-400">
                      <span>Delivery Fee</span>
                      <span className="font-semibold">₹{deliveryFee}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-stone-300 dark:border-stone-600 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-stone-800 dark:text-stone-100">Total</span>
                        <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your cart?')) {
                        clearCart();
                        setDiscount(0);
                        setPromoCode('');
                      }
                    }}
                    className="w-full py-3 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:bg-stone-300 dark:hover:bg-stone-600 transition-all"
                  >
                    Clear Cart
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-stone-300 dark:border-stone-600 space-y-2 text-sm text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Fast delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Easy returns</span>
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

