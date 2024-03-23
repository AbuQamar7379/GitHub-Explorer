const router = require("express").Router();
const { userController } = require("../controllers");
const { validate } = require("../middlewares");
const { user } = require("../validations");

// Route to save a user
router.get("/save-user/:username", userController.saveUser);

// Route to find mutual followers
router.get(
  "/find-mutual-followers/:username",
  userController.findMutualFollowers
);

// Route to search users with query validation middleware
router.get(
  "/search-users",
  validate.validateQuery(user.searchUsers),
  userController.searchUsers
);

// Route to delete a user
router.delete("/delete-user/:username", userController.deleteUser);

// Route to update a user with body validation middleware
router.patch(
  "/update-user/:username",
  validate.validateBody(user.updateUser),
  userController.updateUser
);

// Route to list users with query validation middleware
router.get(
  "/list-users",
  validate.validateQuery(user.listUsers),
  userController.listUsers
);

module.exports = router;
