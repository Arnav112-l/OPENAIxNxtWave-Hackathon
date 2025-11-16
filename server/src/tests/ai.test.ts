import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('AI API', () => {
  describe('POST /api/ai/parse-order', () => {
    it('should parse order text in English', async () => {
      const response = await request(app)
        .post('/api/ai/parse-order')
        .send({
          text: 'I need 2kg atta and 1 liter milk',
          shopId: 'test-shop',
          locale: 'en',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('items');
      expect(Array.isArray(response.body.data.items)).toBe(true);
      expect(response.body.data.items.length).toBeGreaterThan(0);
    });

    it('should parse order text in Hindi', async () => {
      const response = await request(app)
        .post('/api/ai/parse-order')
        .send({
          text: '2 किलो आटा और 1 लीटर दूध चाहिए',
          shopId: 'test-shop',
          locale: 'hi',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toBeDefined();
    });

    it('should fail without required text field', async () => {
      const response = await request(app)
        .post('/api/ai/parse-order')
        .send({
          shopId: 'test-shop',
          // Missing text
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail with invalid locale', async () => {
      const response = await request(app)
        .post('/api/ai/parse-order')
        .send({
          text: 'test order',
          shopId: 'test-shop',
          locale: 'invalid', // Invalid locale
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/ai/vision-parse', () => {
    it('should parse vision data', async () => {
      const response = await request(app)
        .post('/api/ai/vision-parse')
        .send({
          imageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should fail without imageData', async () => {
      const response = await request(app)
        .post('/api/ai/vision-parse')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/ai/substitutes/:productId', () => {
    it('should return substitutes for a product', async () => {
      const response = await request(app)
        .get('/api/ai/substitutes/p1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return substitutes for unknown product', async () => {
      const response = await request(app)
        .get('/api/ai/substitutes/unknown-product')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      // Mock returns sample data regardless of productId
    });
  });

  describe('POST /api/ai/translate', () => {
    it('should translate text to Hindi', async () => {
      const response = await request(app)
        .post('/api/ai/translate')
        .send({
          text: 'Your order has been confirmed',
          locale: 'hi',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(typeof response.body.data).toBe('string');
    });

    it('should translate text to English', async () => {
      const response = await request(app)
        .post('/api/ai/translate')
        .send({
          text: 'आपका ऑर्डर कन्फर्म हो गया है',
          locale: 'en',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(typeof response.body.data).toBe('string');
    });

    it('should fail without required text field', async () => {
      const response = await request(app)
        .post('/api/ai/translate')
        .send({
          locale: 'hi',
          // Missing text
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail with invalid locale', async () => {
      const response = await request(app)
        .post('/api/ai/translate')
        .send({
          text: 'test',
          locale: 'fr', // Invalid locale (only en/hi supported)
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('AI Rate Limiting', () => {
    it('should enforce AI rate limit (30 per 15 min)', async () => {
      // Make 31 rapid AI requests
      const requests = Array(31).fill(null).map(() =>
        request(app)
          .post('/api/ai/parse-order')
          .send({ text: 'test', shopId: 'test' })
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429);

      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });
});
