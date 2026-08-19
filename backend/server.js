import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection Manager for Serverless & Local
let isConnected = false;
let connPromise = null;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is missing on Vercel.');
  }
  if (!connPromise) {
    connPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000
    })
      .then(async () => {
        isConnected = true;
        console.log('MongoDB Connected Successfully');
        await seedAdmin();
      })
      .catch((error) => {
        connPromise = null;
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
      });
  }
  await connPromise;
};

// Function to seed admin user
const seedAdmin = async () => {
  try {
    const passwordHash = crypto.createHash('sha256').update('Escaletech@123').digest('hex');
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      await Admin.create({ username: 'admin', passwordHash });
      console.log('Seeded default admin credentials (admin / Escaletech@123)');
    } else {
      adminExists.passwordHash = passwordHash;
      await adminExists.save();
      console.log('Updated admin password to Escaletech@123');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

// Upload Route (does not require MongoDB connection)
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running on Vercel Serverless...');
});

// Middleware to ensure DB is connected for incoming API requests (products, admin)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (mongoose.connection.readyState < 1) {
      return res.status(500).json({
        success: false,
        message: 'Database Connection Error. Please verify MONGO_URI and MongoDB Atlas IP Access List (0.0.0.0/0).'
      });
    }
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Database Connection Failed. Please check MONGO_URI environment variable and MongoDB Atlas IP access list.',
      error: err.message
    });
  }
});

// Database Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running on Vercel Serverless...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Only start standalone server in non-Vercel environment
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

export default app;
