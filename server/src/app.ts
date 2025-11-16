import express, { Express } from 'express';
import cors from 'cors';
import { config } from './utils/config';
import { logger, errorHandler, notFound } from './middleware';
import shopRoutes from './routes/shopRoutes';
import orderRoutes from './routes/orderRoutes';
import aiRoutes from './routes/aiRoutes';

const app: Express = express();

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    aiMode: config.useMockAI ? 'mock' : 'real',
  });
});

// Routes
app.use('/api', shopRoutes);
app.use('/api', orderRoutes);
app.use('/api', aiRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
