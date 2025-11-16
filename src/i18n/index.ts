export const translations = {
  en: {
    // Navigation
    home: 'Home',
    shops: 'Shops',
    cart: 'Cart',
    orders: 'Orders',
    profile: 'Profile',
    settings: 'Settings',
    back: 'Back',
    
    // Common actions
    add: 'Add',
    remove: 'Remove',
    update: 'Update',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    
    // Shop related
    viewCatalog: 'View Catalog',
    chatToOrder: 'Chat to Order',
    open: 'Open',
    closed: 'Closed',
    km: 'km',
    min: 'min',
    rating: 'Rating',
    
    // Product related
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    onlyNLeft: 'Only {{n}} left',
    price: 'Price',
    
    // Cart & Orders
    viewCart: 'View Cart',
    checkout: 'Checkout',
    placeOrder: 'Place Order',
    items: 'items',
    total: 'Total',
    
    // Categories
    staples: 'Staples',
    dairy: 'Dairy',
    snacks: 'Snacks',
    beverages: 'Beverages',
    'personal-care': 'Personal Care',
    all: 'All',
    
    // Chat
    chatPlaceholder: 'Type your order...',
    voiceInputAriaLabel: 'Voice input',
    parsing: 'Understanding your order...',
    editOrder: 'Edit',
    confirmOrder: 'Confirm',
    
    // Merchant
    onboardShop: 'Onboard My Shop',
    merchantDashboard: 'Dashboard',
    
    // Search
    searchPlaceholder: 'Search shops, products...',
  },
  hi: {
    // Navigation
    home: 'होम',
    shops: 'दुकानें',
    cart: 'कार्ट',
    orders: 'ऑर्डर',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    back: 'वापस',
    
    // Common actions
    add: 'जोड़ें',
    remove: 'हटाएं',
    update: 'अपडेट करें',
    delete: 'डिलीट करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    edit: 'संपादित करें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    
    // Shop related
    viewCatalog: 'कैटलॉग देखें',
    chatToOrder: 'चैट से ऑर्डर करें',
    open: 'खुला',
    closed: 'बंद',
    km: 'किमी',
    min: 'मिनट',
    rating: 'रेटिंग',
    
    // Product related
    outOfStock: 'स्टॉक में नहीं',
    inStock: 'स्टॉक में',
    onlyNLeft: 'केवल {{n}} बचे',
    price: 'कीमत',
    
    // Cart & Orders
    viewCart: 'कार्ट देखें',
    checkout: 'चेकआउट',
    placeOrder: 'ऑर्डर करें',
    items: 'आइटम',
    total: 'कुल',
    
    // Categories
    staples: 'राशन',
    dairy: 'डेयरी',
    snacks: 'नाश्ता',
    beverages: 'पेय',
    'personal-care': 'व्यक्तिगत देखभाल',
    all: 'सभी',
    
    // Chat
    chatPlaceholder: 'अपना ऑर्डर टाइप करें...',
    voiceInputAriaLabel: 'वॉइस इनपुट',
    parsing: 'आपका ऑर्डर समझ रहे हैं...',
    editOrder: 'संपादित करें',
    confirmOrder: 'पुष्टि करें',
    
    // Merchant
    onboardShop: 'अपनी दुकान जोड़ें',
    merchantDashboard: 'डैशबोर्ड',
    
    // Search
    searchPlaceholder: 'दुकानें, उत्पाद खोजें...',
  },
};

export type TranslationKey = keyof typeof translations.en;

export const t = (key: TranslationKey, lang: 'en' | 'hi' = 'en', params?: Record<string, any>): string => {
  let text = translations[lang][key] || translations.en[key] || key;
  
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{{${k}}}`, String(v));
    });
  }
  
  return text;
};
