const httpStatus = require("http-status");
const { userService } = require("../services");

/**
 * Save a user by username.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const saveUser = async (req, res) => {
  try {
    let { username } = req.params;
    let user = await userService.saveUser(username);
    return res.status(httpStatus.OK).send(user);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

/**
 * Find mutual followers for a user by username.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const findMutualFollowers = async (req, res) => {
  try {
    let { username } = req.params;
    let mutuals = await userService.mutualFollowers(username);
    return res.status(httpStatus.OK).send(mutuals);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

/**
 * Search users based on query parameters.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const searchUsers = async (req, res) => {
  try {
    let users = await userService.searchUsers(req.query);
    return res.status(httpStatus.OK).send(users);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

/**
 * Soft delete a user by username.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const deleteUser = async (req, res) => {
  try {
    let { username } = req.params;
    let user = await userService.deleteUser(username);
    return res.status(httpStatus.OK).send(user);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

/**
 * Update a user by username.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const updateUser = async (req, res) => {
  try {
    let user = await userService.updateUser(req.body, req.params.username);
    return res.status(httpStatus.OK).send(user);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

/**
 * List users based on query parameters.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const listUsers = async (req, res) => {
  try {
    let users = await userService.listUsers(req.query);
    return res.status(httpStatus.OK).send(users);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

module.exports = {
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
