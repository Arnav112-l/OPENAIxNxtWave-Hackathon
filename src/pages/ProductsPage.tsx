import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CustomerSidebar } from '../components/CustomerSidebar';

interface Product {
  id: number;
  name: string;
  nameHi: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  inStock: boolean;
  stock: number;
  rating: number;
  reviews: number;
  image: string;
  seller: {
    id: number;
    name: string;
    rating: number;
    location: string;
    verified: boolean;
  };
}

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categories = ['All', 'Grains', 'Pulses', 'Oil', 'Groceries', 'Beverages', 'Spices', 'Dairy'];

  useEffect(() => {
    // Mock products data
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Basmati Rice',
        nameHi: 'बासमती चावल',
        description: 'Premium quality long grain rice, aged for 2 years',
        price: 150,
        unit: 'kg',
        category: 'Grains',
        inStock: true,
        stock: 50,
        rating: 4.5,
        reviews: 128,
        image: '🌾',
        seller: {
          id: 1,
          name: 'Sharma Kirana Store',
          rating: 4.7,
          location: 'Andheri West, Mumbai',
          verified: true
        }
      },
      {
        id: 2,
        name: 'Whole Wheat Flour',
        nameHi: 'गेहूं का आटा',
        description: 'Fresh stone ground atta, no preservatives',
        price: 45,
        unit: 'kg',
        category: 'Grains',
        inStock: true,
        stock: 100,
        rating: 4.8,
        reviews: 256,
        image: '🌾',
        seller: {
          id: 2,
          name: 'Patel Grocery Mart',
          rating: 4.6,
          location: 'Borivali East, Mumbai',
          verified: true
        }
      },
      {
        id: 3,
        name: 'Toor Dal',
        nameHi: 'तूर दाल',
        description: 'Premium yellow lentils, triple cleaned',
        price: 120,
        unit: 'kg',
        category: 'Pulses',
        inStock: true,
        stock: 75,
        rating: 4.6,
        reviews: 89,
        image: '🫘',
        seller: {
          id: 1,
          name: 'Sharma Kirana Store',
          rating: 4.7,
          location: 'Andheri West, Mumbai',
          verified: true
        }
      },
      {
        id: 4,
        name: 'Cooking Oil',
        nameHi: 'खाना पकाने का तेल',
        description: 'Refined sunflower oil, heart healthy',
        price: 180,
        unit: 'L',
        category: 'Oil',
        inStock: true,
        stock: 30,
        rating: 4.3,
        reviews: 145,
        image: '🧴',
        seller: {
          id: 3,
          name: 'Kumar Provisions',
          rating: 4.5,
          location: 'Dadar West, Mumbai',
          verified: true
        }
      },
      {
        id: 5,
        name: 'White Sugar',
        nameHi: 'चीनी',
        description: 'Pure white crystal sugar, M grade',
        price: 42,
        unit: 'kg',
        category: 'Groceries',
        inStock: true,
        stock: 120,
        rating: 4.4,
        reviews: 201,
        image: '🧂',
        seller: {
          id: 2,
          name: 'Patel Grocery Mart',
          rating: 4.6,
          location: 'Borivali East, Mumbai',
          verified: true
        }
      },
      {
        id: 6,
        name: 'Premium Tea',
        nameHi: 'चाय',
        description: 'Assam leaf tea, strong and aromatic',
        price: 250,
        unit: 'kg',
        category: 'Beverages',
        inStock: true,
        stock: 40,
        rating: 4.7,
        reviews: 167,
        image: '🍵',
        seller: {
          id: 4,
          name: 'Reddy Store',
          rating: 4.8,
          location: 'Bandra West, Mumbai',
          verified: true
        }
      },
      {
        id: 7,
        name: 'Turmeric Powder',
        nameHi: 'हल्दी पाउडर',
        description: 'Pure turmeric powder, organic',
        price: 180,
        unit: 'kg',
        category: 'Spices',
        inStock: true,
        stock: 25,
        rating: 4.9,
        reviews: 312,
        image: '🌿',
        seller: {
          id: 3,
          name: 'Kumar Provisions',
          rating: 4.5,
          location: 'Dadar West, Mumbai',
          verified: true
        }
      },
      {
        id: 8,
        name: 'Red Chilli Powder',
        nameHi: 'लाल मिर्च पाउडर',
        description: 'Hot and spicy, Kashmir special',
        price: 220,
        unit: 'kg',
        category: 'Spices',
        inStock: true,
        stock: 35,
        rating: 4.6,
        reviews: 98,
        image: '🌶️',
        seller: {
          id: 4,
          name: 'Reddy Store',
          rating: 4.8,
          location: 'Bandra West, Mumbai',
          verified: true
        }
      },
      {
        id: 9,
        name: 'Fresh Milk',
        nameHi: 'ताज़ा दूध',
        description: 'Full cream fresh milk, delivered daily',
        price: 60,
        unit: 'L',
        category: 'Dairy',
        inStock: true,
        stock: 50,
        rating: 4.5,
        reviews: 421,
        image: '🥛',
        seller: {
          id: 5,
          name: 'Singh Dairy Farm',
          rating: 4.9,
          location: 'Malad West, Mumbai',
          verified: true
        }
      },
      {
        id: 10,
        name: 'Moong Dal',
        nameHi: 'मूंग दाल',
        description: 'Yellow split moong, protein rich',
        price: 140,
        unit: 'kg',
        category: 'Pulses',
        inStock: true,
        stock: 60,
        rating: 4.4,
        reviews: 76,
        image: '🫘',
        seller: {
          id: 1,
          name: 'Sharma Kirana Store',
          rating: 4.7,
          location: 'Andheri West, Mumbai',
          verified: true
        }
      },
      {
        id: 11,
        name: 'Mustard Oil',
        nameHi: 'सरसों का तेल',
        description: 'Pure kachi ghani mustard oil',
        price: 190,
        unit: 'L',
        category: 'Oil',
        inStock: false,
        stock: 0,
        rating: 4.7,
        reviews: 134,
        image: '🧴',
        seller: {
          id: 3,
          name: 'Kumar Provisions',
          rating: 4.5,
          location: 'Dadar West, Mumbai',
          verified: true
        }
      },
      {
        id: 12,
        name: 'Coffee Powder',
        nameHi: 'कॉफी पाउडर',
        description: 'Pure filter coffee blend',
        price: 320,
        unit: 'kg',
        category: 'Beverages',
        inStock: true,
        stock: 20,
        rating: 4.8,
        reviews: 189,
        image: '☕',
        seller: {
          id: 4,
          name: 'Reddy Store',
          rating: 4.8,
          location: 'Bandra West, Mumbai',
          verified: true
        }
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameHi.includes(searchQuery) ||
        p.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      nameHi: product.nameHi,
      price: product.price,
      unit: product.unit,
      image: product.image,
      category: product.category as any,
      description: product.description,
      seller: {
        id: String(product.seller.id),
        name: product.seller.name
      }
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <CustomerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  🛍️ Browse Products
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Discover quality products from verified local sellers
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/checkout')}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Go to Checkout →
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Search */}
              <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3">Search</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, sellers..."
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-stone-600 dark:text-stone-400 mb-1 block">
                      Min: ₹{priceRange.min}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 dark:text-stone-400 mb-1 block">
                      Max: ₹{priceRange.max}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Showing <span className="font-semibold text-stone-900 dark:text-stone-100">{filteredProducts.length}</span> products
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setPriceRange({ min: 0, max: 1000 });
                      setSortBy('name');
                    }}
                    className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    No products found
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-stone-200 dark:border-stone-700"
                    >
                      {/* Product Image */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-700 dark:to-stone-800 p-8 flex items-center justify-center">
                        <div className="text-6xl">{product.image}</div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="mb-3">
                          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                            {product.nameHi}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-500 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                              ⭐ {product.rating}
                            </span>
                          </div>
                          <span className="text-xs text-stone-500 dark:text-stone-500">
                            ({product.reviews} reviews)
                          </span>
                        </div>

                        {/* Seller Info */}
                        <div className="bg-stone-50 dark:bg-stone-700/50 rounded-lg p-3 mb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-1 mb-1">
                                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                                  {product.seller.name}
                                </p>
                                {product.seller.verified && (
                                  <span className="text-blue-500" title="Verified Seller">
                                    ✓
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-600 dark:text-stone-400 mb-1">
                                📍 {product.seller.location}
                              </p>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                  ⭐ {product.seller.rating}
                                </span>
                                <span className="text-xs text-stone-500 dark:text-stone-500">
                                  seller rating
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => navigate(`/shop/${product.seller.id}`)}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                            >
                              Visit Store
                            </button>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                              ₹{product.price}
                            </div>
                            <div className="text-xs text-stone-500 dark:text-stone-500">
                              per {product.unit}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {product.inStock ? (
                              <>
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                >
                                  + Add to Cart
                                </button>
                                <span className="text-xs text-green-600 dark:text-green-400 text-center">
                                  {product.stock} in stock
                                </span>
                              </>
                            ) : (
                              <button
                                disabled
                                className="px-4 py-2 bg-stone-300 dark:bg-stone-600 text-stone-500 dark:text-stone-400 text-sm font-semibold rounded-lg cursor-not-allowed"
                              >
                                Out of Stock
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
