// Importing necessary modules
const favController = require("../controllers/favoriteController");

// Creating a router instance
let favoriteRouter = require("express").Router();

/**
 * @route POST /favorites/:note_id
 * @description Toggle favorite status for a note by a user. - Clicking on the heart on a note.
 */
favoriteRouter.post("/notes/:note_id", favController.toggleFavoriteNote);

/**
 * @route GET /favorites/users/:user_id
 * @description Retrieve favorite notes belonging to a user by their user ID. - Grid view of the My Favorites page.
 */
favoriteRouter.get("/notes/users/:user_id", favController.getFavNoteByUserId);

/**
 * @route POST /favorites/:course_id
 * @description Toggle favorite status for a course by a user. - Clicking on the heart on the side of the course name.
 */
favoriteRouter.post("/courses/:course_id", favController.toggleFavoriteCourse);

/**
 * @route GET /favorites/users/:user_id
 * @description Retrieve favorite courses belonging to a user by their user ID. - Grid view of the My Favorites page.
 */
favoriteRouter.get("/courses/users/:user_id", favController.getFavCourseByUserId);

// Export router
module.exports = favoriteRouter;
