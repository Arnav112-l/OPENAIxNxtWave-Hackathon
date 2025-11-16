import { describe, it, expect } from 'vitest';
import { mockAi } from '../services/mockAi';

describe('Mock AI Service', () => {
  describe('parseOrder', () => {
    it('parses simple order text', async () => {
      const result = await mockAi.parseOrder('I need 2 kg atta and 1 packet biscuit');
      
      expect(result.items).toHaveLength(2);
      expect(result.items[0].name).toBe('Wheat Atta');
      expect(result.items[0].quantity).toBe(2);
      expect(result.items[1].name).toBe('Biscuits');
    });

    it('handles Hindi text', async () => {
      const result = await mockAi.parseOrder('मुझे 1 किलो आटा चाहिए', 'hi');
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Wheat Atta');
    });

    it('returns clarifications for unclear text', async () => {
      const result = await mockAi.parseOrder('something random');
      
      expect(result.clarifications.length).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThan(0.5);
    });
  });

  describe('visionParse', () => {
    it('returns mock product detections', async () => {
      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const result = await mockAi.visionParse([mockFile]);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('product_name');
      expect(result[0]).toHaveProperty('confidence');
    });
  });

  describe('getSubstitutes', () => {
    it('returns substitutes for known products', async () => {
      const result = await mockAi.getSubstitutes('Tata Salt');
      
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('reason');
    });
  });

  describe('translate', () => {
    it('translates English to Hindi', async () => {
      const result = await mockAi.translate('shop', 'hi');
      expect(result).toContain('दुकान');
    });

    it('translates Hindi to English', async () => {
      const result = await mockAi.translate('दुकान', 'en');
      expect(result).toContain('Shop');
    });
  });
});
