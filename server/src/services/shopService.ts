import { Shop, Product } from '../types';

// Mock data for development
export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Sharma Kirana Store',
    nameHi: 'शर्मा किराना स्टोर',
    address: 'Shop 12, Market Road, Sector 15',
    distance: 0.5,
    deliveryTime: 15,
    rating: 4.5,
    open: true,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    offers: '20% off on orders above ₹500',
  },
  {
    id: '2',
    name: 'Gupta General Store',
    nameHi: 'गुप्ता जनरल स्टोर',
    address: '45, Main Bazaar, Old City',
    distance: 1.2,
    deliveryTime: 20,
    rating: 4.3,
    open: true,
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400',
    offers: 'Free delivery on orders above ₹300',
  },
  {
    id: '3',
    name: 'Modern Provision Store',
    nameHi: 'मॉडर्न प्रोविजन स्टोर',
    address: '78, Gandhi Nagar',
    distance: 2.1,
    deliveryTime: 30,
    rating: 4.7,
    open: false,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
  },
  {
    id: '4',
    name: 'Patel Brothers Store',
    nameHi: 'पटेल ब्रदर्स स्टोर',
    address: 'Shop 5, Ring Road, Block A',
    distance: 0.8,
    deliveryTime: 18,
    rating: 4.6,
    open: true,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    offers: '10% off on first order',
  },
  {
    id: '5',
    name: 'Verma General Stores',
    nameHi: 'वर्मा जनरल स्टोर्स',
    address: '23, Station Road',
    distance: 1.5,
    deliveryTime: 25,
    rating: 4.4,
    open: true,
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400',
    offers: 'Free delivery above ₹250',
  },
  {
    id: '6',
    name: 'Krishna Provision',
    nameHi: 'कृष्णा प्रोविजन',
    address: '67, Temple Street',
    distance: 1.0,
    deliveryTime: 20,
    rating: 4.5,
    open: true,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
  },
  {
    id: '7',
    name: 'Raj Kirana Bhandar',
    nameHi: 'राज किराना भंडार',
    address: '89, Civil Lines',
    distance: 1.8,
    deliveryTime: 28,
    rating: 4.2,
    open: true,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    offers: '15% cashback',
  },
  {
    id: '8',
    name: 'Singh General Merchant',
    nameHi: 'सिंह जनरल मर्चेंट',
    address: '12, Park Avenue',
    distance: 0.6,
    deliveryTime: 15,
    rating: 4.8,
    open: true,
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400',
    offers: '25% off on groceries',
  },
  {
    id: '9',
    name: 'Bansal Stores',
    nameHi: 'बंसल स्टोर्स',
    address: '34, Market Complex',
    distance: 2.5,
    deliveryTime: 35,
    rating: 4.1,
    open: false,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
  },
  {
    id: '10',
    name: 'New India Provision',
    nameHi: 'न्यू इंडिया प्रोविजन',
    address: '56, Railway Colony',
    distance: 1.3,
    deliveryTime: 22,
    rating: 4.3,
    open: true,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    offers: 'Buy 2 Get 1 Free',
  },
];

