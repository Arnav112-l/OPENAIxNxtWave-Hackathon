import { Request, Response } from 'express';
import { Shop } from '../models/Shop';

export const shopController = {
  // GET /api/shops
  getAllShops: async (req: Request, res: Response) => {
    try {
      const shops = await Shop.find().select('-__v');
      res.json({ success: true, data: shops });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/shops/:id
  getShopById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const shop = await Shop.findById(id).select('-__v');
      
      if (!shop) {
        return res.status(404).json({ success: false, error: 'Shop not found' });
      }
      
      res.json({ success: true, data: shop });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/catalog/:shopId
  getCatalog: async (req: Request, res: Response) => {
    try {
      const { shopId } = req.params;
      const { category } = req.query;
      
      const shop = await Shop.findById(shopId);
      
      if (!shop) {
        return res.status(404).json({ success: false, error: 'Shop not found' });
      }
      
      const products = category 
        ? shop.products.filter(p => p.category === category)
        : shop.products.toObject();
      
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/catalog/:shopId
  addProducts: async (req: Request, res: Response) => {
    try {
      const { shopId } = req.params;
      const { products } = req.body;
      
      if (!Array.isArray(products)) {
        return res.status(400).json({ success: false, error: 'Products must be an array' });
      }
      
      const shop = await Shop.findById(shopId);
      
      if (!shop) {
        return res.status(404).json({ success: false, error: 'Shop not found' });
      }
      
      shop.products.push(...products);
      await shop.save();
      
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/shops
  createShop: async (req: Request, res: Response) => {
    try {
      const shopData = req.body;
      const newShop = new Shop(shopData);
      await newShop.save();
      res.status(201).json({ success: true, data: newShop });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PATCH /api/products/:id/stock
  updateStock: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      
      if (typeof stock !== 'number') {
        return res.status(400).json({ success: false, error: 'Stock must be a number' });
      }
      
      const shop = await Shop.findOne({ 'products._id': id });
      
      if (!shop) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      
      const product = shop.products.find(p => p._id?.toString() === id);
      
      if (product) {
        product.stock = stock;
        await shop.save();
        res.json({ success: true, data: product });
      } else {
        res.status(404).json({ success: false, error: 'Product not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
