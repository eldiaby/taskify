const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The user name is required field'],
      trim: true,
      minlength: [3, 'The user name must be at least 3 characters long'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'The user email is required field'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please insert a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'The user password is required field'],
      minlength: [8, 'The user password must be at least 8 characters long'],
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
