const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true
});

// Compound index to ensure unique product per user
wishlistItemSchema.index({ user: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
