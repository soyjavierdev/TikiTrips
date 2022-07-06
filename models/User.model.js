const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please include a username'],
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [50, 'Username cannot be more than 50 characters long'],
      trim: true,
      set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
    },
    bio: {
      type: String,
      maxlength: [100, 'Your bio is too long! Please keep it under 100 characters'],
      trim: true
    },
    profilePic: {
      type: String,
      default: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please include an email'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please include a phone number'],
    },
    role: {
      type: String,
      enum: ['PASSENGER', 'DRIVER', 'ADMIN'],
      default: 'PASSENGER'
    },
    birth: {
      type: Date,
      required: [true, 'Please include your birthday'],
    },
  },
  {
    timestamps: true,
  }
);
const User = model("User", userSchema);
module.exports = User;
