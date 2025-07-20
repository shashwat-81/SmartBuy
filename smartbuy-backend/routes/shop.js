const express = require('express');
const jwt = require('jsonwebtoken');
const CartItem = require('../models/CartItem');
const WishlistItem = require('../models/WishlistItem');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// CART ROUTES

// @route   GET /api/shop/cart
// @desc    Get user's cart items
// @access  Private
router.get('/cart', verifyToken, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.userId }).sort({ createdAt: -1 });
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.status(200).json({
      success: true,
      data: {
        items: cartItems,
        totalItems: cartItems.length,
        totalAmount
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching cart' });
  }
});

// @route   POST /api/shop/cart
// @desc    Add item to cart
// @access  Private
router.post('/cart', verifyToken, async (req, res) => {
  try {
    const { productId, name, price, image, category, quantity = 1 } = req.body;

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({ user: req.userId, productId });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      
      return res.status(200).json({
        success: true,
        message: 'Cart updated successfully',
        data: existingItem
      });
    }

    // Create new cart item
    const cartItem = new CartItem({
      user: req.userId,
      productId,
      name,
      price,
      image,
      category,
      quantity
    });

    await cartItem.save();

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cartItem
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error while adding to cart' });
  }
});

// @route   PUT /api/shop/cart/:productId
// @desc    Update cart item quantity by product ID
// @access  Private
router.put('/cart/:productId', verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const cartItem = await CartItem.findOne({ 
      user: req.userId, 
      productId: req.params.productId 
    });
    
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: cartItem
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: 'Server error while updating cart' });
  }
});

// @route   DELETE /api/shop/cart/:productId
// @desc    Remove item from cart by product ID
// @access  Private
router.delete('/cart/:productId', verifyToken, async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({ 
      user: req.userId, 
      productId: req.params.productId 
    });
    
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server error while removing from cart' });
  }
});

// WISHLIST ROUTES

// @route   GET /api/shop/wishlist
// @desc    Get user's wishlist items
// @access  Private
router.get('/wishlist', verifyToken, async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find({ user: req.userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        items: wishlistItems,
        totalItems: wishlistItems.length
      }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching wishlist' });
  }
});

// @route   POST /api/shop/wishlist
// @desc    Add item to wishlist
// @access  Private
router.post('/wishlist', verifyToken, async (req, res) => {
  try {
    const { productId, name, price, image, category } = req.body;

    // Check if item already exists in wishlist
    const existingItem = await WishlistItem.findOne({ user: req.userId, productId });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Item already exists in wishlist'
      });
    }

    // Create new wishlist item
    const wishlistItem = new WishlistItem({
      user: req.userId,
      productId,
      name,
      price,
      image,
      category
    });

    await wishlistItem.save();

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist successfully',
      data: wishlistItem
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error while adding to wishlist' });
  }
});

// @route   DELETE /api/shop/wishlist/:productId
// @desc    Remove item from wishlist by product ID
// @access  Private
router.delete('/wishlist/:productId', verifyToken, async (req, res) => {
  try {
    const wishlistItem = await WishlistItem.findOneAndDelete({ 
      user: req.userId, 
      productId: req.params.productId 
    });
    
    if (!wishlistItem) {
      return res.status(404).json({ success: false, message: 'Wishlist item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist successfully'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error while removing from wishlist' });
  }
});

module.exports = router;
