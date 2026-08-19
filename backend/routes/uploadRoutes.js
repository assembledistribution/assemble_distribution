import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Multer memory storage setup
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Configure Cloudinary with fallback keys
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tzecnljs',
  api_key: process.env.CLOUDINARY_API_KEY || '635369365953596',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'gNvk4Frwk2SPBCV7vwdL9HySrj8'
});

// Upload single image endpoint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    // Upload buffer directly to Cloudinary using upload_stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary stream error:', error);
          return res.status(500).json({ success: false, message: 'Cloudinary upload failed', error });
        }
        res.status(200).json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );

    // Write file buffer to the stream
    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ success: false, message: 'Server error during upload' });
  }
});

// Upload multiple images endpoint (up to 10 files)
router.post('/multiple', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image file' });
    }

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'products',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    res.status(200).json({
      success: true,
      urls
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ success: false, message: 'Server error during multiple image upload', error: error.message });
  }
});

export default router;
