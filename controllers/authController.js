const asyncHandler = require('express-async-handler');

module.exports.register = asyncHandler(async (req, res, next) => {
  res.send('User registered successfully!');
});

module.exports.login = asyncHandler(async (req, res, next) => {
  res.send('User login successfully!');
});

module.exports.logout = asyncHandler(async (req, res, next) => {
  res.send('User logout successfully!');
});
