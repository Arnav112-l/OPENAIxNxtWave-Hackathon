import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { storageService, StoredProduct, StoredShop } from '../services/storage';
import { CustomerSidebar } from '../components/CustomerSidebar';

export const ShopPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [shop, setShop] = useState<StoredShop | null>(null);
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;
    
    const shopData = storageService.getShop(shopId);
    const productsData = storageService.getProductsByShop(shopId);
    
    setShop(shopData);
    setProducts(productsData);
    setLoading(false);
  }, [shopId]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleAddToCart = (product: StoredProduct) => {
    addToCart({
      id: product.id,
      shopId: product.shopId,
      name: product.name,
      nameHi: product.nameHi,
      price: product.price,
      unit: product.unit,
      image: product.image,
      category: 'staples',
      stock: product.stock,
      inStock: product.inStock
    } as any);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-stone-600 dark:text-stone-400">Loading shop...</p>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-stone-600 dark:text-stone-400">Shop not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <CustomerSidebar />
      
      <div className="ml-20 p-8">
        {/* Shop Header */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{shop.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">{shop.name}</h1>
                <p className="text-stone-600 dark:text-stone-400">{shop.nameHi}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-stone-500 dark:text-stone-400">
                  <span>⭐ {shop.rating}</span>
                  <span>📍 {shop.distance}</span>
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full font-medium">
                    {shop.category === 'general' ? 'General Store' : shop.category === 'medical' ? 'Medical Store' : 'Electronics'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-stone-800 rounded-2xl p-12 text-center shadow-lg">
            <p className="text-xl text-stone-600 dark:text-stone-400">No products available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{product.image || '📦'}</div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">{product.name}</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{product.nameHi}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">{product.description}</p>
                </div>
                
                <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-amber-600">₹{product.price}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">per {product.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-stone-600 dark:text-stone-300">Stock: {product.stock}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      product.inStock
                        ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl'
                        : 'bg-stone-300 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
