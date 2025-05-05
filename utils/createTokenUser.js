/**
 * Extract essential user data to include in JWT payload
 *
 * @function createTokenUser
 * @param {Object} user - The full user object from the database
 * @param {string} user._id - The MongoDB user ID
 * @param {string} user.name - The user's name
 * @param {string} user.email - The user's email
 * @returns {Object} A simplified user object containing only id, name, and email
 *
 * Usage:
 *   const tokenUser = createTokenUser(user);
 *
 * Notes:
 * - This is used to avoid including sensitive data (like passwords) in JWTs.
 * - The returned object is used as the payload when creating the JWT.
 */

module.exports.createTokenUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};
// This function takes a user object as an argument and returns a new object containing only the user's ID, name, and email. This is useful for creating JWT tokens that do not expose sensitive information like passwords.
// The returned object can be used as the payload when creating the JWT token, ensuring that only essential user information is included in the token.
