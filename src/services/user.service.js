const { User } = require("../models");
const {
  fetchDataByUsername,
  fetchFollowersByUsername,
  fetchFollowingByUsername,
} = require("../api/fetchGitHubData");

/**
 * Save a user to the database if not already exists
 * @param {string} userName - GitHub username
 * @returns {Promise<object>} - User object saved in the database
 */
const saveUser = async (userName) => {
  try {
    // Check if the user already exists in the database
    let isUserExist = await User.findOne({ username: userName });
    if (isUserExist) {
      return isUserExist;
    }

    // Fetch user data from GitHub API
    let fetchedUser = await fetchDataByUsername(userName);
    let {
      login: username,
      node_id: _id,
      avatar_url,
      type,
      name,
      company,
      blog,
      location,
      email,
      bio,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    } = fetchedUser;

    // Create and save the user in the database
    let user = User.create({
      username,
      _id,
      avatar_url,
      type,
      name,
      company,
      bio,
      location,
      email,
      blog,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    });

    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * Find mutual followers of a user
 * @param {string} username - GitHub username
 * @returns {Promise<object | string>} - Mutual followers information or error message
 */
const mutualFollowers = async (username) => {
  try {
    // Check if the user exists in the database
    let isUserExist = await User.findOne({ username });
    if (!isUserExist) {
      return "User doesn't exist!";
    }

    // Fetch followers and following data from GitHub API
    let followers = await fetchFollowersByUsername(username);
    let following = await fetchFollowingByUsername(username);
    let userFollower = followers.map((user) => user.login);
    let userFollowing = following.map((user) => user.login);
    let mutual = userFollowing.filter((user) => userFollower.includes(user));
    let mutualFriends = await User.findOneAndUpdate(
      { username },
      { friends: mutual },
      { new: true }
    );

    return mutualFriends;
  } catch (err) {
    throw err;
  }
};

/**
 * Search users based on specified queries
 * @param {object} queries - Query parameters
 * @returns {Promise<Array>} - Array of users matching the search criteria
 */
const searchUsers = async (queries) => {
  try {
    let { username, location, company } = queries;
    let query = {};
    if (username) {
      query.username = { $regex: new RegExp(username, "i") };
    }
    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }
    if (company) {
      query.company = { $regex: new RegExp(company, "i") };
    }

    let users = await User.find(query);
    return users;
  } catch (err) {
    throw err;
  }
};

/**
 * Soft delete a user by marking it as deleted
 * @param {string} username - GitHub username
 * @returns {Promise<object>} - Deleted user object
 */
const deleteUser = async (username) => {
  try {
    let deletedUser = await User.findOneAndUpdate(
      { username },
      { deleted: true },
      { new: true }
    );
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (err) {
    throw err;
  }
};

/**
 * Update user information
 * @param {object} userData - Updated user data
 * @param {string} username - GitHub username
 * @returns {Promise<object>} - Updated user object
 */
const updateUser = async (userData, username) => {
  try {
    let { location, blog, bio } = userData;
    let user = await User.findOneAndUpdate(
      { username },
      { location, blog, bio },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * List users with optional sorting
 * @param {object} queries - Query parameters for sorting
 * @returns {Promise<Array>} - Array of users with optional sorting
 */
const listUsers = async (queries) => {
  try {
    let { sortBy } = queries;
    let users = await User.find({});
    let sortedList;
    if (sortBy === "public_repos") {
      sortedList = users.sort((a, b) => b.public_repos - a.public_repos);
    } else if (sortBy === "followers") {
      sortedList = users.sort((a, b) => b.followers - a.followers);
    } else {
      return users;
    }

    return sortedList;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  saveUser,
  mutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
