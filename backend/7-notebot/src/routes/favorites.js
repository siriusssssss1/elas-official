// Importing necessary modules
const favController = require("../controllers/favoriteController");

// Creating a router instance
let favoriteRouter = require("express").Router();

/**
 * @route POST /favorites/:note_id
 * @description Togget favorite status for a note.
 */
favoriteRouter.post("/:note_id", favController.toggetFavoriteNote);

/**
 * @route GET /favorites/users/:user_id
 * @description Get favorite notes for a specific user -  Grid view of the Favorites page.
 */
favoriteRouter.get("/users/:user_id", favController.getFavNoteByUserId);

/**
 * @route POST /favorites/:course_id
 * @description Togget favorite status for a course.
 */
favoriteRouter.post("/:course_id", favController.toggetFavoriteCourse);

/**
 * @route GET /favorites/users/:user_id
 * @description Get favorite courses by user ID - -  Grid view of the Favorites page.
 */
favoriteRouter.get("/users/:user_id", favController.getFavCourseByUserId);

// Export router
module.exports = favoriteRouter;
