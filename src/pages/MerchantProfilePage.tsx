import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerSidebar } from '../components/SellerSidebar';

export const MerchantProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    category: 'grocery',
    openTime: '08:00',
    closeTime: '22:00',
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'seller') {
      navigate('/login');
      return;
    }

    // Load profile from localStorage
    setProfile({
      shopName: localStorage.getItem('shopName') || '',
      ownerName: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      phone: localStorage.getItem('userPhone') || '',
      address: localStorage.getItem('shopAddress') || '',
      description: localStorage.getItem('shopDescription') || '',
      category: localStorage.getItem('shopCategory') || 'grocery',
      openTime: localStorage.getItem('shopOpenTime') || '08:00',
      closeTime: localStorage.getItem('shopCloseTime') || '22:00',
    });
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem('shopName', profile.shopName);
    localStorage.setItem('userName', profile.ownerName);
    localStorage.setItem('userEmail', profile.email);
    localStorage.setItem('userPhone', profile.phone);
    localStorage.setItem('shopAddress', profile.address);
    localStorage.setItem('shopDescription', profile.description);
    localStorage.setItem('shopCategory', profile.category);
    localStorage.setItem('shopOpenTime', profile.openTime);
    localStorage.setItem('shopCloseTime', profile.closeTime);
    
    alert('Shop profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <SellerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => navigate('/merchant/dashboard')}
              className="flex items-center gap-2 text-accent hover:text-pink-500 dark:text-amber-400 dark:hover:text-amber-300 transition-all duration-300 font-bold group mb-6"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span>Back to Dashboard</span>
            </button>

            <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-2">
              Shop Profile
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Manage your shop information and settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 text-center animate-fade-in">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-6xl text-white shadow-lg">
                  🏪
                </div>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
                  {profile.shopName || 'Your Shop'}
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-1 capitalize">
                  {profile.category} Store
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-500 mb-6">
                  Owner: {profile.ownerName || 'N/A'}
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-4">Shop Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-600 dark:text-stone-400">Products:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-100">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 dark:text-stone-400">Orders:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-100">128</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 dark:text-stone-400">Revenue:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">₹45,600</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
                <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                  Shop Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      value={profile.shopName}
                      onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter shop name"
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                      } text-stone-800 dark:text-stone-100`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      value={profile.ownerName}
                      onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter owner name"
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                      } text-stone-800 dark:text-stone-100`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        placeholder="shop@example.com"
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                            : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                        } text-stone-800 dark:text-stone-100`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                            : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                        } text-stone-800 dark:text-stone-100`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Shop Address
                    </label>
                    <textarea
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your shop's complete address"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                      } text-stone-800 dark:text-stone-100`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Shop Description
                    </label>
                    <textarea
                      value={profile.description}
                      onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell customers about your shop..."
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                      } text-stone-800 dark:text-stone-100`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Shop Category
                    </label>
                    <select
                      value={profile.category}
                      onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                      } text-stone-800 dark:text-stone-100`}
                    >
                      <option value="grocery">Grocery Store</option>
                      <option value="vegetables">Vegetables & Fruits</option>
                      <option value="dairy">Dairy Products</option>
                      <option value="bakery">Bakery</option>
                      <option value="meat">Meat & Fish</option>
                      <option value="general">General Store</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        value={profile.openTime}
                        onChange={(e) => setProfile({ ...profile, openTime: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                            : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                        } text-stone-800 dark:text-stone-100`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        value={profile.closeTime}
                        onChange={(e) => setProfile({ ...profile, closeTime: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                            : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                        } text-stone-800 dark:text-stone-100`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
