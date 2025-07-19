const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const router = express.Router();

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT token
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables');
    throw new Error('JWT_SECRET must be configured');
  }
  console.log('JWT_SECRET exists:', !!secret);
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password
    });

    await user.save();

    // Generate and send OTP
    const otp = generateOTP();
    
    // Save OTP to database
    await OTP.findOneAndDelete({ phone }); // Remove any existing OTP
    const otpDoc = new OTP({ phone, otp });
    await otpDoc.save();

    // In production, you would send OTP via SMS
    // For demo purposes, we'll return it in response
    console.log(`OTP for ${phone}: ${otp}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. OTP sent to your phone.',
      data: {
        user: user.toJSON(),
        otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only in development
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/send-otp
// @desc    Send OTP for login
// @access  Public
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    console.log('Looking for user with phone:', phone);
    console.log('Phone type:', typeof phone);

    // Normalize phone number (remove spaces, dashes, etc.)
    const normalizedPhone = phone.toString().replace(/[\s\-\(\)]/g, '');
    
    // Try to find user with exact match first, then try variations
    let user = await User.findOne({ phone: normalizedPhone });
    
    if (!user && normalizedPhone.startsWith('0')) {
      // Try without leading zero
      const phoneWithoutZero = normalizedPhone.substring(1);
      user = await User.findOne({ phone: phoneWithoutZero });
    }
    
    if (!user && !normalizedPhone.startsWith('0')) {
      // Try with leading zero
      const phoneWithZero = '0' + normalizedPhone;
      user = await User.findOne({ phone: phoneWithZero });
    }
    
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      // Let's also try to find any user to debug
      const allUsers = await User.find({}, 'phone name');
      console.log('All users in database:', allUsers);
      
      return res.status(404).json({
        success: false,
        message: 'User not found with this phone number'
      });
    }

    // Generate and save OTP
    const otp = generateOTP();
    
    // Remove any existing OTP for this phone (using the same phone format as the user)
    await OTP.findOneAndDelete({ phone: user.phone });
    
    // Save new OTP with the user's phone format
    const otpDoc = new OTP({ phone: user.phone, otp });
    await otpDoc.save();

    // In production, send OTP via SMS
    console.log(`OTP for ${user.phone}: ${otp}`);
    console.log('OTP saved in database with phone format:', user.phone);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only in development
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while sending OTP'
    });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and login user
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      });
    }

    console.log('Verifying OTP for phone:', phone, 'OTP:', otp);

    // Normalize phone number
    const normalizedPhone = phone.toString().replace(/[\s\-\(\)]/g, '');

    // First, let's check all OTP records for debugging
    const allOTPs = await OTP.find({});
    console.log('All OTP records in database:', allOTPs);

    // Find OTP in database with normalized phone
    let otpDoc = await OTP.findOne({ phone: normalizedPhone, otp });
    console.log('OTP found with normalized phone:', otpDoc ? 'Yes' : 'No');
    
    if (!otpDoc && normalizedPhone.startsWith('0')) {
      // Try without leading zero
      const phoneWithoutZero = normalizedPhone.substring(1);
      otpDoc = await OTP.findOne({ phone: phoneWithoutZero, otp });
      console.log('OTP found without leading zero:', otpDoc ? 'Yes' : 'No');
    }
    
    if (!otpDoc && !normalizedPhone.startsWith('0')) {
      // Try with leading zero
      const phoneWithZero = '0' + normalizedPhone;
      otpDoc = await OTP.findOne({ phone: phoneWithZero, otp });
      console.log('OTP found with leading zero:', otpDoc ? 'Yes' : 'No');
    }
    
    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Find user with the same phone normalization logic
    let user = await User.findOne({ phone: normalizedPhone });
    
    if (!user && normalizedPhone.startsWith('0')) {
      const phoneWithoutZero = normalizedPhone.substring(1);
      user = await User.findOne({ phone: phoneWithoutZero });
    }
    
    if (!user && !normalizedPhone.startsWith('0')) {
      const phoneWithZero = '0' + normalizedPhone;
      user = await User.findOne({ phone: phoneWithZero });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('User found:', user.phone, 'OTP phone format:', otpDoc.phone);

    // Update user verification status and last login
    user.isVerified = true;
    user.lastLogin = new Date();
    await user.save();

    // Delete used OTP
    await OTP.findByIdAndDelete(otpDoc._id);

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification'
    });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Auth header received:', authHeader);
    
    const token = authHeader?.replace('Bearer ', '');
    console.log('Token after Bearer removal:', token);
    console.log('Token length:', token?.length);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: user.toJSON()
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

module.exports = router;
