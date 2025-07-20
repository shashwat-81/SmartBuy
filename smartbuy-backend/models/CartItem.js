const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  }
}, {
  timestamps: true
});

// Compound index to ensure unique product per user
cartItemSchema.index({ user: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
