import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/teddypups';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('✅ MongoDB connected successfully to:', uri);
  } catch (error) {
    isMongoConnected = false;
    console.warn('⚠️ MongoDB connection not available. Falling back to robust persistent file storage (backend/data/database.json).');
  }
};

export const getIsMongoConnected = () => isMongoConnected;
