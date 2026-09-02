import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './services/seedService.js';
import mongoose from 'mongoose';

dotenv.config();

const runSeed = async () => {
  try {
    console.log('[Seed CLI] Connecting to MongoDB...');
    await connectDB();
    console.log('[Seed CLI] Running database seed...');
    await seedDatabase();
    console.log('[Seed CLI] Database seeding completed successfully.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed CLI Error] ${error.message}`);
    process.exit(1);
  }
};

runSeed();
