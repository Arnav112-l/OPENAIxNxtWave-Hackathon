import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerSidebar } from '../components/SellerSidebar';

export const BillingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'payment'>('overview');

  // Mock billing data
  const currentPlan = {
    name: 'Free Plan',
    price: 0,
    nextBilling: 'N/A',
    features: ['Basic Analytics', 'Up to 50 Products', 'Email Support', '1 User Account']
  };

  const proPlan = {
    name: 'Pro Plan',
    price: 29,
    features: [
      'Advanced Analytics',
      'Unlimited Products',
      'Priority Support',
      'Unlimited Users',
      'Custom Branding',
      'API Access',
      'Inventory Management',
      'Sales Reports'
    ]
  };

  const transactions = [
    { id: 'INV-001', date: 'Nov 15, 2025', description: 'Pro Plan - Monthly', amount: 29, status: 'Paid' },
    { id: 'INV-002', date: 'Oct 15, 2025', description: 'Pro Plan - Monthly', amount: 29, status: 'Paid' },
    { id: 'INV-003', date: 'Sep 15, 2025', description: 'Pro Plan - Monthly', amount: 29, status: 'Paid' },
    { id: 'INV-004', date: 'Aug 15, 2025', description: 'Pro Plan - Monthly', amount: 29, status: 'Paid' }
  ];

  const paymentMethods = [
    { id: 1, type: 'UPI', details: 'user@paytm', isDefault: true },
    { id: 2, type: 'Card', details: '•••• •••• •••• 4242', isDefault: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900">
      <SellerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                  Billing & Subscription
                </h1>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Manage your subscription and payment methods
                </p>
              </div>
              <button
                onClick={() => navigate('/merchant/dashboard')}
                className="px-4 py-2 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-900 dark:text-stone-100 rounded-lg transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg rounded-3xl shadow-xl mb-6">
            <div className="flex border-b border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Billing History
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'payment'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Payment Methods
              </button>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                      Current Plan
                    </h2>
                    <div className="bg-stone-50 dark:bg-stone-700/50 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                            {currentPlan.name}
                          </h3>
                          <p className="text-stone-600 dark:text-stone-400 mt-1">
                            Next billing: {currentPlan.nextBilling}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                            ₹{currentPlan.price}
                          </div>
                          <div className="text-sm text-stone-600 dark:text-stone-400">per month</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        {currentPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400">✓</span>
                            <span className="text-sm text-stone-700 dark:text-stone-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Upgrade Section */}
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                      Upgrade to Pro
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{proPlan.name}</h3>
                          <p className="text-blue-100 mt-1">Unlock all premium features</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">₹{proPlan.price}</div>
                          <div className="text-sm text-blue-100">per month</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 my-6">
                        {proPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-white">✓</span>
                            <span className="text-sm text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                    Transaction History
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-stone-200 dark:border-stone-700">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                            Invoice
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                            Description
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                            Amount
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                            Status
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-stone-700 dark:text-stone-300">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30">
                            <td className="py-4 px-4 text-sm text-stone-900 dark:text-stone-100 font-medium">
                              {transaction.id}
                            </td>
                            <td className="py-4 px-4 text-sm text-stone-600 dark:text-stone-400">
                              {transaction.date}
                            </td>
                            <td className="py-4 px-4 text-sm text-stone-900 dark:text-stone-100">
                              {transaction.description}
                            </td>
                            <td className="py-4 px-4 text-sm text-right text-stone-900 dark:text-stone-100 font-semibold">
                              ₹{transaction.amount}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full">
                                {transaction.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                      Payment Methods
                    </h2>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      + Add New
                    </button>
                  </div>

                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-xl">
                            {method.type === 'UPI' ? '💳' : '🏦'}
                          </div>
                          <div>
                            <div className="font-semibold text-stone-900 dark:text-stone-100">
                              {method.type}
                            </div>
                            <div className="text-sm text-stone-600 dark:text-stone-400">
                              {method.details}
                            </div>
                          </div>
                          {method.isDefault && (
                            <span className="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <button className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                              Set Default
                            </button>
                          )}
                          <button className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:underline">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">ℹ️</span>
                      <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                          Secure Payments
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                          All payment information is encrypted and secure. We never store your full card details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
