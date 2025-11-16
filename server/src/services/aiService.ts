import OpenAI from 'openai';
import { config } from '../utils/config';
import { AIParsedOrder, AIVisionProduct, AISubstitute } from '../types';

const openai = config.openaiApiKey ? new OpenAI({ apiKey: config.openaiApiKey }) : null;

// Mock AI responses for development
const mockParseOrder = async (text: string, shopId: string): Promise<AIParsedOrder> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple pattern matching for common items
  const items: AIParsedOrder['items'] = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('milk') || lowerText.includes('doodh')) {
    items.push({
      name: 'Amul Taaza Milk',
      nameHi: 'अमूल ताज़ा दूध',
      quantity: '2',
      unit: 'L',
      confidence: 0.9,
      productId: 'p4',
    });
  }
  
  if (lowerText.includes('atta') || lowerText.includes('flour')) {
    items.push({
      name: 'Fortune Chakki Atta',
      nameHi: 'फॉर्च्यून चक्की आटा',
      quantity: '1',
      unit: 'kg',
      confidence: 0.85,
      productId: 'p2',
    });
  }
  
  if (lowerText.includes('butter') || lowerText.includes('makhan')) {
    items.push({
      name: 'Amul Butter',
      nameHi: 'अमूल मक्खन',
      quantity: '500',
      unit: 'g',
      confidence: 0.88,
      productId: 'p5',
    });
  }
  
  if (lowerText.includes('biscuit') || lowerText.includes('parle')) {
    items.push({
      name: 'Parle-G Biscuits',
      nameHi: 'पारले-जी बिस्कुट',
      quantity: '2',
      unit: 'packs',
      confidence: 0.92,
      productId: 'p6',
    });
  }
  
  return {
    items,
    clarifications: items.length === 0 ? ['Could not identify specific products. Please try again with more details.'] : [],
  };
};

const mockVisionParse = async (): Promise<AIVisionProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      product_name: 'Tata Salt',
      brand: 'Tata',
      approx_size: '1kg',
      category: 'staples',
      confidence: 0.95,
    },
    {
      product_name: 'Fortune Chakki Atta',
      brand: 'Fortune',
      approx_size: '10kg',
      category: 'staples',
      confidence: 0.88,
    },
  ];
};

const mockSubstitutes = async (productId: string): Promise<AISubstitute[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return mock substitutes regardless of productId
  return [
    {
      productId: 'alt-1',
      name: 'Alternative Product 1',
      nameHi: 'वैकल्पिक उत्पाद 1',
      reason: 'Similar quality, lower price',
      price: 95,
      available: true,
    },
    {
      productId: 'alt-2',
      name: 'Alternative Product 2',
      nameHi: 'वैकल्पिक उत्पाद 2',
      reason: 'Premium option',
      price: 120,
      available: true,
    },
  ];
};

const mockTranslate = async (text: string, targetLang: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Simple mock translations
  const translations: Record<string, Record<string, string>> = {
    hi: {
      'Your order has been confirmed': 'आपका ऑर्डर कन्फर्म हो गया है',
      'Thank you for shopping': 'खरीदारी के लिए धन्यवाद',
      'Order': 'ऑर्डर',
      'Cart': 'कार्ट',
    },
    en: {
      'आपका ऑर्डर कन्फर्म हो गया है': 'Your order has been confirmed',
      'खरीदारी के लिए धन्यवाद': 'Thank you for shopping',
    },
  };
  
  return translations[targetLang]?.[text] || text;
};

// Real OpenAI implementations
const realParseOrder = async (text: string, shopId: string): Promise<AIParsedOrder> => {
  if (!openai) throw new Error('OpenAI not configured');
  
  // TODO: Implement product catalog lookup from shop
  const prompt = `You are a helpful assistant that converts informal Indian-English/Hinglish grocery requests into structured JSON.

Convert this order request: "${text}"

Output ONLY valid JSON in this format:
{
  "items": [{"name": "Product Name", "nameHi": "उत्पाद", "quantity": "2", "unit": "kg", "confidence": 0.9, "productId": "p1"}],
  "clarifications": []
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });
  
  const content = response.choices[0].message.content || '{}';
  return JSON.parse(content);
};

const realVisionParse = async (imageData: string): Promise<AIVisionProduct[]> => {
  if (!openai) throw new Error('OpenAI not configured');
  
  const prompt = `Inspect this grocery product image and return a JSON array of products visible.

Output ONLY valid JSON in this format:
[{"product_name": "Tata Salt", "brand": "Tata", "approx_size": "1kg", "category": "staples", "confidence": 0.95}]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageData } },
        ],
      },
    ],
    max_tokens: 1000,
  });
  
  const content = response.choices[0].message.content || '[]';
  return JSON.parse(content);
};

const realSubstitutes = async (productId: string): Promise<AISubstitute[]> => {
  if (!openai) throw new Error('OpenAI not configured');
  
  // For now, return empty array as we don't have shop service integration
  // TODO: Implement product lookup and OpenAI-based substitution
  console.log('[AI] Real OpenAI substitutes not fully implemented, returning empty array');
  return [];
};

const realTranslate = async (text: string, targetLang: string): Promise<string> => {
  if (!openai) throw new Error('OpenAI not configured');
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Translate the following text to ${targetLang === 'hi' ? 'Hindi' : 'English'}. Output ONLY the translated text, nothing else:\n\n${text}`,
      },
    ],
    temperature: 0.3,
  });
  
  return response.choices[0].message.content || text;
};

// Export service that switches between mock and real
export const aiService = {
  parseOrder: async (text: string, shopId: string) => {
    return config.useMockAI ? mockParseOrder(text, shopId) : realParseOrder(text, shopId);
  },
  visionParse: async (imageData: string) => {
    return config.useMockAI ? mockVisionParse() : realVisionParse(imageData);
  },
  getSubstitutes: async (productId: string) => {
    return config.useMockAI ? mockSubstitutes(productId) : realSubstitutes(productId);
  },
  translate: async (text: string, targetLang: string) => {
    return config.useMockAI ? mockTranslate(text, targetLang) : realTranslate(text, targetLang);
  },
};
