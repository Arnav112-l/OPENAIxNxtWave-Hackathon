// Local storage service for managing products and orders

export interface StoredProduct {
  id: string;
  shopId: string;
  shopName: string;
  name: string;
  nameHi: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  inStock: boolean;
  image?: string;
  createdAt: string;
}

export interface StoredOrder {
  id: string;
  orderNumber: string;
  shopId: string;
  shopName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface StoredShop {
  id: string;
  name: string;
  nameHi: string;
  category: 'general' | 'medical' | 'electronics';
  icon: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  ownerId: string;
  ownerName: string;
}

class StorageService {
  private PRODUCTS_KEY = 'kirana_products';
  private ORDERS_KEY = 'kirana_orders';
  private SHOPS_KEY = 'kirana_shops';

  // Shop Management
  getShops(): StoredShop[] {
    const data = localStorage.getItem(this.SHOPS_KEY);
    return data ? JSON.parse(data) : this.getDefaultShops();
  }

  getDefaultShops(): StoredShop[] {
    const defaultShops: StoredShop[] = [
      {
        id: '1',
        name: 'Sharma Kirana',
        nameHi: 'शर्मा किराना',
        category: 'general',
        icon: '🏪',
        rating: 4.8,
        distance: '0.5 km',
        address: '123 Main Street, Delhi',
        phone: '+91 98765 43210',
        ownerId: 'owner1',
        ownerName: 'Rajesh Sharma'
      },
      {
        id: '2',
        name: 'Patel Medical Store',
        nameHi: 'पटेल मेडिकल',
        category: 'medical',
        icon: '💊',
        rating: 4.9,
        distance: '1.2 km',
        address: '456 Medical Lane, Delhi',
        phone: '+91 98765 43211',
        ownerId: 'owner2',
        ownerName: 'Suresh Patel'
      },
      {
        id: '3',
        name: 'Kumar Electronics',
        nameHi: 'कुमार इलेक्ट्रॉनिक्स',
        category: 'electronics',
        icon: '📱',
        rating: 4.7,
        distance: '0.8 km',
        address: '789 Tech Park, Delhi',
        phone: '+91 98765 43212',
        ownerId: 'owner3',
        ownerName: 'Amit Kumar'
      },
      {
        id: '4',
        name: 'Verma Grocery Store',
        nameHi: 'वर्मा किराना',
        category: 'general',
        icon: '🛒',
        rating: 4.6,
        distance: '1.5 km',
        address: '321 Market Road, Delhi',
        phone: '+91 98765 43213',
        ownerId: 'owner4',
        ownerName: 'Ramesh Verma'
      },
      {
        id: '5',
        name: 'Singh Medical',
        nameHi: 'सिंह मेडिकल',
        category: 'medical',
        icon: '⚕️',
        rating: 4.8,
        distance: '2.0 km',
        address: '654 Health Plaza, Delhi',
        phone: '+91 98765 43214',
        ownerId: 'owner5',
        ownerName: 'Harpreet Singh'
      },
      {
        id: '6',
        name: 'Gupta Electronics Hub',
        nameHi: 'गुप्ता इलेक्ट्रॉनिक्स',
        category: 'electronics',
        icon: '🔌',
        rating: 4.5,
        distance: '1.8 km',
        address: '987 Electronic City, Delhi',
        phone: '+91 98765 43215',
        ownerId: 'owner6',
        ownerName: 'Anil Gupta'
      }
    ];
    this.saveShops(defaultShops);
    return defaultShops;
  }

  saveShops(shops: StoredShop[]): void {
    localStorage.setItem(this.SHOPS_KEY, JSON.stringify(shops));
  }

  getShop(shopId: string): StoredShop | null {
    const shops = this.getShops();
    return shops.find(s => s.id === shopId) || null;
  }

  // Product Management
  getProducts(): StoredProduct[] {
    const data = localStorage.getItem(this.PRODUCTS_KEY);
    return data ? JSON.parse(data) : this.getDefaultProducts();
  }

