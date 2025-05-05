const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    passwordConfirm: {
      type: String,
      required: [true, 'The user password confirm is required field'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password; // this only points to current doc on NEW document creation
        },
        message: 'Password are not the same!',
      },
    },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
  // If the password is not modified, skip hashing
  if (!this.isModified('password')) return next();

  this.passwordConfirm = undefined; // Remove passwordConfirm field from the document

  this.passwordChangedAt = Date.now() - 1000; // Set passwordChangedAt to current time minus 1 second

  const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  // Compare the provided password with the hashed password in the database
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
