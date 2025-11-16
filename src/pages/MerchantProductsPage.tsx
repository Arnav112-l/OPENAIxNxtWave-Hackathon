import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerSidebar } from '../components/SellerSidebar';
import { storageService, type StoredProduct } from '../services/storage';

export const MerchantProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [currentOwnerId, setCurrentOwnerId] = useState<string>('');
  
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoredProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameHi: '',
    category: 'grains',
    price: '',
    unit: 'kg',
    stock: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'seller') {
      navigate('/login');
      return;
    }

    // Get current user's shop info
    const ownerId = localStorage.getItem('userId') || 'owner1';
    const shops = storageService.getShops();
    const userShop = shops.find(s => s.ownerId === ownerId);
    
    if (userShop) {
      setCurrentOwnerId(ownerId);
      
      // Load products for this owner
      const ownerProducts = storageService.getProductsByOwner(ownerId);
      setProducts(ownerProducts);
    }
  }, [navigate]);

  // Refresh products from storage
  const refreshProducts = () => {
    if (currentOwnerId) {
      const ownerProducts = storageService.getProductsByOwner(currentOwnerId);
      setProducts(ownerProducts);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products', emoji: '📦' },
    { id: 'grains', name: 'Grains', emoji: '🌾' },
    { id: 'pulses', name: 'Pulses', emoji: '🫘' },
    { id: 'oil', name: 'Oil & Ghee', emoji: '🛢️' },
    { id: 'groceries', name: 'Groceries', emoji: '🛒' },
    { id: 'spices', name: 'Spices', emoji: '🌶️' },
    { id: 'medicines', name: 'Medicines', emoji: '💊' },
    { id: 'supplements', name: 'Supplements', emoji: '💉' },
    { id: 'medical-equipment', name: 'Medical Equipment', emoji: '🩺' },
    { id: 'electronics', name: 'Electronics', emoji: '📱' },
    { id: 'accessories', name: 'Accessories', emoji: '🔌' },
  ];

  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  const handleToggleStock = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      storageService.updateProduct(productId, { inStock: !product.inStock });
      refreshProducts();
    }
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    storageService.updateProduct(productId, { 
      stock: newStock, 
      inStock: newStock > 0 
    });
    refreshProducts();
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      storageService.deleteProduct(productId);
      refreshProducts();
    }
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    const shops = storageService.getShops();
    const userShop = shops.find(s => s.ownerId === currentOwnerId);
    
    if (!userShop) {
      alert('Shop not found');
      return;
    }

    const newProduct: Omit<StoredProduct, 'id' | 'createdAt'> = {
      shopId: userShop.id,
      shopName: userShop.name,
      name: formData.name,
      nameHi: formData.nameHi || formData.name,
      description: formData.description || '',
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      stock: Number(formData.stock),
      inStock: Number(formData.stock) > 0,
      image: formData.image || '📦',
    };

    storageService.addProduct(newProduct);
    refreshProducts();
    setShowAddModal(false);
    setFormData({
      name: '',
      nameHi: '',
      category: 'grains',
      price: '',
      unit: 'kg',
      stock: '',
      description: '',
      image: '',
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct || !formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    storageService.updateProduct(editingProduct.id, {
      name: formData.name,
      nameHi: formData.nameHi || formData.name,
      description: formData.description || '',
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      stock: Number(formData.stock),
      inStock: Number(formData.stock) > 0,
      image: formData.image || editingProduct.image,
    });

    refreshProducts();
    setEditingProduct(null);
    setFormData({
      name: '',
      nameHi: '',
      category: 'grains',
      price: '',
      unit: 'kg',
      stock: '',
      description: '',
      image: '',
    });
  };

  const openEditModal = (product: StoredProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameHi: product.nameHi,
      category: product.category,
      price: String(product.price),
      unit: product.unit,
      stock: String(product.stock),
      description: product.description,
      image: product.image || '',
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <SellerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/merchant/dashboard')}
              className="flex items-center gap-2 text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors font-medium group mb-4"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                  Product Management
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Manage your inventory • {products.length} total products
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-700 rounded-2xl shadow-sm p-6">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-2xl font-bold text-stone-800 dark:text-stone-100">{products.length}</div>
              <div className="text-sm text-stone-500 dark:text-stone-400">Total Products</div>
            </div>
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-700 rounded-2xl shadow-sm p-6">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{products.filter(p => p.inStock).length}</div>
              <div className="text-sm text-stone-500 dark:text-stone-400">In Stock</div>
            </div>
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-700 rounded-2xl shadow-sm p-6">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{products.filter(p => p.stock < 10 && p.stock > 0).length}</div>
              <div className="text-sm text-stone-500 dark:text-stone-400">Low Stock</div>
            </div>
            <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-700 rounded-2xl shadow-sm p-6">
              <div className="text-2xl mb-2">❌</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{products.filter(p => !p.inStock).length}</div>
              <div className="text-sm text-stone-500 dark:text-stone-400">Out of Stock</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  filterCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
              >
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{product.nameHi}</p>
                  </div>
                  <button
                    onClick={() => handleToggleStock(product.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      product.inStock
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {product.inStock ? 'Active' : 'Inactive'}
                  </button>
                </div>

                {/* Product Details */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-stone-600 dark:text-stone-400">Price</span>
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      ₹{product.price}<span className="text-sm font-normal">/{product.unit}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-stone-600 dark:text-stone-400">Stock</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStock(product.id, Math.max(0, product.stock - 10))}
                        className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-all flex items-center justify-center text-sm font-bold"
                      >
                        −
                      </button>
                      <span className={`font-semibold px-3 min-w-[3rem] text-center ${product.stock < 10 ? 'text-orange-600 dark:text-orange-400' : 'text-stone-800 dark:text-stone-100'}`}>
                        {product.stock}
                      </span>
                      <button
                        onClick={() => handleUpdateStock(product.id, product.stock + 10)}
                        className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-all flex items-center justify-center text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-700">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-stone-700/50 text-stone-600 dark:text-stone-400 capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl">
              <div className="text-8xl mb-6">📦</div>
              <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
                No products in this category
              </h2>
              <p className="text-stone-600 dark:text-stone-400">
                Try selecting a different category or add new products
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    nameHi: '',
                    category: 'grains',
                    price: '',
                    unit: 'kg',
                    stock: '',
                    description: '',
                    image: '',
                  });
                }}
                className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-700 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-600 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Basmati Rice"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Product Name (Hindi)
                  </label>
                  <input
                    type="text"
                    value={formData.nameHi}
                    onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                    placeholder="e.g., बासमती चावल"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="grains">Grains 🌾</option>
                    <option value="pulses">Pulses 🫘</option>
                    <option value="oil">Oil & Ghee 🛢️</option>
                    <option value="groceries">Groceries 🛒</option>
                    <option value="spices">Spices 🌶️</option>
                    <option value="medicines">Medicines 💊</option>
                    <option value="supplements">Supplements 💉</option>
                    <option value="medical-equipment">Medical Equipment 🩺</option>
                    <option value="electronics">Electronics 📱</option>
                    <option value="accessories">Accessories 🔌</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the product"
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Icon/Emoji (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="e.g., 🌾 or 📦"
                    maxLength={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Unit *
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="L">Liter (L)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="piece">Piece</option>
                    <option value="dozen">Dozen</option>
                    <option value="packet">Packet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Initial Stock Quantity *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    nameHi: '',
                    category: 'grains',
                    price: '',
                    unit: 'kg',
                    stock: '',
                    description: '',
                    image: '',
                  });
                }}
                className="flex-1 py-3 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={editingProduct ? handleEditProduct : handleAddProduct}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
