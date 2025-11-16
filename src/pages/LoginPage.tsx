import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic with backend
    
    // For demo, check if user type exists in localStorage
    const userType = localStorage.getItem('userType') || 'customer';
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', formData.email.split('@')[0]);
    
    alert('Login successful!');
    
    // Navigate based on user type
    if (userType === 'seller') {
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
            Welcome Back
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-center mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-amber-300 dark:border-amber-800 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-stone-600 dark:text-stone-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-stone-600 dark:text-stone-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
