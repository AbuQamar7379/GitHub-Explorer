const mongoose = require("mongoose");

/**
 * User Schema definition.
 */
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  _id: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
    // validate: (url) => validator.isURL(url),
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  blog: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    // validate: (email) => validator.isEmail(email),
  },
  bio: {
    type: String,
  },
  public_repos: {
    type: Number,
  },
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  friends: [String],
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
});

/**
 * User model based on the userSchema.
 */
const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
