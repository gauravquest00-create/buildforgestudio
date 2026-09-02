import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './services/seedService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect Database
    await connectDB();

    // 2. Initialize Seed Check
    await seedDatabase();

    // 3. Start Listening
    app.listen(PORT, () => {
      console.log(`==================================================`);
      console.log(`🚀 BUILDFORGE STUDIO API SERVER RUNNING`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Port: ${PORT}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
      console.log(`==================================================`);
    });
  } catch (error) {
    console.error(`[Server Startup Error] ${error.message}`);
    process.exit(1);
  }
};

startServer();
