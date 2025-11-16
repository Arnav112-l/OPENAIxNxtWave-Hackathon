import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ChatPage } from './pages/ChatPage';
import { CartPage } from './pages/CartPage';
import { MerchantOnboardingPage } from './pages/MerchantOnboardingPage';
import { MerchantDashboardPage } from './pages/MerchantDashboardPage';
import { MerchantProductsPage } from './pages/MerchantProductsPage';
import { MerchantOrdersPage } from './pages/MerchantOrdersPage';
import { MerchantProfilePage } from './pages/MerchantProfilePage';
import { MerchantAnalyticsPage } from './pages/MerchantAnalyticsPage';
import { BillingPage } from './pages/BillingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductsPage } from './pages/ProductsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductPage } from './pages/ProductPage';
import { ProfilePage } from './pages/ProfilePage';
import { SupportPage } from './pages/SupportPage';
import { OrdersPage } from './pages/OrdersPage';
import { DeliveryTrackingPage } from './pages/DeliveryTrackingPage';
import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/shop/:shopId" element={<ShopPage />} />
        <Route path="/shop/:shopId/chat" element={<ChatPage />} />
        <Route path="/product/:productId/shop/:shopId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/delivery/:orderId" element={<DeliveryTrackingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/merchant/onboard" element={<MerchantOnboardingPage />} />
        <Route path="/merchant/dashboard" element={<MerchantDashboardPage />} />
        <Route path="/merchant/dashboard/:shopId" element={<MerchantDashboardPage />} />
        <Route path="/merchant/products" element={<MerchantProductsPage />} />
        <Route path="/merchant/orders" element={<MerchantOrdersPage />} />
        <Route path="/merchant/profile" element={<MerchantProfilePage />} />
        <Route path="/merchant/analytics" element={<MerchantAnalyticsPage />} />
        <Route path="/merchant/billing" element={<BillingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
