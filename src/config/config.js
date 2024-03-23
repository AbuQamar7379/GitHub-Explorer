const dotenv = require("dotenv");
const path = require("path");
const envVars = process.env;

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

/**
 * Configuration object containing environment variables.
 * @typedef {Object} Config
 * @property {number} port - Port number for the server.
 * @property {string} mongoUri - MongoDB connection URI.
 * @property {string} githubApi - GitHub API base URL.
 * @property {string} token - GitHub API authentication token.
 * @property {string} githubUsername - GitHub username.
 */

/**
 * Configuration object containing environment variables.
 * @type {Config}
 */
module.exports = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  githubApi: envVars.GithubApi,
  token: envVars.githubAuthToken,
  githubUsername: envVars.githubUsername,
};
