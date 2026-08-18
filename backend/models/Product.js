import mongoose from 'mongoose';

const combinationSchema = new mongoose.Schema({
  size: { type: String, default: '' },
  variation: { type: String, default: '' },
  price: { type: Number, default: null },
  stock: { type: Number, default: null }
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    asin: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    shortDescription: {
      type: String,
      required: false,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: false,
      default: 'art-craft',
    },
    stock: {
      type: Number,
      required: false,
      default: 0,
    },
    hasSizes: {
      type: Boolean,
      default: false,
    },
    sizes: {
      type: [String],
      default: [],
    },
    variations: {
      type: [String],
      default: [],
    },
    combinations: [combinationSchema]
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
