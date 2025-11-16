// Mock AI Service - Centralized AI simulation for frontend

export interface AIParsedItem {
  product_id?: string;
  name: string;
  quantity: number;
  unit?: string;
  confidence: number;
}

export interface AISuggestion {
  product_id: string;
  name: string;
  reason: string;
  price_diff?: number;
}

export interface AIVisionResult {
  product_name: string;
  brand?: string;
  approx_size?: string;
  category: string;
  confidence: number;
}

export const mockAi = {
  /**
   * Parse natural language text into structured order items
   */
  parseOrder: async (text: string, _locale: 'en' | 'hi' = 'en'): Promise<{
    items: AIParsedItem[];
    clarifications: string[];
    confidence: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const items: AIParsedItem[] = [];
    const clarifications: string[] = [];

    // Simple pattern matching for common items
    const patterns = [
      { regex: /(\d+)\s*(kg|kilo|किलो)\s*(atta|आटा|wheat|गेहूं)/i, name: 'Wheat Atta', unit: 'kg' },
      { regex: /(\d+)\s*(packet|पैकेट)?\s*(biscuit|बिस्किट)/i, name: 'Biscuits', unit: 'packet' },
      { regex: /(\d+)?\s*(milk|दूध|dairy)/i, name: 'Milk', unit: '500ml' },
      { regex: /(\d+)?\s*(salt|नमक)/i, name: 'Salt', unit: '1kg' },
      { regex: /(\d+)?\s*(sugar|चीनी)/i, name: 'Sugar', unit: '1kg' },
      { regex: /(\d+)?\s*(rice|चावल)/i, name: 'Rice', unit: '1kg' },
    ];

    patterns.forEach(({ regex, name, unit }) => {
      const match = text.match(regex);
      if (match) {
        const quantity = match[1] ? parseInt(match[1]) : 1;
        items.push({
          name,
          quantity,
          unit,
          confidence: 0.85,
        });
      }
    });

    if (items.length === 0) {
      clarifications.push('Could not identify specific products. Please be more specific.');
    }

    return {
      items,
      clarifications,
      confidence: items.length > 0 ? 0.8 : 0.3,
    };
  },

  /**
   * Parse product images using vision AI
   */
  visionParse: async (files: File[]): Promise<AIVisionResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock detection based on file names or return generic products
    const mockProducts: AIVisionResult[] = [
      { product_name: 'Tata Salt', brand: 'Tata', approx_size: '1kg', category: 'staples', confidence: 0.92 },
      { product_name: 'Fortune Atta', brand: 'Fortune', approx_size: '10kg', category: 'staples', confidence: 0.88 },
      { product_name: 'Amul Milk', brand: 'Amul', approx_size: '500ml', category: 'dairy', confidence: 0.85 },
    ];

    return mockProducts.slice(0, Math.min(files.length, 3));
  },

  /**
   * Get product substitutes
   */
  getSubstitutes: async (productName: string): Promise<AISuggestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const substitutes: Record<string, AISuggestion[]> = {
      'Tata Salt': [
        { product_id: 'salt-002', name: 'Annapurna Salt', reason: 'Similar quality, ₹2 cheaper', price_diff: -2 },
        { product_id: 'salt-003', name: 'Catch Salt', reason: 'Premium iodized salt', price_diff: 5 },
      ],
      'Fortune Atta': [
        { product_id: 'atta-002', name: 'Aashirvaad Atta', reason: 'Popular alternative', price_diff: 10 },
        { product_id: 'atta-003', name: 'Pillsbury Atta', reason: 'Premium chakki atta', price_diff: 25 },
      ],
    };

    return substitutes[productName] || [];
  },

  /**
   * Translate text between English and Hindi
   */
  translate: async (text: string, targetLocale: 'en' | 'hi'): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const translations: Record<string, Record<string, string>> = {
      en: {
        'दुकान': 'Shop',
        'किराना': 'Grocery',
        'आटा': 'Atta',
        'नमक': 'Salt',
        'दूध': 'Milk',
      },
      hi: {
        'shop': 'दुकान',
        'grocery': 'किराना',
        'atta': 'आटा',
        'salt': 'नमक',
        'milk': 'दूध',
      },
    };

    const dict = translations[targetLocale];
    let result = text;

    Object.entries(dict).forEach(([key, value]) => {
      const regex = new RegExp(key, 'gi');
      result = result.replace(regex, value);
    });

    return result;
  },
};
