import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer' as 'customer' | 'seller',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // TODO: Implement actual signup logic with backend
    localStorage.setItem('userType', formData.userType);
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('isLoggedIn', 'true');
    
    alert(`Account created successfully as ${formData.userType}!`);
    
    // Navigate based on user type
    if (formData.userType === 'seller') {
      navigate('/merchant/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900 pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto">
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

        <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-2xl p-8 animate-slide-up">
          <h1 className="text-4xl font-serif font-light text-stone-800 dark:text-stone-100 mb-2 text-center">
            Create Account
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-center mb-8">
            Join our community today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'customer' })}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    formData.userType === 'customer'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-stone-800 border-2 border-amber-200 dark:border-amber-900/50 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                  }`}
                >
                  🛒 Customer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'seller' })}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    formData.userType === 'seller'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-stone-800 border-2 border-amber-200 dark:border-amber-900/50 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                  }`}
                >
                  🏪 Seller
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-900/50 text-stone-800 dark:text-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-stone-600 dark:text-stone-400">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
