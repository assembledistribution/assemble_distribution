import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary fallback credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tzecnljs',
  api_key: process.env.CLOUDINARY_API_KEY || '635369365953596',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'gNvk4Frwk2SPBCV7vwdL9HySrj8'
});

// Helper to auto-upload external image URLs (e.g. Amazon links) to Cloudinary
const uploadToCloudinaryIfExternal = async (url) => {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();

  if (!trimmed || trimmed.includes('cloudinary.com')) {
    return trimmed;
  }

  try {
    let targetUrl = trimmed;
    if (targetUrl.includes('amazon.com/images') || targetUrl.includes('media-amazon.com')) {
      targetUrl = targetUrl.replace(/\._[A-Z0-9_,]+_\./gi, '._AC_SL1500_.');
    }

    const result = await cloudinary.uploader.upload(targetUrl, {
      folder: 'products',
      resource_type: 'auto',
      quality: 'auto:best'
    });

    return result.secure_url;
  } catch (error) {
    console.error('Failed to auto-upload external image to Cloudinary:', error.message);
    return trimmed;
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public
export const createProduct = async (req, res) => {
  try {
    const { title, asin, description, shortDescription, price, imageUrl, images, category, stock, hasSizes, sizes, variations, combinations } = req.body;

    let finalCover = await uploadToCloudinaryIfExternal(imageUrl);
    let rawImages = Array.isArray(images) ? images : (imageUrl ? [imageUrl] : []);
    let finalImages = await Promise.all(rawImages.map(uploadToCloudinaryIfExternal));

    if (!finalCover && finalImages.length > 0) {
      finalCover = finalImages[0];
    }

    const product = new Product({
      title,
      asin: asin || '',
      description,
      shortDescription: shortDescription || '',
      price,
      imageUrl: finalCover,
      images: finalImages,
      category,
      stock,
      hasSizes,
      sizes,
      variations,
      combinations
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
export const updateProduct = async (req, res) => {
  try {
    const { title, asin, description, shortDescription, price, imageUrl, images, category, stock, hasSizes, sizes, variations, combinations } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title !== undefined ? title : product.title;
      product.asin = asin !== undefined ? asin : product.asin;
      product.description = description !== undefined ? description : product.description;
      product.shortDescription = shortDescription !== undefined ? shortDescription : product.shortDescription;
      product.price = price !== undefined ? price : product.price;
      
      if (imageUrl !== undefined) {
        product.imageUrl = await uploadToCloudinaryIfExternal(imageUrl);
      }
      if (images !== undefined) {
        const rawImgs = Array.isArray(images) ? images : [images];
        product.images = await Promise.all(rawImgs.map(uploadToCloudinaryIfExternal));
      }

      product.category = category !== undefined ? category : product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.hasSizes = hasSizes !== undefined ? hasSizes : product.hasSizes;
      product.sizes = sizes !== undefined ? sizes : product.sizes;
      product.variations = variations !== undefined ? variations : product.variations;
      product.combinations = combinations !== undefined ? combinations : product.combinations;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Helper to extract Cloudinary public ID for deletion
const extractPublicId = (url) => {
  if (!url || !url.includes('cloudinary')) return null;
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    const pathAndOptions = parts[1];
    const pathParts = pathAndOptions.split('/');
    const cleanPathParts = pathParts.filter(part => !part.startsWith('v') || isNaN(part.substring(1)));
    const pathWithoutVersion = cleanPathParts.join('/');
    const lastDotIndex = pathWithoutVersion.lastIndexOf('.');
    if (lastDotIndex === -1) return pathWithoutVersion;
    return pathWithoutVersion.substring(0, lastDotIndex);
  } catch (error) {
    console.error('Failed to parse Cloudinary URL:', error);
    return null;
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.imageUrl) {
        const publicId = extractPublicId(product.imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`Deleted Cloudinary image: ${publicId}`);
          } catch (clError) {
            console.error('Failed to delete image from Cloudinary:', clError.message);
          }
        }
      }

      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
