const asyncHandler = require('express-async-handler');
const { createTokenUser } = require('../utils/createTokenUser');
const { StatusCodes } = require('http-status-codes'); // Importing the StatusCodes object from the http-status-codes package
const { createToken } = require('../utils/createToken.js'); // Importing the createToken function from the utils folder

const CustomError = require('../errors'); // Importing the CustomError class from the errors folder

const {
  attachCookiesToResponse,
} = require('../utils/attachCookiesToResponse.js'); // Importing the attachCookiesToResponse function from the utils folder

const User = require('../models/userModel');

module.exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body; // Destructure name, email, and password from request body

  // Check if all required fields are provided
  if (!name || !email || !password || !passwordConfirm) {
    // If any field is missing, send a 400 Bad Request response
    throw new CustomError.BadRequestError('Please provide all required fields');
  }

  const newUser = {
    name,
    email,
    password,
    passwordConfirm,
  };

  const user = await User.create(newUser);

  const tokenUser = createTokenUser(user); // Create a token user object from the user data

  const token = createToken({ payload: tokenUser }); // Create a JWT token using the token user object
  // Set the token in the response cookie with a 30-day expiration time

  attachCookiesToResponse({ res, token });

  // Send a 201 Created response with the user data
  // and a success message
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'User registered successfully',
    user: tokenUser,
  });
});

module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from request body

  // Check if both email and password are provided
  if (!email || !password) {
    // If any field is missing, send a 400 Bad Request response
    throw new CustomError.BadRequestError(
      'Please provide both email and password'
    );
  }

  // Find the user by email and select the password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    // If user is not found, send a 401 Unauthorized response
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  // Check if the password is correct
  const isPasswordCorrect = await user.comparePassword(password); // Compare the provided password with the stored hashed password

  if (!isPasswordCorrect) {
    // If the password is incorrect, send a 401 Unauthorized response
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  // Create a token user object from the user data
  const tokenUser = createTokenUser(user);

  // Create a JWT token using the token user object
  const token = createToken({ payload: tokenUser });

  // Attach the token to response cookies
  attachCookiesToResponse({ res, token });

  // Send response with user data and token
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User logged in successfully',
    user: tokenUser,
  });
});

module.exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    expires: new Date(Date.now()) + 15 * 1000, // 15 seconds
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User logged out successfully',
  });
});
