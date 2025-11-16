import { beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';

// Setup test database connection before all tests
beforeAll(async () => {
  // Use test database or mock database
  const testDbUri = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/kiranaconnect_test';
  
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(testDbUri);
      console.log('[Test Setup] Connected to test database');
    }
  } catch (error) {
    console.warn('[Test Setup] Could not connect to MongoDB, tests may fail:', error);
  }
});

// Cleanup after all tests
afterAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      console.log('[Test Cleanup] Disconnected from test database');
    }
  } catch (error) {
    console.error('[Test Cleanup] Error during cleanup:', error);
  }
});
