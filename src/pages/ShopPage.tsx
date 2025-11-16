import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Shop, Product, Category } from '../types';
import { useCart } from '../contexts/CartContext';

export const ShopPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;
    
    Promise.all([
      api.getShop(shopId),
      api.getCatalog(shopId, activeCategory !== 'all' ? activeCategory : undefined)
    ]).then(([shopRes, catalogRes]) => {
      if (shopRes.success) setShop(shopRes.data);
      if (catalogRes.success) setProducts(catalogRes.data);
      setLoading(false);
    });
  }, [shopId, activeCategory]);

  const getQuantity = (productId: string) => {
    return cart.find(item => item.productId === productId)?.quantity || 0;
  };

  const categories: Category[] = ['all', 'staples', 'dairy', 'snacks', 'beverages', 'personal-care'];
  const categoryLabels: Record<string, string> = {
    all: 'Staples',
    staples: 'Staples',
    dairy: 'Dairy',
    snacks: 'Snacks',
    beverages: 'Beverages',
    'personal-care': 'Personal Care'
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!shop) {
    return <div className="min-h-screen flex items-center justify-center">Shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{shop.name}</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Catalog
              </button>
              <button onClick={() => navigate(`/shop/${shopId}/chat`)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                💬 Chat to Order
              </button>
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-6 border-b">
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-3 px-2 font-medium text-sm transition-colors ${
                  activeCategory === cat
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold mb-4 capitalize">{categoryLabels[activeCategory]}</h2>
        <div className="space-y-4">
          {products.map((product) => {
            const qty = getQuantity(product.id);
            return (
              <div key={product.id} className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.unit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {product.nameHi && (
                      <span className="text-xs text-gray-400">{product.nameHi}</span>
                    )}
                    <span className="text-sm font-semibold text-gray-900">₹{product.price}</span>
                  </div>
                </div>
                {!product.inStock ? (
                  <span className="text-sm text-red-600 font-medium">Out of stock</span>
                ) : qty === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="px-5 py-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-red-500 text-white rounded-lg px-3 py-2">
                    <button
                      onClick={() => updateQuantity(product.id, qty - 1)}
                      className="w-6 h-6 flex items-center justify-center font-bold hover:opacity-80"
                    >
                      −
                    </button>
                    <span className="font-semibold min-w-[20px] text-center">{qty}</span>
                    <button
                      onClick={() => updateQuantity(product.id, qty + 1)}
                      className="w-6 h-6 flex items-center justify-center font-bold hover:opacity-80"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
