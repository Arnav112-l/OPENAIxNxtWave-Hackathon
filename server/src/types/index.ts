// Type definitions for KiranaConnect

export interface Shop {
  id: string;
  name: string;
  nameHi?: string;
  address: string;
  distance: number;
  deliveryTime: number;
  rating?: number;
  open: boolean;
  image?: string;
  offers?: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  nameHi?: string;
  desc?: string;
  descHi?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: 'staples' | 'dairy' | 'snacks' | 'beverages' | 'personal-care';
  image?: string;
  stock: number;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  shopId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  createdAt: Date;
}

export interface AIParsedItem {
  name: string;
  nameHi?: string;
  quantity: string;
  unit?: string;
  confidence: number;
  substitute?: string;
  productId?: string;
}

export interface AIParsedOrder {
  items: AIParsedItem[];
  clarifications?: string[];
}

export interface AIVisionProduct {
  product_name: string;
  brand?: string;
  approx_size?: string;
  category: string;
  confidence: number;
}

export interface AISubstitute {
  productId: string;
  name: string;
  nameHi?: string;
  reason: string;
  price: number;
  available: boolean;
}

export interface ShopOnboardingData {
  name: string;
  nameHi?: string;
  address: string;
  phone: string;
  ownerName: string;
  products: Omit<Product, 'id' | 'shopId'>[];
}

export type Category = 'staples' | 'dairy' | 'snacks' | 'beverages' | 'personal-care' | 'all';
