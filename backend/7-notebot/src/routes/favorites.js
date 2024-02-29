// Importing necessary modules
const favController = require("../controllers/favoriteController");

// Creating a router instance
let favoriteRouter = require("express").Router();

/**
 * @route POST /favorites/:note_id
 * @description Toggel favorite status for a note.
 */
favoriteRouter.post("/notes/:note_id", favController.toggelFavoriteNote);

/**
 * @route GET /favorites/users/:user_id
 * @description Get favorite notes for a specific user - Grid view of the Favorites page.
 */
favoriteRouter.get("/notes/users/:user_id", favController.getFavNoteByUserId);

/**
 * @route POST /favorites/:course_id
 * @description Toggel favorite status for a course.
 */
favoriteRouter.post("/courses/:course_id", favController.toggelFavoriteCourse);

/**
 * @route GET /favorites/users/:user_id
 * @description Get favorite courses for a specific user - Grid view of the Favorites page.
 */
favoriteRouter.get("/courses/users/:user_id", favController.getFavCourseByUserId);

// Export router
module.exports = favoriteRouter;
