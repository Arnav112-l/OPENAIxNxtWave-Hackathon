import React, { useState } from 'react';
import { CustomerSidebar } from '../components/CustomerSidebar';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'orders' | 'payments' | 'delivery' | 'returns' | 'account';
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: 'orders',
    question: 'How do I place an order?',
    answer: 'Browse shops on the map or list view, select items, add to cart, and proceed to checkout. You can track your order in real-time after placing it.',
  },
  {
    id: 2,
    category: 'orders',
    question: 'Can I modify my order after placing it?',
    answer: 'Orders can be modified within 5 minutes of placement. After that, please contact the shop directly or our support team.',
  },
  {
    id: 3,
    category: 'delivery',
    question: 'What are the delivery charges?',
    answer: 'Delivery charges are ₹30 per order. Free delivery on orders above ₹500 from select shops.',
  },
  {
    id: 4,
    category: 'delivery',
    question: 'How long does delivery take?',
    answer: 'Most deliveries are completed within 30-60 minutes. You can track your order in real-time on the map.',
  },
  {
    id: 5,
    category: 'payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, credit/debit cards, net banking, and cash on delivery for most orders.',
  },
  {
    id: 6,
    category: 'payments',
    question: 'Is online payment safe?',
    answer: 'Yes! All transactions are encrypted and processed through secure payment gateways. We never store your card details.',
  },
  {
    id: 7,
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'Returns are accepted within 24 hours for damaged or incorrect items. Contact support with photos for quick resolution.',
  },
  {
    id: 8,
    category: 'account',
    question: 'How do I update my profile?',
    answer: 'Go to your Profile page to update your name, email, phone number, and delivery addresses.',
  },
];

export const SupportPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [supportForm, setSupportForm] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    subject: '',
    message: '',
  });

  const categories = [
    { id: 'all', name: 'All Topics', emoji: '📋', color: 'amber' },
    { id: 'orders', name: 'Orders', emoji: '📦', color: 'blue' },
    { id: 'payments', name: 'Payments', emoji: '💳', color: 'green' },
    { id: 'delivery', name: 'Delivery', emoji: '🚚', color: 'orange' },
    { id: 'returns', name: 'Returns', emoji: '↩️', color: 'red' },
    { id: 'account', name: 'Account', emoji: '👤', color: 'purple' },
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted! We\'ll get back to you within 24 hours.');
    setSupportForm({ ...supportForm, subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 dark:from-stone-900 dark:via-amber-950 dark:to-stone-900">
      <CustomerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <div className="text-6xl mb-4">🎧</div>
            <h1 className="text-5xl font-serif font-light text-stone-800 dark:text-stone-100 mb-4">
              Customer Support
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400">
              We're here to help! Find answers or get in touch with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Methods */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
                <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                  Quick Contact
                </h2>
                
                <div className="space-y-4">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:shadow-lg transition-all group"
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform">📞</div>
                    <div>
                      <div className="font-semibold">Call Us</div>
                      <div className="text-sm opacity-90">+91 98765 43210</div>
                    </div>
                  </a>

                  <a
                    href="mailto:support@kiranaconnect.com"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:shadow-lg transition-all group"
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform">✉️</div>
                    <div>
                      <div className="font-semibold">Email Us</div>
                      <div className="text-sm opacity-90">support@kiranaconnect.com</div>
                    </div>
                  </a>

                  <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:shadow-lg transition-all group">
                    <div className="text-3xl group-hover:scale-110 transition-transform">💬</div>
                    <div>
                      <div className="font-semibold">Live Chat</div>
                      <div className="text-sm opacity-90">Available 24x7</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4">
                  Support Hours
                </h3>
                <div className="space-y-2 text-stone-600 dark:text-stone-400">
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-100">9 AM - 9 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-100">10 AM - 6 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - FAQs */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-stone-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 rounded-3xl shadow-xl p-8 animate-slide-up">
                <h2 className="text-2xl font-serif font-light text-stone-800 dark:text-stone-100 mb-6">
                  Frequently Asked Questions
                </h2>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                          : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
                      }`}
                    >
                      <span className="mr-2">{cat.emoji}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-stone-200 dark:border-stone-700 rounded-2xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-all"
                      >
                        <span className="font-semibold text-stone-800 dark:text-stone-100 pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-amber-600 dark:text-amber-400 transition-transform flex-shrink-0 ${
                            expandedFaq === faq.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-700/30 text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-700">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Contact Form */}
                <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700">
                  <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4">
                    Still need help? Send us a message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={supportForm.name}
                        onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                        required
                        className="px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={supportForm.email}
                        onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                        required
                        className="px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500"
                    />
                    <textarea
                      placeholder="Describe your issue..."
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all"
                    >
                      Submit Ticket
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
