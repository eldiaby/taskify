// ======================================
// ========== Required Dependencies =====
// ======================================
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// ======================================
// ========== Utility Functions =========
// ======================================
const { createTokenUser } = require('../utils/createTokenUser');
const { createToken } = require('../utils/createToken.js');
const {
  attachCookiesToResponse,
} = require('../utils/attachCookiesToResponse.js');

// ======================================
// ========== User Model ===============
// ======================================
const User = require('../models/userModel');

// ======================================
// ========== Register Controller =======
// ======================================

/**
 * @function register
 * @desc Handles user registration
 * @route POST /api/auth/register
 * @access Public
 */
module.exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  // Validate required fields
  if (!name || !email || !password || !passwordConfirm) {
    throw new CustomError.BadRequestError('Please provide all required fields');
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError.BadRequestError('Email is already registered');
  }

  // Create new user
  const user = await User.create({ name, email, password, passwordConfirm });

  // Generate token and attach to cookies
  const tokenUser = createTokenUser(user);
  const token = createToken({ payload: tokenUser });
  attachCookiesToResponse({ res, token });

  // Send response
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'User registered successfully',
    user: tokenUser,
  });
});

// ======================================
// =========== Login Controller =========
// ======================================

/**
 * @function login
 * @desc Handles user login
 * @route POST /api/auth/login
 * @access Public
 */
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      'Please provide both email and password'
    );
  }

  // Find user by email and compare password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  // Generate token and attach to cookies
  const tokenUser = createTokenUser(user);
  const token = createToken({ payload: tokenUser });
  attachCookiesToResponse({ res, token });

  // Send response
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User logged in successfully',
    user: tokenUser,
  });
});

// ======================================
// =========== Logout Controller =========
// ======================================

/**
 * @function logout
 * @desc Logs the user out by clearing the token cookie
 * @route GET /api/auth/logout
 * @access Public
 */
module.exports.logout = asyncHandler(async (req, res, next) => {
  // Clear cookie by expiring it
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    expires: new Date(Date.now() + 15 * 1000),
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User logged out successfully',
  });
});
