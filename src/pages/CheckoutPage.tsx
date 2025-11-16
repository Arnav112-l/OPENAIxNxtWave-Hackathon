import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CustomerSidebar } from '../components/CustomerSidebar';

interface BillingForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: 'card' | 'upi' | 'cod';
  discountPercent: number;
}

interface Product {
  id: number;
  name: string;
  nameHi: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  
  const [billingForm, setBillingForm] = useState<BillingForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'upi',
    discountPercent: 0
  });

  const [showProducts, setShowProducts] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  // Sample products
  const products: Product[] = [
    {
      id: 1,
      name: 'Basmati Rice',
      nameHi: 'बासमती चावल',
      description: 'Premium quality long grain rice',
      price: 150,
      unit: 'kg',
      image: '🌾',
      category: 'Grains'
    },
    {
      id: 2,
      name: 'Whole Wheat Flour',
      nameHi: 'गेहूं का आटा',
      description: 'Fresh stone ground atta',
      price: 45,
      unit: 'kg',
      image: '🌾',
      category: 'Grains'
    },
    {
      id: 3,
      name: 'Toor Dal',
      nameHi: 'तूर दाल',
      description: 'Premium yellow lentils',
      price: 120,
      unit: 'kg',
      image: '🫘',
      category: 'Pulses'
    },
    {
      id: 4,
      name: 'Cooking Oil',
      nameHi: 'खाना पकाने का तेल',
      description: 'Refined sunflower oil',
      price: 180,
      unit: 'L',
      image: '🧴',
      category: 'Oil'
    },
    {
      id: 5,
      name: 'Sugar',
      nameHi: 'चीनी',
      description: 'Pure white crystal sugar',
      price: 42,
      unit: 'kg',
      image: '🧂',
      category: 'Groceries'
    },
    {
      id: 6,
      name: 'Tea',
      nameHi: 'चाय',
      description: 'Premium leaf tea',
      price: 250,
      unit: 'kg',
      image: '🍵',
      category: 'Beverages'
    }
  ];

  // Calculations
  const subtotal = getTotal();
  const discountAmount = (subtotal * billingForm.discountPercent) / 100;
  const afterDiscount = subtotal - discountAmount;
  const tax = (afterDiscount * 18) / 100;
  const shipping = afterDiscount > 0 && afterDiscount < 1000 ? 49 : 0;
  const finalTotal = afterDiscount + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingForm(prev => ({
      ...prev,
      [name]: name === 'discountPercent' ? Math.min(100, Math.max(0, Number(value))) : value
    }));
  };

  const handleAddToCart = (product: Product) => {
    const productToAdd: any = {
      id: String(product.id),
      shopId: '1',
      name: product.name,
      nameHi: product.nameHi,
      price: product.price,
      unit: product.unit,
      category: product.category as any,
      stock: 100,
      inStock: true
    };
    addToCart(productToAdd);
  };

  const loadDemoBill = () => {
    clearCart();
    products.slice(0, 3).forEach(product => {
      const productToAdd: any = {
        id: String(product.id),
        shopId: '1',
        name: product.name,
        nameHi: product.nameHi,
        price: product.price,
        unit: product.unit,
        category: product.category as any,
        stock: 100,
        inStock: true
      };
      addToCart(productToAdd);
      addToCart(productToAdd); // Add twice for quantity 2
    });
    setBillingForm({
      fullName: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john@example.com',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      paymentMethod: 'upi',
      discountPercent: 10
    });
    setShowProducts(false);
  };

  const generateInvoice = () => {
    if (!billingForm.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const invoice = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
      customer: billingForm,
      items: cart,
      subtotal,
      discountPercent: billingForm.discountPercent,
      discountAmount,
      afterDiscount,
      tax,
      shipping,
      finalTotal
    };

    setInvoiceData(invoice);
    setShowInvoice(true);
  };

  const printInvoice = () => {
    window.print();
  };

  const saveBillAsJSON = () => {
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `invoice-${invoiceData.invoiceNumber}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-stone-900 dark:via-indigo-950 dark:to-purple-950">
      <CustomerSidebar />
      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  🛒 Complete Checkout
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Select products, fill details, and generate invoice
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-900 dark:text-stone-100 rounded-lg transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={loadDemoBill}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Load Demo
                </button>
              </div>
            </div>
          </div>

          {!showInvoice ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Section - Products & Billing Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Products Section */}
                {showProducts && (
                  <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                        Available Products
                      </h2>
                      <button
                        onClick={() => setShowProducts(false)}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Hide Products
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products.map(product => (
                        <div
                          key={product.id}
                          className="bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-700 dark:to-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-16 bg-white dark:bg-stone-600 rounded-lg flex items-center justify-center text-3xl">
                              {product.image}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                                {product.name}
                              </h3>
                              <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
                                {product.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                  ₹{product.price}/{product.unit}
                                </span>
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                  + Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!showProducts && (
                  <button
                    onClick={() => setShowProducts(true)}
                    className="w-full py-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    + Show Products
                  </button>
                )}

                {/* Billing Form */}
                <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                    Billing Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={billingForm.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={billingForm.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={billingForm.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={billingForm.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                          Payment Method
                        </label>
                        <select
                          name="paymentMethod"
                          value={billingForm.paymentMethod}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="upi">UPI Payment</option>
                          <option value="card">Credit/Debit Card</option>
                          <option value="cod">Cash on Delivery</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          name="discountPercent"
                          value={billingForm.discountPercent}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Cart & Summary */}
              <div className="space-y-6">
                {/* Cart */}
                <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                      Cart ({cart.length})
                    </h2>
                    {cart.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-3">🛒</div>
                      <p className="text-stone-600 dark:text-stone-400">Your cart is empty</p>
                      <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                        Add products to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div
                          key={item.productId}
                          className="bg-stone-50 dark:bg-stone-700 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                                {item.product.name}
                              </h3>
                              <p className="text-xs text-stone-600 dark:text-stone-400">
                                ₹{item.product.price}/{item.product.unit}
                              </p>
                            </div>
                            <button
                              onClick={() => updateQuantity(item.productId, 0)}
                              className="text-red-500 hover:text-red-600 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 bg-stone-200 dark:bg-stone-600 rounded-md hover:bg-stone-300 dark:hover:bg-stone-500 transition-colors"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-semibold text-stone-900 dark:text-stone-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-7 h-7 bg-stone-200 dark:bg-stone-600 rounded-md hover:bg-stone-300 dark:hover:bg-stone-500 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Billing Summary */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                  <h2 className="text-xl font-bold mb-4">Billing Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {billingForm.discountPercent > 0 && (
                      <div className="flex justify-between text-sm text-indigo-100">
                        <span>Discount ({billingForm.discountPercent}%):</span>
                        <span>− ₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Tax (18% GST):</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-indigo-100">
                        💡 Free shipping on orders above ₹1000
                      </p>
                    )}
                    <div className="border-t border-indigo-300 my-3"></div>
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={generateInvoice}
                    disabled={cart.length === 0}
                    className="w-full mt-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🧾 Generate Invoice & Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Invoice Display */
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8 print:shadow-none" id="invoice">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  INVOICE
                </h1>
                <div className="text-stone-600 dark:text-stone-400">
                  <p className="font-mono text-lg">{invoiceData.invoiceNumber}</p>
                  <p className="text-sm">{invoiceData.date} • {invoiceData.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase mb-2">
                    Billed To
                  </h3>
                  <div className="text-stone-900 dark:text-stone-100">
                    <p className="font-bold">{invoiceData.customer.fullName}</p>
                    <p className="text-sm">{invoiceData.customer.phone}</p>
                    <p className="text-sm">{invoiceData.customer.email}</p>
                    <p className="text-sm mt-2">{invoiceData.customer.address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase mb-2">
                    Payment Method
                  </h3>
                  <p className="text-stone-900 dark:text-stone-100 font-medium capitalize">
                    {invoiceData.customer.paymentMethod === 'upi' && '📱 UPI Payment'}
                    {invoiceData.customer.paymentMethod === 'card' && '💳 Card Payment'}
                    {invoiceData.customer.paymentMethod === 'cod' && '💵 Cash on Delivery'}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-stone-300 dark:border-stone-600">
                      <th className="text-left py-3 text-stone-700 dark:text-stone-300 font-semibold">Item</th>
                      <th className="text-center py-3 text-stone-700 dark:text-stone-300 font-semibold">Qty</th>
                      <th className="text-right py-3 text-stone-700 dark:text-stone-300 font-semibold">Price</th>
                      <th className="text-right py-3 text-stone-700 dark:text-stone-300 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item: any) => (
                      <tr key={item.id} className="border-b border-stone-200 dark:border-stone-700">
                        <td className="py-3 text-stone-900 dark:text-stone-100">{item.name}</td>
                        <td className="text-center py-3 text-stone-900 dark:text-stone-100">{item.quantity}</td>
                        <td className="text-right py-3 text-stone-900 dark:text-stone-100">
                          ₹{item.price}/{item.unit}
                        </td>
                        <td className="text-right py-3 text-stone-900 dark:text-stone-100 font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mb-8">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-stone-700 dark:text-stone-300">
                    <span>Subtotal:</span>
                    <span>₹{invoiceData.subtotal.toFixed(2)}</span>
                  </div>
                  {invoiceData.discountPercent > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({invoiceData.discountPercent}%):</span>
                      <span>− ₹{invoiceData.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-700 dark:text-stone-300">
                    <span>Tax (18% GST):</span>
                    <span>₹{invoiceData.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-700 dark:text-stone-300">
                    <span>Shipping:</span>
                    <span>{invoiceData.shipping === 0 ? 'FREE' : `₹${invoiceData.shipping}`}</span>
                  </div>
                  <div className="border-t-2 border-stone-300 dark:border-stone-600 pt-2 mt-2">
                    <div className="flex justify-between text-xl font-bold text-stone-900 dark:text-stone-100">
                      <span>Total:</span>
                      <span>₹{invoiceData.finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 print:hidden">
                <button
                  onClick={printInvoice}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                >
                  🖨️ Print Invoice
                </button>
                <button
                  onClick={saveBillAsJSON}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                >
                  💾 Save as JSON
                </button>
                <button
                  onClick={() => {
                    setShowInvoice(false);
                    clearCart();
                    setBillingForm({
                      fullName: '',
                      phone: '',
                      email: '',
                      address: '',
                      paymentMethod: 'upi',
                      discountPercent: 0
                    });
                  }}
                  className="flex-1 py-3 bg-stone-600 hover:bg-stone-700 text-white font-semibold rounded-xl transition-colors"
                >
                  New Order
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-700 text-center text-sm text-stone-600 dark:text-stone-400">
                <p>Thank you for your business!</p>
                <p className="mt-1">Kirana Store • kiranastore@example.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
