import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

export const aiController = {
  // POST /api/ai/parse-order
  parseOrder: async (req: Request, res: Response) => {
    try {
      const { text, shopId, locale } = req.body;
      
      const parsed = await aiService.parseOrder(text, shopId || 'default');
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/ai/vision-parse
  visionParse: async (req: Request, res: Response) => {
    try {
      const { imageData } = req.body;
      
      const products = await aiService.visionParse(imageData);
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/ai/substitutes/:productId
  getSubstitutes: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      
      const substitutes = await aiService.getSubstitutes(productId);
      res.json({ success: true, data: substitutes });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/ai/translate
  translate: async (req: Request, res: Response) => {
    try {
      const { text, locale } = req.body;
      
      const translated = await aiService.translate(text, locale);
      res.json({ success: true, data: translated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
