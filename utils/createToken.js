const JWT = require('jsonwebtoken');

/**
 * Generate a signed JWT token using the provided payload
 *
 * @function createToken
 * @param {Object} payload - The payload object to encode inside the JWT (e.g. user info)
 * @returns {string} - A signed JWT token
 *
 * Usage:
 *   const token = createToken({ Id: user._id, name: user.name });
 *
 * Notes:
 * - The secret key must be defined in the environment variable: JWT_SECRET_KEY
 * - The expiration time must be defined in JWT_EXPIRES_IN (e.g., '1d', '7d', '30m')
 */

module.exports.createToken = (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// This function takes a payload object as an argument and returns a signed JWT token using the secret key and expiration time defined in the environment variables.
// The token can be used for authentication and authorization purposes in a web application.
