import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Shop } from '../models/Shop';

export const orderController = {
  // POST /api/orders
  createOrder: async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      
      // Validate required fields
      if (!orderData.shopId || !orderData.items || !Array.isArray(orderData.items)) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: shopId, items',
        });
      }
      
      // Verify shop exists
      const shop = await Shop.findById(orderData.shopId);
      if (!shop) {
        return res.status(404).json({
          success: false,
          error: 'Shop not found',
        });
      }
      
      // Create order with shop name
      const order = new Order({
        ...orderData,
        shopName: shop.name
      });
      
      await order.save();
      
      res.status(201).json({ success: true, data: order });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/orders/:shopId
  getOrdersByShop: async (req: Request, res: Response) => {
    try {
      const { shopId } = req.params;
      const orders = await Order.find({ shopId }).sort({ createdAt: -1 });
      res.json({ success: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