export const mockProducts: Product[] = [
  // Sharma Kirana Store - Staples
  {
    id: 'p1',
    shopId: '1',
    name: 'Tata Salt',
    nameHi: 'टाटा नमक',
    desc: 'Iodized Salt',
    price: 22,
    originalPrice: 25,
    unit: '1kg',
    category: 'staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
    stock: 50,
    inStock: true,
  },
  {
    id: 'p2',
    shopId: '1',
    name: 'Fortune Chakki Atta',
    nameHi: 'फॉर्च्यून चक्की आटा',
    desc: 'Whole Wheat Flour',
    price: 320,
    originalPrice: 350,
    unit: '10kg',
    category: 'staples',
    image: 'https://images.unsplash.com/photo-1628505896859-e9b00d4e5d2e?w=200',
    stock: 20,
    inStock: true,
  },
  {
    id: 'p3',
    shopId: '1',
    name: 'India Gate Basmati Rice',
    nameHi: 'इंडिया गेट बासमती चावल',
    desc: 'Premium Rice',
    price: 520,
    unit: '5kg',
    category: 'staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
    stock: 3,
    inStock: true,
  },
  // Sharma Kirana Store - Dairy
  {
    id: 'p4',
    shopId: '1',
    name: 'Amul Taaza Milk',
    nameHi: 'अमूल ताज़ा दूध',
    desc: 'Toned Milk',
    price: 28,
    unit: '500ml',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200',
    stock: 30,
    inStock: true,
  },
  {
    id: 'p5',
    shopId: '1',
    name: 'Amul Butter',
    nameHi: 'अमूल मक्खन',
    desc: 'Salted Butter',
    price: 60,
    originalPrice: 65,
    unit: '100g',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200',
    stock: 15,
    inStock: true,
  },
  // Sharma Kirana Store - Snacks
  {
    id: 'p6',
    shopId: '1',
    name: 'Parle-G Biscuits',
    nameHi: 'पारले-जी बिस्कुट',
    desc: 'Glucose Biscuits',
    price: 10,
    unit: '100g',
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4a3a5fff?w=200',
    stock: 100,
    inStock: true,
  },
  {
    id: 'p7',
    shopId: '1',
    name: 'Haldirams Namkeen',
    nameHi: 'हल्दीराम नमकीन',
    desc: 'Mixture',
    price: 40,
    unit: '200g',
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200',
    stock: 0,
    inStock: false,
  },
  // Gupta General Store - Staples
  {
    id: 'p8',
    shopId: '2',
    name: 'Aashirvaad Atta',
    nameHi: 'आशीर्वाद आटा',
    desc: 'Whole Wheat Flour',
    price: 315,
    unit: '10kg',
    category: 'staples',
    image: 'https://images.unsplash.com/photo-1628505896859-e9b00d4e5d2e?w=200',
    stock: 25,
    inStock: true,
  },
  {
    id: 'p9',
    shopId: '2',
    name: 'Toor Dal',
    nameHi: 'तूर दाल',
    desc: 'Arhar Dal',
    price: 140,
    unit: '1kg',
    category: 'staples',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200',
    stock: 40,
    inStock: true,
  },
  // Gupta General Store - Dairy
  {
    id: 'p10',
    shopId: '2',
    name: 'Mother Dairy Milk',
    nameHi: 'मदर डेयरी दूध',
    desc: 'Full Cream Milk',
    price: 30,
    unit: '500ml',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200',
    stock: 25,
    inStock: true,
  },
  {
    id: 'p11',
    shopId: '2',
    name: 'Nestle Dahi',
    nameHi: 'नेस्ले दही',
    desc: 'Fresh Curd',
    price: 25,
    unit: '400g',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200',
    stock: 2,
    inStock: true,
  },
  // Modern Provision Store - Staples
  {
    id: 'p12',
    shopId: '3',
    name: 'Daawat Basmati Rice',
    nameHi: 'दावत बासमती चावल',
    desc: 'Premium Basmati',
    price: 580,
    unit: '5kg',
    category: 'staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
    stock: 10,
    inStock: true,
  },
];

let shops = [...mockShops];
let products = [...mockProducts];
const orders: any[] = [];

export const shopService = {
  getAllShops: () => shops,
  
  getShopById: (id: string) => shops.find(shop => shop.id === id),
  
  getProductsByShopId: (shopId: string, category?: string) => {
    let filtered = products.filter(p => p.shopId === shopId);
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    return filtered;
  },
  
  getProductById: (id: string) => products.find(p => p.id === id),
  
  addShop: (shop: Shop) => {
    shops.push(shop);
    return shop;
  },
  
  addProducts: (shopId: string, newProducts: Omit<Product, 'id' | 'shopId'>[]) => {
    const productsWithIds = newProducts.map((p, index) => ({
      ...p,
      id: `p${Date.now()}_${index}`,
      shopId,
    }));
    products.push(...productsWithIds);
    return productsWithIds;
  },
  
  updateProductStock: (productId: string, stock: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock = stock;
      product.inStock = stock > 0;
    }
    return product;
  },
  
  createOrder: (order: any) => {
    const newOrder = {
      ...order,
      id: `ord_${Date.now()}`,
      createdAt: new Date(),
      status: 'pending',
    };
    orders.push(newOrder);
    return newOrder;
  },
  
  getOrdersByShop: (shopId: string) => {
    return orders.filter(o => o.shopId === shopId);
  },
};
