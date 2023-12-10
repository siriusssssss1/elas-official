/******
 * @Note This is one example, you can create more route files under
 * the routes folder and export them. Make sure you import the routes
 * in the server.js file.
 */

const controller = require("../controllers/user.controller");
var express = require("express");
var router = express.Router();
const multer = require("multer");
const uuid = require("uuid");

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

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, uuid.v4() + "-" + Date.now() + "." + extension);
    },
  }),
});
const usersController = require("../controllers/usersController");
/***************** END: INITIALIZE ROUTER MODULE *****************/

/***************** START: CREATE ROUTES **************************
 * @documentation
 * When creating a route, you need to define the HTTP method
 * and the path. The HTTP method can be any of the following:
 * GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.
 * In the example below, 'userRouter' is used to define the
 * routes. The 'userRouter.get()' method is used to define a
 * GET route. The first parameter '/users/:userId' is the path and
 * the second parameter 'controller.saveUser' is the controller
 * function. ":userId" is a parameter send through the url
 * The controller function is define in the 'user.controller.js' 
 * file under controllers folder.
 */
userRouter.get("/users/:userId", controller.getUserById);
userRouter.post("/users", controller.createNewUser);
userRouter.put("/users/:userId", controller.updateUser);
userRouter.post("/upload", upload.single("file"), usersController.uploadFile);
//userRouter.get("/", usersController.getUsers);

/***************** END: CREATE ROUTES ****************************/

module.exports = userRouter;



