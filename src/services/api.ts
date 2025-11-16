const API_BASE = '/api';

export const api = {
  // Shops
  getShops: () => fetch(`${API_BASE}/shops`).then(r => r.json()),
  getShop: (id: string) => fetch(`${API_BASE}/shops/${id}`).then(r => r.json()),
  createShop: (data: any) => fetch(`${API_BASE}/shops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json()),

  // Catalog
  getCatalog: (shopId: string, category?: string) => {
    const url = category ? `${API_BASE}/catalog/${shopId}?category=${category}` : `${API_BASE}/catalog/${shopId}`;
    return fetch(url).then(r => r.json());
  },
  addProducts: (shopId: string, products: any[]) => fetch(`${API_BASE}/catalog/${shopId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  }).then(r => r.json()),
  updateStock: (productId: string, stock: number) => fetch(`${API_BASE}/products/${productId}/stock`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stock }),
  }).then(r => r.json()),

  // Orders
  createOrder: (data: any) => fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json()),
  getOrdersByShop: (shopId: string) => fetch(`${API_BASE}/orders/${shopId}`).then(r => r.json()),

  // AI
  parseOrder: (text: string, shopId: string) => fetch(`${API_BASE}/ai/parse-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, shopId }),
  }).then(r => r.json()),
  visionParse: (imageData: string) => fetch(`${API_BASE}/ai/vision-parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageData }),
  }).then(r => r.json()),
  getSubstitutes: (productId: string) => fetch(`${API_BASE}/ai/substitutes/${productId}`).then(r => r.json()),
  translate: (text: string, targetLang: string) => fetch(`${API_BASE}/ai/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang }),
  }).then(r => r.json()),
};
