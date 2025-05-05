const CustomError = require('../errors');

module.exports = (...role) => {
  return (req, res, next) => {
    // Check if the user has the required role
    if (!req.user || !role.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};
