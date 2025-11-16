import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { orderLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import { createOrderSchema } from '../validation/schemas';

const router = Router();

router.post('/orders', orderLimiter, validate(createOrderSchema), orderController.createOrder);
router.get('/orders/:shopId', orderController.getOrdersByShop);

export default router;
