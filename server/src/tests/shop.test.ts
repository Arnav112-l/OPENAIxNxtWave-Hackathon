import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import { Shop } from '../models/Shop';

describe('Shop API', () => {
  let testShopId: string;

  beforeAll(async () => {
    // Clear existing shops
    await Shop.deleteMany({});
  });

  describe('POST /api/shops', () => {
    it('should create a new shop with valid data', async () => {
      const shopData = {
        name: 'Test Kirana Store',
        address: '123 Test Street, Test City',
        phone: '+919876543210',
        ownerName: 'Test Owner',
        location: {
          lat: 28.6139,
          lng: 77.2090,
        },
        products: [
          {
            name: 'Test Product',
            price: 100,
            unit: '1kg',
            category: 'staples',
            stock: 50,
          },
        ],
      };

      const response = await request(app)
        .post('/api/shops')
        .send(shopData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.name).toBe(shopData.name);
      expect(response.body.data.address).toBe(shopData.address);
      
      testShopId = response.body.data._id;
    });

    it('should fail with invalid phone number', async () => {
      const invalidShop = {
        name: 'Invalid Shop',
        address: '123 Test Street',
        phone: '12345', // Invalid phone
        ownerName: 'Test Owner',
        location: { lat: 28.6139, lng: 77.2090 },
      };

      const response = await request(app)
        .post('/api/shops')
        .send(invalidShop)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should fail with missing required fields', async () => {
      const incompleteShop = {
        name: 'Incomplete Shop',
        // Missing address, phone, etc.
      };

      const response = await request(app)
        .post('/api/shops')
        .send(incompleteShop)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/shops', () => {
    it('should return all shops', async () => {
      const response = await request(app)
        .get('/api/shops')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/shops/:id', () => {
    it('should return shop by ID', async () => {
      const response = await request(app)
        .get(`/api/shops/${testShopId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(testShopId);
    });

    it('should return 404 for non-existent shop', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/shops/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/catalog/:shopId', () => {
    it('should return shop catalog', async () => {
      const response = await request(app)
        .get(`/api/catalog/${testShopId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/catalog/:shopId', () => {
    it('should add products to shop', async () => {
      const products = [
        {
          name: 'New Product',
          price: 150,
          unit: '500g',
          category: 'dairy',
          stock: 30,
        },
      ];

      const response = await request(app)
        .post(`/api/catalog/${testShopId}`)
        .send({ products })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.products.length).toBeGreaterThan(1);
    });

    it('should fail with invalid product data', async () => {
      const invalidProducts = [
        {
          name: 'Invalid',
          price: -10, // Negative price
          unit: '1kg',
        },
      ];

      const response = await request(app)
        .post(`/api/catalog/${testShopId}`)
        .send({ products: invalidProducts })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      // Make 101 requests to trigger rate limit (100 per 15 min)
      const requests = Array(101).fill(null).map(() =>
        request(app).get('/api/shops')
      );

      const responses = await Promise.all(requests);
      const tooManyRequests = responses.filter(r => r.status === 429);

      expect(tooManyRequests.length).toBeGreaterThan(0);
    });
  });
});