  getDefaultProducts(): StoredProduct[] {
    const defaultProducts: StoredProduct[] = [
      // Sharma Kirana - General Store Products (Shop 1)
      { id: 'p1', shopId: '1', shopName: 'Sharma Kirana', name: 'Basmati Rice', nameHi: 'बासमती चावल', description: 'Premium quality long grain rice', price: 150, unit: 'kg', category: 'Grains', stock: 50, inStock: true, image: '🌾', createdAt: new Date().toISOString() },
      { id: 'p2', shopId: '1', shopName: 'Sharma Kirana', name: 'Whole Wheat Flour', nameHi: 'गेहूं का आटा', description: 'Fresh stone ground atta', price: 45, unit: 'kg', category: 'Grains', stock: 100, inStock: true, image: '🌾', createdAt: new Date().toISOString() },
      { id: 'p3', shopId: '1', shopName: 'Sharma Kirana', name: 'Toor Dal', nameHi: 'तूर दाल', description: 'Premium yellow lentils', price: 120, unit: 'kg', category: 'Pulses', stock: 30, inStock: true, image: '🫘', createdAt: new Date().toISOString() },
      { id: 'p4', shopId: '1', shopName: 'Sharma Kirana', name: 'Cooking Oil', nameHi: 'खाना पकाने का तेल', description: 'Refined sunflower oil', price: 180, unit: 'L', category: 'Oil', stock: 25, inStock: true, image: '🧴', createdAt: new Date().toISOString() },
      { id: 'p5', shopId: '1', shopName: 'Sharma Kirana', name: 'Sugar', nameHi: 'चीनी', description: 'Pure white crystal sugar', price: 42, unit: 'kg', category: 'Groceries', stock: 60, inStock: true, image: '🧂', createdAt: new Date().toISOString() },
      { id: 'p16', shopId: '1', shopName: 'Sharma Kirana', name: 'Tea Powder', nameHi: 'चाय पत्ती', description: 'Assam premium tea leaves', price: 220, unit: 'kg', category: 'Beverages', stock: 40, inStock: true, image: '🍵', createdAt: new Date().toISOString() },
      { id: 'p17', shopId: '1', shopName: 'Sharma Kirana', name: 'Salt', nameHi: 'नमक', description: 'Iodized table salt', price: 20, unit: 'kg', category: 'Groceries', stock: 200, inStock: true, image: '🧂', createdAt: new Date().toISOString() },
      { id: 'p18', shopId: '1', shopName: 'Sharma Kirana', name: 'Moong Dal', nameHi: 'मूंग दाल', description: 'Green gram lentils', price: 110, unit: 'kg', category: 'Pulses', stock: 35, inStock: true, image: '🫘', createdAt: new Date().toISOString() },
      
      // Patel Medical Store Products (Shop 2)
      { id: 'p6', shopId: '2', shopName: 'Patel Medical Store', name: 'Paracetamol Tablets', nameHi: 'पैरासिटामोल', description: 'Pain relief and fever reducer', price: 25, unit: 'strip', category: 'Medicine', stock: 100, inStock: true, image: '💊', createdAt: new Date().toISOString() },
      { id: 'p7', shopId: '2', shopName: 'Patel Medical Store', name: 'Vitamin C Tablets', nameHi: 'विटामिन सी', description: 'Immunity booster', price: 150, unit: 'bottle', category: 'Supplements', stock: 50, inStock: true, image: '🍊', createdAt: new Date().toISOString() },
      { id: 'p8', shopId: '2', shopName: 'Patel Medical Store', name: 'Hand Sanitizer', nameHi: 'हैंड सैनिटाइज़र', description: '500ml antibacterial sanitizer', price: 80, unit: 'bottle', category: 'Personal Care', stock: 75, inStock: true, image: '🧴', createdAt: new Date().toISOString() },
      { id: 'p9', shopId: '2', shopName: 'Patel Medical Store', name: 'First Aid Kit', nameHi: 'प्राथमिक चिकित्सा किट', description: 'Complete emergency kit', price: 450, unit: 'box', category: 'Medical Equipment', stock: 20, inStock: true, image: '⚕️', createdAt: new Date().toISOString() },
      { id: 'p10', shopId: '2', shopName: 'Patel Medical Store', name: 'Digital Thermometer', nameHi: 'डिजिटल थर्मामीटर', description: 'Contactless temperature check', price: 350, unit: 'piece', category: 'Medical Equipment', stock: 15, inStock: true, image: '🌡️', createdAt: new Date().toISOString() },
      { id: 'p19', shopId: '2', shopName: 'Patel Medical Store', name: 'Cough Syrup', nameHi: 'कफ सिरप', description: 'Effective cough relief', price: 95, unit: 'bottle', category: 'Medicine', stock: 60, inStock: true, image: '🍯', createdAt: new Date().toISOString() },
      { id: 'p20', shopId: '2', shopName: 'Patel Medical Store', name: 'Bandages', nameHi: 'पट्टी', description: 'Elastic medical bandage', price: 45, unit: 'pack', category: 'Medical Equipment', stock: 80, inStock: true, image: '🩹', createdAt: new Date().toISOString() },
      { id: 'p21', shopId: '2', shopName: 'Patel Medical Store', name: 'Multivitamin Capsules', nameHi: 'मल्टीविटामिन', description: 'Daily health supplement', price: 350, unit: 'bottle', category: 'Supplements', stock: 45, inStock: true, image: '💊', createdAt: new Date().toISOString() },
      
      // Kumar Electronics Products (Shop 3)
      { id: 'p11', shopId: '3', shopName: 'Kumar Electronics', name: 'USB Cable', nameHi: 'यूएसबी केबल', description: 'Type-C fast charging cable', price: 199, unit: 'piece', category: 'Accessories', stock: 80, inStock: true, image: '🔌', createdAt: new Date().toISOString() },
      { id: 'p12', shopId: '3', shopName: 'Kumar Electronics', name: 'Power Bank', nameHi: 'पावर बैंक', description: '10000mAh portable charger', price: 899, unit: 'piece', category: 'Accessories', stock: 35, inStock: true, image: '🔋', createdAt: new Date().toISOString() },
      { id: 'p13', shopId: '3', shopName: 'Kumar Electronics', name: 'Wireless Mouse', nameHi: 'वायरलेस माउस', description: 'Bluetooth optical mouse', price: 399, unit: 'piece', category: 'Computer', stock: 25, inStock: true, image: '🖱️', createdAt: new Date().toISOString() },
      { id: 'p14', shopId: '3', shopName: 'Kumar Electronics', name: 'LED Bulb', nameHi: 'एलईडी बल्ब', description: '12W energy saving bulb', price: 120, unit: 'piece', category: 'Lighting', stock: 150, inStock: true, image: '💡', createdAt: new Date().toISOString() },
      { id: 'p15', shopId: '3', shopName: 'Kumar Electronics', name: 'Bluetooth Earphones', nameHi: 'ब्लूटूथ ईयरफोन', description: 'Wireless in-ear headphones', price: 599, unit: 'pair', category: 'Audio', stock: 40, inStock: true, image: '🎧', createdAt: new Date().toISOString() },
      { id: 'p22', shopId: '3', shopName: 'Kumar Electronics', name: 'Mobile Stand', nameHi: 'मोबाइल स्टैंड', description: 'Adjustable phone holder', price: 149, unit: 'piece', category: 'Accessories', stock: 65, inStock: true, image: '📱', createdAt: new Date().toISOString() },
      { id: 'p23', shopId: '3', shopName: 'Kumar Electronics', name: 'Extension Cord', nameHi: 'एक्सटेंशन कॉर्ड', description: '4-socket power strip', price: 299, unit: 'piece', category: 'Electrical', stock: 50, inStock: true, image: '🔌', createdAt: new Date().toISOString() },
      { id: 'p24', shopId: '3', shopName: 'Kumar Electronics', name: 'Screen Guard', nameHi: 'स्क्रीन गार्ड', description: 'Tempered glass protector', price: 199, unit: 'piece', category: 'Accessories', stock: 100, inStock: true, image: '📱', createdAt: new Date().toISOString() },
      
      // Verma Grocery Store Products (Shop 4)
      { id: 'p25', shopId: '4', shopName: 'Verma Grocery Store', name: 'Turmeric Powder', nameHi: 'हल्दी पाउडर', description: 'Pure ground turmeric', price: 180, unit: 'kg', category: 'Spices', stock: 45, inStock: true, image: '🌶️', createdAt: new Date().toISOString() },
      { id: 'p26', shopId: '4', shopName: 'Verma Grocery Store', name: 'Red Chilli Powder', nameHi: 'लाल मिर्च पाउडर', description: 'Hot red chilli powder', price: 200, unit: 'kg', category: 'Spices', stock: 50, inStock: true, image: '🌶️', createdAt: new Date().toISOString() },
      { id: 'p27', shopId: '4', shopName: 'Verma Grocery Store', name: 'Cumin Seeds', nameHi: 'जीरा', description: 'Whole cumin seeds', price: 350, unit: 'kg', category: 'Spices', stock: 30, inStock: true, image: '🌿', createdAt: new Date().toISOString() },
      { id: 'p28', shopId: '4', shopName: 'Verma Grocery Store', name: 'Mustard Oil', nameHi: 'सरसों का तेल', description: 'Pure mustard cooking oil', price: 190, unit: 'L', category: 'Oil', stock: 40, inStock: true, image: '🛢️', createdAt: new Date().toISOString() },
      { id: 'p29', shopId: '4', shopName: 'Verma Grocery Store', name: 'Coriander Powder', nameHi: 'धनिया पाउडर', description: 'Ground coriander spice', price: 150, unit: 'kg', category: 'Spices', stock: 35, inStock: true, image: '🌿', createdAt: new Date().toISOString() },
      { id: 'p30', shopId: '4', shopName: 'Verma Grocery Store', name: 'Besan', nameHi: 'बेसन', description: 'Gram flour', price: 85, unit: 'kg', category: 'Grains', stock: 55, inStock: true, image: '🌾', createdAt: new Date().toISOString() },
      { id: 'p31', shopId: '4', shopName: 'Verma Grocery Store', name: 'Black Pepper', nameHi: 'काली मिर्च', description: 'Whole black pepper', price: 650, unit: 'kg', category: 'Spices', stock: 20, inStock: true, image: '⚫', createdAt: new Date().toISOString() },
      { id: 'p32', shopId: '4', shopName: 'Verma Grocery Store', name: 'Rice Flour', nameHi: 'चावल का आटा', description: 'Fine rice flour', price: 60, unit: 'kg', category: 'Grains', stock: 65, inStock: true, image: '🌾', createdAt: new Date().toISOString() },
      
      // Singh Medical Products (Shop 5)
      { id: 'p33', shopId: '5', shopName: 'Singh Medical', name: 'Antiseptic Cream', nameHi: 'एंटीसेप्टिक क्रीम', description: 'Wound healing cream', price: 120, unit: 'tube', category: 'Medicine', stock: 70, inStock: true, image: '🧴', createdAt: new Date().toISOString() },
      { id: 'p34', shopId: '5', shopName: 'Singh Medical', name: 'Face Masks', nameHi: 'फेस मास्क', description: '3-layer surgical masks (pack of 50)', price: 250, unit: 'pack', category: 'Personal Care', stock: 90, inStock: true, image: '😷', createdAt: new Date().toISOString() },
      { id: 'p35', shopId: '5', shopName: 'Singh Medical', name: 'Blood Pressure Monitor', nameHi: 'बीपी मॉनिटर', description: 'Digital BP checking device', price: 1200, unit: 'piece', category: 'Medical Equipment', stock: 12, inStock: true, image: '🩺', createdAt: new Date().toISOString() },
      { id: 'p36', shopId: '5', shopName: 'Singh Medical', name: 'Calcium Tablets', nameHi: 'कैल्शियम टैबलेट', description: 'Bone health supplement', price: 180, unit: 'bottle', category: 'Supplements', stock: 55, inStock: true, image: '💊', createdAt: new Date().toISOString() },
      { id: 'p37', shopId: '5', shopName: 'Singh Medical', name: 'Pain Relief Spray', nameHi: 'दर्द निवारक स्प्रे', description: 'Fast acting pain relief', price: 165, unit: 'bottle', category: 'Medicine', stock: 40, inStock: true, image: '💨', createdAt: new Date().toISOString() },
      { id: 'p38', shopId: '5', shopName: 'Singh Medical', name: 'Cotton Balls', nameHi: 'रुई के गोले', description: 'Sterile cotton balls', price: 60, unit: 'pack', category: 'Medical Equipment', stock: 85, inStock: true, image: '☁️', createdAt: new Date().toISOString() },
      { id: 'p39', shopId: '5', shopName: 'Singh Medical', name: 'Eye Drops', nameHi: 'आई ड्रॉप्स', description: 'Lubricating eye drops', price: 90, unit: 'bottle', category: 'Medicine', stock: 60, inStock: true, image: '👁️', createdAt: new Date().toISOString() },
      { id: 'p40', shopId: '5', shopName: 'Singh Medical', name: 'Glucose Powder', nameHi: 'ग्लूकोस पाउडर', description: 'Instant energy drink', price: 180, unit: 'kg', category: 'Supplements', stock: 50, inStock: true, image: '⚡', createdAt: new Date().toISOString() },
      
      // Gupta Electronics Hub Products (Shop 6)
      { id: 'p41', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'HDMI Cable', nameHi: 'एचडीएमआई केबल', description: '4K compatible 2m cable', price: 299, unit: 'piece', category: 'Accessories', stock: 45, inStock: true, image: '📺', createdAt: new Date().toISOString() },
      { id: 'p42', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Laptop Cooling Pad', nameHi: 'लैपटॉप कूलिंग पैड', description: 'USB powered cooling fan', price: 599, unit: 'piece', category: 'Computer', stock: 28, inStock: true, image: '💻', createdAt: new Date().toISOString() },
      { id: 'p43', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Keyboard', nameHi: 'कीबोर्ड', description: 'Wired USB keyboard', price: 499, unit: 'piece', category: 'Computer', stock: 35, inStock: true, image: '⌨️', createdAt: new Date().toISOString() },
      { id: 'p44', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Webcam', nameHi: 'वेबकैम', description: 'HD 720p webcam', price: 1299, unit: 'piece', category: 'Computer', stock: 18, inStock: true, image: '📷', createdAt: new Date().toISOString() },
      { id: 'p45', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Adapter', nameHi: 'एडाप्टर', description: '5V 2A mobile charger', price: 249, unit: 'piece', category: 'Accessories', stock: 75, inStock: true, image: '🔌', createdAt: new Date().toISOString() },
      { id: 'p46', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Smart Watch', nameHi: 'स्मार्ट वॉच', description: 'Fitness tracking watch', price: 2499, unit: 'piece', category: 'Wearables', stock: 22, inStock: true, image: '⌚', createdAt: new Date().toISOString() },
      { id: 'p47', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Desk Lamp', nameHi: 'टेबल लैंप', description: 'LED adjustable desk lamp', price: 799, unit: 'piece', category: 'Lighting', stock: 30, inStock: true, image: '💡', createdAt: new Date().toISOString() },
      { id: 'p48', shopId: '6', shopName: 'Gupta Electronics Hub', name: 'Memory Card', nameHi: 'मेमोरी कार्ड', description: '32GB microSD card', price: 399, unit: 'piece', category: 'Storage', stock: 55, inStock: true, image: '💾', createdAt: new Date().toISOString() }
    ];
    this.saveProducts(defaultProducts);
    return defaultProducts;
  }

  saveProducts(products: StoredProduct[]): void {
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  getProductsByShop(shopId: string): StoredProduct[] {
    const products = this.getProducts();
    return products.filter(p => p.shopId === shopId && p.inStock);
  }

  getProductsByOwner(ownerId: string): StoredProduct[] {
    const shops = this.getShops();
    const ownerShops = shops.filter(s => s.ownerId === ownerId);
    const shopIds = ownerShops.map(s => s.id);
    const products = this.getProducts();
    return products.filter(p => shopIds.includes(p.shopId));
  }

  addProduct(product: Omit<StoredProduct, 'id' | 'createdAt'>): StoredProduct {
    const products = this.getProducts();
    const newProduct: StoredProduct = {
      ...product,
      id: 'p' + Date.now(),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<StoredProduct>): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
    }
  }

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    this.saveProducts(filtered);
  }

  // Order Management
  getOrders(): StoredOrder[] {
    const data = localStorage.getItem(this.ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveOrders(orders: StoredOrder[]): void {
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  getOrdersByShop(shopId: string): StoredOrder[] {
    const orders = this.getOrders();
    return orders.filter(o => o.shopId === shopId);
  }

  getOrdersByCustomer(customerId: string): StoredOrder[] {
    const orders = this.getOrders();
    return orders.filter(o => o.customerId === customerId);
  }

  createOrder(order: Omit<StoredOrder, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): StoredOrder {
    const orders = this.getOrders();
    const orderNumber = 'ORD-' + new Date().toISOString().split('T')[0] + '-' + String(orders.length + 1).padStart(3, '0');
    const newOrder: StoredOrder = {
      ...order,
      id: 'o' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.push(newOrder);
    this.saveOrders(orders);
    
    // Update product stock
    const products = this.getProducts();
    newOrder.items.forEach(item => {
      const productIndex = products.findIndex(p => p.id === item.productId);
      if (productIndex !== -1) {
        products[productIndex].stock -= item.quantity;
        if (products[productIndex].stock <= 0) {
          products[productIndex].inStock = false;
        }
      }
    });
    this.saveProducts(products);
    
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: StoredOrder['status']): void {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      this.saveOrders(orders);
    }
  }
}

export const storageService = new StorageService();
