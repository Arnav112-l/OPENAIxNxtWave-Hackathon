import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import { Shop } from '../models/Shop';
import { Order } from '../models/Order';

describe('Order API', () => {
  let testShopId: string;

  beforeAll(async () => {
    // Clear existing data
    await Order.deleteMany({});
    await Shop.deleteMany({});

    // Create a test shop
    const shop = await Shop.create({
      name: 'Order Test Shop',
      nameHi: 'ऑर्डर टेस्ट शॉप',
      address: '456 Order Street',
      phone: '+919876543210',
      ownerName: 'Order Owner',
      location: { lat: 28.6139, lng: 77.2090 },
      products: [
        {
          id: 'p1',
          name: 'Test Product 1',
          price: 100,
          unit: '1kg',
          category: 'staples',
          stock: 100,
          inStock: true,
        },
        {
          id: 'p2',
          name: 'Test Product 2',
          price: 50,
          unit: '500g',
          category: 'dairy',
          stock: 50,
          inStock: true,
        },
      ],
    });

    testShopId = shop._id.toString();
  });

  describe('POST /api/orders', () => {
    it('should create a new order with valid data', async () => {
      const orderData = {
        shopId: testShopId,
        items: [
          {
            productId: 'p1',
            productName: 'Test Product 1',
            quantity: 2,
            price: 100,
          },
          {
            productId: 'p2',
            productName: 'Test Product 2',
            quantity: 3,
            price: 50,
          },
        ],
        totalAmount: 350,
        customer: {
          name: 'Test Customer',
          phone: '+919876543210',
          address: '789 Customer Street',
        },
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.shopId).toBe(testShopId);
      expect(response.body.data.totalAmount).toBe(350);
      expect(response.body.data.status).toBe('pending');
    });

    it('should fail with invalid shop ID', async () => {
      const invalidOrder = {
        shopId: '507f1f77bcf86cd799439011', // Non-existent shop
        items: [
          {
            productId: 'p1',
            productName: 'Test Product',
            quantity: 1,
            price: 100,
          },
        ],
        totalAmount: 100,
        customer: {
          name: 'Test',
          phone: '+919876543210',
          address: 'Test Address',
        },
      };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should fail with empty items array', async () => {
      const invalidOrder = {
        shopId: testShopId,
        items: [], // Empty items
        totalAmount: 0,
        customer: {
          name: 'Test',
          phone: '+919876543210',
          address: 'Test',
        },
      };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail with invalid phone number', async () => {
      const invalidOrder = {
        shopId: testShopId,
        items: [
          {
            productId: 'p1',
            productName: 'Test Product',
            quantity: 1,
            price: 100,
          },
        ],
        totalAmount: 100,
        customer: {
          name: 'Test',
          phone: '123', // Invalid phone
          address: 'Test',
        },
      };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail with negative total amount', async () => {
      const invalidOrder = {
        shopId: testShopId,
        items: [
          {
            productId: 'p1',
            productName: 'Test',
            quantity: 1,
            price: 100,
          },
        ],
        totalAmount: -100, // Negative amount
        customer: {
          name: 'Test',
          phone: '+919876543210',
          address: 'Test',
        },
      };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/orders/:shopId', () => {
    it('should return orders for a shop', async () => {
      const response = await request(app)
        .get(`/api/orders/${testShopId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return empty array for shop with no orders', async () => {
      const fakeShopId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/orders/${fakeShopId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });
  });

  describe('Order Rate Limiting', () => {
    it('should enforce order rate limit (5 per minute)', async () => {
      const orderData = {
        shopId: testShopId,
        items: [
          {
            productId: 'p1',
            productName: 'Test',
            quantity: 1,
            price: 100,
          },
        ],
        totalAmount: 100,
        customer: {
          name: 'Test',
          phone: '+919876543210',
          address: 'Test',
        },
      };

      // Make 6 rapid order requests
      const requests = Array(6).fill(null).map(() =>
        request(app).post('/api/orders').send(orderData)
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429);

      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });
});
