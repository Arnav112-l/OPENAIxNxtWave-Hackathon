import { Router } from 'express';
import { shopController } from '../controllers/shopController';
import { apiLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import { createShopSchema, addProductsSchema, updateStockSchema } from '../validation/schemas';

const router = Router();

// Apply general API rate limiter
router.use(apiLimiter);

router.get('/shops', shopController.getAllShops);
router.get('/shops/:id', shopController.getShopById);
router.post('/shops', validate(createShopSchema), shopController.createShop);
router.get('/catalog/:shopId', shopController.getCatalog);
router.post('/catalog/:shopId', validate(addProductsSchema), shopController.addProducts);
router.patch('/products/:id/stock', validate(updateStockSchema), shopController.updateStock);

export default router;
