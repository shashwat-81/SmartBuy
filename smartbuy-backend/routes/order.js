const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
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

// @route   GET /api/orders
// @desc    Get all orders for a user
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ orderDate: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        orders,
        count: orders.length
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching orders' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get a specific order by ID
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching order' });
  }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      paymentMethod,
      paymentDetails,
      deliveryAddress
    } = req.body;
    
    // Validate required fields
    if (!items || !items.length || !totalAmount || !paymentMethod || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order information'
      });
    }
    
    // Create the new order
    const newOrder = new Order({
      user: req.userId,
      items,
      totalAmount,
      paymentMethod,
      paymentDetails: paymentDetails || {},
      deliveryAddress,
      status: 'pending',
      orderDate: new Date()
    });
    
    await newOrder.save();
    
    // Clear cart after successful order placement
    if (req.body.clearCart) {
      await CartItem.deleteMany({ user: req.userId });
    }
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: newOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error while creating order' });
  }
});

// @route   PUT /api/order/:id/cancel
// @desc    Cancel a user's order
// @access  Private
router.put('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.userId 
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or you are not authorized to cancel it'
      });
    }
    
    // Check if order can be cancelled (not delivered or already cancelled)
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: `This order cannot be cancelled because it's already ${order.status}`
      });
    }
    
    // Update order status to cancelled
    order.status = 'cancelled';
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (for admin use)
// @access  Private (should be restricted to admin in production)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status, trackingInfo } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Update order fields
    order.status = status;
    if (trackingInfo) order.trackingInfo = trackingInfo;
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, message: 'Server error while updating order status' });
  }
});

module.exports = router;