import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-accent mb-6">
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Language Setting */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Language / भाषा</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-3 rounded-lg font-medium ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-accent to-pink-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`flex-1 py-3 rounded-lg font-medium ${
                  language === 'hi'
                    ? 'bg-gradient-to-r from-accent to-pink-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          {/* Accessibility */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Accessibility</h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>High Contrast Mode</span>
                <input type="checkbox" className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span>Large Text</span>
                <input type="checkbox" className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span>Reduce Animations</span>
                <input type="checkbox" className="w-5 h-5" />
              </label>
            </div>
          </div>

          {/* About */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-2">KiranaConnect v1.0.0</p>
            <p className="text-sm text-gray-500">
              AI-powered local commerce platform connecting customers with neighbourhood stores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
