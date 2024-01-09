/******
 * @Note This is one example, you can create more route files under
 * the routes folder and export them. Make sure you import the routes
 * in the server.js file.
 */

const controller = require("../controllers/card.controller");


let cardRouter = require("express").Router();

cardRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

cardRouter.get("/cards", controller.getAllCards);

module.exports = cardRouter;
