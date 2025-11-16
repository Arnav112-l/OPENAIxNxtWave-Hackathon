import app from './app';
import { config } from './utils/config';
import { connectDB } from './models/database';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    app.listen(config.port, () => {
      console.log(`
╔════════════════════════════════════════════════╗
║   KiranaConnect Server                         ║
║   Port: ${config.port}                                ║
║   Environment: ${config.nodeEnv}                  ║
║   AI Mode: ${config.useMockAI ? 'Mock' : 'Real OpenAI'}                       ║
║   Client URL: ${config.clientUrl}    ║
╚════════════════════════════════════════════════╝
      `);
      console.log('🚀 Server is ready to accept requests');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
