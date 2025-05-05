/**
 * Attach JWT token as an HTTP-only cookie to the response
 *
 * @function attachCookiesToResponse
 * @param {Object} params
 * @param {Object} params.res - Express response object
 * @param {string} params.token - JWT token to be attached as a cookie
 * @returns {void} - This function does not return anything, it sets the cookie directly on the response
 *
 * Usage:
 *   attachCookiesToResponse({ res, token });
 *
 * Notes:
 * - The cookie is set as HTTP-only to prevent JavaScript access (protection against XSS)
 * - The cookie is signed (requires cookie-parser with a secret)
 * - The cookie will only be sent over HTTPS in production
 * - The cookie is set to expire in 30 days
 * - `sameSite: 'Lax'` is used to provide basic CSRF protection
 */

module.exports.attachCookiesToResponse = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in one day
  const oneMonth = oneDay * 30; // Approximate milliseconds in one month

  // Set the JWT token as an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    expires: new Date(Date.now() + oneMonth), // Set expiration time to 30 days from now
    secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS only in production
    signed: true, // Sign the cookie (must configure cookie-parser with a secret)
    sameSite: 'Lax', // Basic CSRF protection, cookie not sent on most cross-site requests
  });
};
