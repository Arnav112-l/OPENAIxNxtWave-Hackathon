import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Authenticate with Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        // Fallback to localStorage-based auth if Supabase isn't configured
        if (authError.message.includes('fetch') || authError.message.includes('Email')) {
          console.warn('Supabase auth not available, using fallback authentication');
          
          // Use localStorage-based authentication as fallback
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userName', formData.email.split('@')[0]);
          localStorage.setItem('userEmail', formData.email);

          // Set shop owner ID based on email
          const email = formData.email.toLowerCase();
          if (email.includes('sharma')) {
            localStorage.setItem('userId', 'owner1');
            localStorage.setItem('userType', 'seller');
          } else if (email.includes('patel')) {
            localStorage.setItem('userId', 'owner2');
            localStorage.setItem('userType', 'seller');
          } else if (email.includes('kumar')) {
            localStorage.setItem('userId', 'owner3');
            localStorage.setItem('userType', 'seller');
          } else if (email.includes('verma')) {
            localStorage.setItem('userId', 'owner4');
            localStorage.setItem('userType', 'seller');
          } else if (email.includes('singh')) {
            localStorage.setItem('userId', 'owner5');
            localStorage.setItem('userType', 'seller');
          } else if (email.includes('gupta')) {
            localStorage.setItem('userId', 'owner6');
            localStorage.setItem('userType', 'seller');
          } else {
            localStorage.setItem('userId', 'user_' + Date.now());
            localStorage.setItem('userType', 'customer');
          }

          const userType = localStorage.getItem('userType') || 'customer';
          
          if (userType === 'seller') {
            navigate('/merchant/dashboard');
          } else {
            navigate('/dashboard');
          }
          setLoading(false);
          return;
        } else if (authError.message.includes('Invalid')) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // Store user info in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', data.user.email?.split('@')[0] || 'User');
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email || '');

        // Determine user type based on email domain or metadata
        const userType = localStorage.getItem('userType') || 'customer';
        
        // Set shop owner ID based on email for marketplace functionality
        const email = formData.email.toLowerCase();
        if (email.includes('sharma')) {
          localStorage.setItem('userId', 'owner1');
        } else if (email.includes('patel')) {
          localStorage.setItem('userId', 'owner2');
        } else if (email.includes('kumar')) {
          localStorage.setItem('userId', 'owner3');
        } else if (email.includes('verma')) {
          localStorage.setItem('userId', 'owner4');
        } else if (email.includes('singh')) {
          localStorage.setItem('userId', 'owner5');
        } else if (email.includes('gupta')) {
          localStorage.setItem('userId', 'owner6');
        } else {
          localStorage.setItem('userId', data.user.id);
        }

        // Navigate based on user type
        if (userType === 'seller') {
          navigate('/merchant/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      if (err.message && err.message.includes('fetch')) {
        setError('Unable to connect to authentication service. Please check your internet connection and the Supabase configuration.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

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
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
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
