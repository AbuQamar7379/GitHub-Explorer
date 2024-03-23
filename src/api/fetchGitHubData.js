const { githubApi } = require("../config/config");
const axios = require("axios");

/**
 * Fetches user details by username from the GitHub API.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object>} - User details object.
 */
const fetchDataByUsername = async (username) => {
  try {
    let { data } = await axios.get(githubApi + username);
    return data;
  } catch (err) {
    throw new Error("Failed to fetch user details");
  }
};

/**
 * Fetches followers data by username from the GitHub API.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object>} - Followers data object.
 */
const fetchFollowersByUsername = async (username) => {
  try {
    let { data } = await axios.get(`${githubApi}${username}/followers`);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch followers data");
  }
};

/**
 * Fetches following data by username from the GitHub API.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object>} - Following data object.
 */
const fetchFollowingByUsername = async (username) => {
  try {
    let { data } = await axios.get(`${githubApi}${username}/following`);
    return data;
  } catch (err) {
    throw new Error("Failed to fetch following data");
  }
};

module.exports = {
  fetchDataByUsername,
  fetchFollowersByUsername,
  fetchFollowingByUsername,
};
