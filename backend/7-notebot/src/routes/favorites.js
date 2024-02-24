var express = require("express");
var router = express.Router();
const favController = require("../controllers/favoriteController");

/**
 * @route POST /favorites/:note_id
 * @description Togget favorite status for a note.
 */
router.post("/:note_id", favController.toggetFavoriteNote);

/**
 * @route GET /favorites/users/:user_id
 * @description Get favorite notes for a specific user -  Grid view of the Favorites page.
 */
router.get("/users/:user_id", favController.getFavNoteByUserId);

/**
 * @route POST /favorites/:course_id
 * @description Togget favorite status for a course.
 */
router.post("/:course_id", favController.toggetFavoriteCourse);

/**
 * @route GET /favorites/:user_id
 * @description Get favorite courses by user ID - -  Grid view of the Favorites page.
 */
router.get("/users/:user_id", favController.getFavCourseByUserId);

module.exports = router;
