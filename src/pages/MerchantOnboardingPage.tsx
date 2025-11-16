// Merchant Onboarding Page - Multi-step wizard for shop registration

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductInput {
  name: string;
  nameHi?: string;
  price: number;
  unit: string;
  category: 'staples' | 'dairy' | 'snacks' | 'beverages' | 'personal-care';
  stock: number;
}

type Step = 'info' | 'products' | 'review';

export const MerchantOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [shopInfo, setShopInfo] = useState({
    name: '',
    nameHi: '',
    address: '',
    phone: '',
    ownerName: '',
  });
  
  const [products, setProducts] = useState<ProductInput[]>([
    { name: '', nameHi: '', price: 0, unit: '', category: 'staples', stock: 0 },
  ]);
  
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    // Simulate API call to vision parser
    setTimeout(() => {
      // Mock AI-suggested products
      setProducts([
        { name: 'Tata Salt', nameHi: 'टाटा नमक', price: 22, unit: '1kg', category: 'staples', stock: 50 },
        { name: 'Fortune Atta', nameHi: 'फॉर्च्यून आटा', price: 320, unit: '10kg', category: 'staples', stock: 20 },
        { name: 'Amul Milk', nameHi: 'अमूल दूध', price: 28, unit: '500ml', category: 'dairy', stock: 30 },
      ]);
      setUploading(false);
    }, 2000);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', nameHi: '', price: 0, unit: '', category: 'staples', stock: 0 }]);
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Submit to backend
    alert('Shop registration successful! (Demo)');
    navigate('/');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-10 animate-slide-down">
      {(['info', 'products', 'review'] as Step[]).map((step, index) => (
        <React.Fragment key={step}>
          <button
            onClick={() => {
              // Allow navigation to previous steps only
              if (step === 'info' || 
                  (step === 'products' && shopInfo.name && shopInfo.address && shopInfo.phone && shopInfo.ownerName) ||
                  (step === 'review' && products.some(p => p.name && p.price && p.unit))) {
                setCurrentStep(step);
              }
            }}
            disabled={
              (step === 'products' && (!shopInfo.name || !shopInfo.address || !shopInfo.phone || !shopInfo.ownerName)) ||
              (step === 'review' && products.every(p => !p.name || !p.price || !p.unit))
            }
            className={`flex items-center gap-2 transition-all duration-300 ${
              currentStep === step ? 'scale-110' : 'opacity-50'
            } ${
              (step === 'products' && (!shopInfo.name || !shopInfo.address || !shopInfo.phone || !shopInfo.ownerName)) ||
              (step === 'review' && products.every(p => !p.name || !p.price || !p.unit))
                ? 'cursor-not-allowed'
                : 'cursor-pointer hover:scale-105'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg transition-all duration-300 ${
              currentStep === step ? 'bg-gradient-to-br from-accent via-pink-500 to-purple-500' : 'bg-gray-300'
            }`}>
              {index + 1}
            </div>
            <span className="font-bold text-sm hidden sm:inline text-stone-700 dark:text-stone-300">
              {step === 'info' ? 'Shop Info' : step === 'products' ? 'Products' : 'Review'}
            </span>
          </button>
          {index < 2 && (
            <div className={`w-12 h-1 rounded-full ${
              ['info', 'products'].indexOf(currentStep) > index ? 'bg-gradient-to-r from-accent to-pink-500' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-8">
        Tell us about your shop
      </h2>
      
      <div>
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Shop Name (English)</label>
        <input
          type="text"
          value={shopInfo.name}
          onChange={(e) => setShopInfo({ ...shopInfo, name: e.target.value })}
          className="w-full px-4 py-3.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          placeholder="e.g., Sharma Kirana Store"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Shop Name (Hindi) - Optional</label>
        <input
          type="text"
          value={shopInfo.nameHi}
          onChange={(e) => setShopInfo({ ...shopInfo, nameHi: e.target.value })}
          className="w-full px-4 py-3.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          placeholder="e.g., शर्मा किराना स्टोर"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Address</label>
        <textarea
          value={shopInfo.address}
          onChange={(e) => setShopInfo({ ...shopInfo, address: e.target.value })}
          className="w-full px-4 py-3.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
          rows={3}
          placeholder="Shop number, street, area"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Phone Number</label>
          <input
            type="tel"
            value={shopInfo.phone}
            onChange={(e) => setShopInfo({ ...shopInfo, phone: e.target.value })}
            className="w-full px-4 py-3.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Owner Name</label>
          <input
            type="text"
            value={shopInfo.ownerName}
            onChange={(e) => setShopInfo({ ...shopInfo, ownerName: e.target.value })}
            className="w-full px-4 py-3.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            placeholder="Your name"
          />
        </div>
      </div>
      
      <div className="flex gap-4 pt-6">
        <button onClick={() => navigate('/')} className="flex-1 px-6 py-3.5 bg-white dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:border-amber-500 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all">
          Cancel
        </button>
        <button
          onClick={() => setCurrentStep('products')}
          disabled={!shopInfo.name || !shopInfo.address || !shopInfo.phone || !shopInfo.ownerName}
          className="flex-1 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Add Products
        </button>
      </div>
    </div>
  );

  const renderProductsStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 dark:text-stone-100">
          Add Products
        </h2>
        <label className="px-4 py-2.5 bg-white dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:border-amber-500 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all cursor-pointer flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {uploading ? 'Analyzing...' : 'Scan Products'}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {products.map((product, index) => (
          <div key={index} className="bg-amber-50/50 dark:bg-stone-800/80 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Product Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                  placeholder="e.g., Tata Salt"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Hindi Name (Optional)</label>
                <input
                  type="text"
                  value={product.nameHi}
                  onChange={(e) => updateProduct(index, 'nameHi', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                  placeholder="e.g., टाटा नमक"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={product.price || ''}
                  onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                  placeholder="22"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Unit</label>
                <input
                  type="text"
                  value={product.unit}
                  onChange={(e) => updateProduct(index, 'unit', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                  placeholder="1kg, 500ml, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Category</label>
                <select
                  value={product.category}
                  onChange={(e) => updateProduct(index, 'category', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="staples">Staples</option>
                  <option value="dairy">Dairy</option>
                  <option value="snacks">Snacks</option>
                  <option value="beverages">Beverages</option>
                  <option value="personal-care">Personal Care</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={product.stock || ''}
                  onChange={(e) => updateProduct(index, 'stock', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                  placeholder="50"
                />
              </div>
            </div>
            
            {products.length > 1 && (
              <button
                onClick={() => removeProduct(index)}
                className="mt-4 text-red-600 dark:text-red-400 text-sm font-semibold hover:text-red-700 dark:hover:text-red-300 flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      
      <button onClick={addProduct} className="w-full px-6 py-3.5 bg-white dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:border-amber-500 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Another Product
      </button>
      
      <div className="flex gap-4 pt-6">
        <button onClick={() => setCurrentStep('info')} className="flex-1 px-6 py-3.5 bg-white dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:border-amber-500 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all">
          Back
        </button>
        <button
          onClick={() => setCurrentStep('review')}
          disabled={products.some(p => !p.name || !p.price || !p.unit)}
          className="flex-1 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review & Submit
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-8">
        Review Your Shop
      </h2>
      
      <div className="bg-amber-50/50 dark:bg-stone-800/80 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-xl text-stone-800 dark:text-stone-100 mb-5">Shop Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div>
            <span className="text-stone-600 dark:text-stone-400 font-semibold block mb-1">Name:</span>
            <p className="font-semibold text-stone-800 dark:text-stone-100">{shopInfo.name}</p>
          </div>
          {shopInfo.nameHi && (
            <div>
              <span className="text-stone-600 dark:text-stone-400 font-semibold block mb-1">Hindi Name:</span>
              <p className="font-semibold text-stone-800 dark:text-stone-100">{shopInfo.nameHi}</p>
            </div>
          )}
          <div className="sm:col-span-2">
            <span className="text-stone-600 dark:text-stone-400 font-semibold block mb-1">Address:</span>
            <p className="font-semibold text-stone-800 dark:text-stone-100">{shopInfo.address}</p>
          </div>
          <div>
            <span className="text-stone-600 dark:text-stone-400 font-semibold block mb-1">Phone:</span>
            <p className="font-semibold text-stone-800 dark:text-stone-100">{shopInfo.phone}</p>
          </div>
          <div>
            <span className="text-stone-600 dark:text-stone-400 font-semibold block mb-1">Owner:</span>
            <p className="font-semibold text-stone-800 dark:text-stone-100">{shopInfo.ownerName}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50/50 dark:bg-stone-800/80 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-xl text-stone-800 dark:text-stone-100 mb-5">
          Products ({products.length})
        </h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-900/30 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <p className="font-semibold text-stone-800 dark:text-stone-100">{product.name}</p>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-medium mt-1">
                  {product.unit} • {product.category} • Stock: {product.stock}
                </p>
              </div>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 pt-6">
        <button onClick={() => setCurrentStep('products')} className="flex-1 px-6 py-3.5 bg-white dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:border-amber-500 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all">
          Back
        </button>
        <button onClick={handleSubmit} className="flex-1 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all">
          Submit & Launch Shop
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-accent hover:text-pink-500 dark:text-amber-400 dark:hover:text-amber-300 transition-all duration-300 font-bold group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span>Back to Home</span>
          </button>
        </div>
        
        {renderStepIndicator()}
        
        <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-2xl p-8 md:p-10 animate-slide-up">
          {currentStep === 'info' && renderInfoStep()}
          {currentStep === 'products' && renderProductsStep()}
          {currentStep === 'review' && renderReviewStep()}
        </div>
      </div>
    </div>
  );
};
