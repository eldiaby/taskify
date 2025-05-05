const jwt = require('jsonwebtoken');
const CustomError = require('../errors');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  // Step 1: Get token from cookies or headers
  const token =
    req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    // Step 2: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Step 3: Optionally, get only necessary fields (id, name, email, role)
    const user = await User.findById(decoded.id).select('id name email').lean();

    if (!user) {
      throw new CustomError.UnauthenticatedError('User not found');
    }

    // Step 4: Attach user data to the request object
    req.user = user;

    // Step 5: Proceed to the next middleware or route handler
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Failed');
  }
};
