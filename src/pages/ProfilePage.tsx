import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerSidebar } from '../components/CustomerSidebar';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userType: 'customer' as 'customer' | 'seller',
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Load profile from localStorage
    setProfile({
      name: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      phone: localStorage.getItem('userPhone') || '',
      address: localStorage.getItem('userAddress') || '',
      userType: (localStorage.getItem('userType') as 'customer' | 'seller') || 'customer',
    });
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem('userName', profile.name);
    localStorage.setItem('userEmail', profile.email);
    localStorage.setItem('userPhone', profile.phone);
    localStorage.setItem('userAddress', profile.address);
    
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      <CustomerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => navigate('/dashboard')}
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
              My Profile
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Manage your account information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 text-center animate-fade-in">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-6xl text-white shadow-lg">
                  {profile.userType === 'seller' ? '🏪' : '👤'}
                </div>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
                  {profile.name || 'User'}
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-1 capitalize">
                  {profile.userType}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-500 mb-6">
                  {profile.email || 'No email set'}
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
                <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                  Account Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your full delivery address"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? 'bg-white dark:bg-stone-700 border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 cursor-not-allowed'
                      } text-stone-800 dark:text-stone-100`}
                    />
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

              {/* Account Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">0</div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">Orders</div>
                </div>
                <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">₹0</div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">Spent</div>
                </div>
                <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">0</div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
