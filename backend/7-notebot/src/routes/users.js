// Importing necessary modules
const userController = require("../controllers/userController");

// Creating a router instance
let userRouter = require("express").Router();

// Middleware to handle CORS headers
userRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

/**
 * @route GET /users/:userId
 * @description Get user by Id.
 */
userRouter.get("/:userId", userController.getUserById);

/**
 * @route POST /users/new
 * @description Create a new user.
 */
userRouter.post("/new", userController.createNewUser);

/**
 * @route PUT /users/:userId/update
 * @description Update user information.
 */
userRouter.put("/:userId/update", userController.updateUser);

/**
 * @route GET /users/:userId/latestSearches
 * @description Get the latest searches for a user.
 */
userRouter.get("/:userId/latestSearches", userController.getLatestSearches);

/**
 * @route DELETE /users/:userId/latestSearchesDeleted
 * @description Delete the latest searches for a user.
 */
userRouter.delete("/:userId/latestSearchesDeleted", userController.deleteLatestSearches);

// Export the router
module.exports = userRouter;
 