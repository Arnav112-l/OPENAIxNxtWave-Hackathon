import { Router } from 'express';
import { aiController } from '../controllers/aiController';
import { aiLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import { parseOrderSchema, translateSchema, visionParseSchema } from '../validation/schemas';

const router = Router();

// Apply AI rate limiter to all routes
router.use(aiLimiter);

router.post('/ai/parse-order', validate(parseOrderSchema), aiController.parseOrder);
router.post('/ai/vision-parse', validate(visionParseSchema), aiController.visionParse);
router.get('/ai/substitutes/:productId', aiController.getSubstitutes);
router.post('/ai/translate', validate(translateSchema), aiController.translate);

export default router;
