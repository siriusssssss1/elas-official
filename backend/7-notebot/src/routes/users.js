/******
 * @Note This is one example, you can create more route files under
 * the routes folder and export them. Make sure you import the routes
 * in the server.js file.
 */

const userController = require("../controllers/userController");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let userRouter = require("express").Router();`
 * is creating a new instance of the Express Router.
 * The 'userRouter' in this example is acting like
 * a middleware function that allows you to define routes
 * for your application. Make sure to define the middleware,
 * in this case 'userRouter.use()' function is used to
 * define middleware.
 */
let userRouter = require("express").Router();

userRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
/***************** END: INITIALIZE ROUTER MODULE *****************/

/***************** START: CREATE ROUTES **************************
 * @documentation
 * When creating a route, youne the HTTP method
 * and the path. The HTTP method can be a need to definy of the following:
 * GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.
 * In the example below, 'userRouter' is used to define the
 * routes. The 'userRouter.get()' method is used to define a
 * GET route. The first parameter '/users/:userId' is the path and
 * the second parameter 'controller.saveUser' is the controller
 * function. ":userId" is a parameter send through the url
 * The controller function is define in the 'user.controller.js' 
 * file under controllers folder.
 */
userRouter.get("/:userId", userController.getUserById);
userRouter.post("/new", userController.createNewUser);
userRouter.put("/:userId/update", userController.updateUser);
userRouter.get("/:userId/latestSearches", userController.getLatestSearches);
userRouter.delete("/:userId/latestSearchesDeleted", userController.deleteLatestSearches);

/***************** END: CREATE ROUTES ****************************/

module.exports = userRouter;
