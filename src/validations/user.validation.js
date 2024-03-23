const Joi = require("joi");

/**
 * Validation schema for searching users
 */
const searchUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    location: Joi.string(),
    company: Joi.string(),
  }),
};

/**
 * Validation schema for updating user
 */
const updateUser = {
  body: Joi.object().keys({
    location: Joi.string(),
    blog: Joi.string(),
    bio: Joi.string(),
  }),
};

/**
 * Validation schema for listing users
 */
const listUsers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
  }),
};

module.exports = { searchUsers, updateUser, listUsers };
