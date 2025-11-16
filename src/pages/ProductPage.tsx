import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Product, Shop } from '../types';
import { api } from '../services/api';

export const ProductPage: React.FC = () => {
  const { productId, shopId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!shopId) return;
        
        const shopData = await api.getShop(shopId);
        setShop(shopData);
        
        const foundProduct = shopData.products.find((p: Product) => p.id === productId);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, shopId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
        <Header />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-2xl text-stone-600 dark:text-stone-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product || !shop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
        <Header />
        <div className="pt-32 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/shop/${shopId}`)}
            className="flex items-center gap-2 text-accent hover:text-pink-500 dark:text-amber-400 dark:hover:text-amber-300 transition-all duration-300 font-bold mb-6 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span>Back to {shop.name}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-fade-in">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 dark:from-stone-700 dark:to-stone-600 rounded-2xl flex items-center justify-center text-8xl">
                {product.category === 'dairy' ? '🥛' :
                 product.category === 'staples' ? '🌾' :
                 product.category === 'snacks' ? '🍪' :
                 product.category === 'beverages' ? '🥤' : '🛒'}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6 animate-slide-up">
              {/* Title & Price */}
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-2">
                      {product.name}
                    </h1>
                    <p className="text-lg text-stone-600 dark:text-stone-400">
                      {product.nameHi}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-semibold ${
                    product.inStock 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>
                </div>

                <div className="flex items-baseline gap-4 mb-6">
                  <div className="text-5xl font-bold text-amber-600 dark:text-amber-400">
                    ₹{product.price}
                  </div>
                  <div className="text-xl text-stone-500 dark:text-stone-400">
                    per {product.unit}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-xl font-bold text-xl hover:bg-stone-300 dark:hover:bg-stone-600 transition-all"
                    >
                      −
                    </button>
                    <div className="w-20 text-center text-2xl font-bold text-stone-800 dark:text-stone-100">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-xl font-bold text-xl hover:bg-stone-300 dark:hover:bg-stone-600 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl hover:scale-105'
                      : 'bg-stone-300 dark:bg-stone-700 text-stone-500 dark:text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? `Add to Cart - ₹${product.price * quantity}` : 'Out of Stock'}
                </button>
              </div>

              {/* Product Info */}
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-4">
                  Product Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                    <span className="text-stone-600 dark:text-stone-400">Category</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-100 capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                    <span className="text-stone-600 dark:text-stone-400">Unit</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-100">{product.unit}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                    <span className="text-stone-600 dark:text-stone-400">Stock</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-100">{product.stock} units</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-stone-600 dark:text-stone-400">Shop</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-100">{shop.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
