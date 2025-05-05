const asyncHandler = require('express-async-handler');
const { createTokenUser } = require('../utils/createTokenUser');
const { StatusCodes } = require('http-status-codes'); // Importing the StatusCodes object from the http-status-codes package
const { createToken } = require('../utils/createToken.js'); // Importing the createToken function from the utils folder

const {
  attachCookiesToResponse,
} = require('../utils/attachCookiesToResponse.js'); // Importing the attachCookiesToResponse function from the utils folder

const User = require('../models/userModel');

module.exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body; // Destructure name, email, and password from request body

  // Check if all required fields are provided
  if (!name || !email || !password || !passwordConfirm) {
    // If any field is missing, send a 400 Bad Request response
    return res
      .status(400)
      .json({ message: 'Please provide all required fields' });
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
  res.send('User login successfully!');
});

module.exports.logout = asyncHandler(async (req, res, next) => {
  res.send('User logout successfully!');
});
