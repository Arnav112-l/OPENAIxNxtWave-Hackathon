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

export type Category = 'staples' | 'dairy' | 'snacks' | 'beverages' | 'personal-care' | 'all';
export type Language = 'en' | 'hi';
