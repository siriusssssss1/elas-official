var express = require("express");
var courseController = require("../controllers/courseController");
const favController = require("../controllers/favoriteController");

var router = express.Router();

// Test route
/**
 * @route GET /courses/all
 * @description Get all courses - Show more link in the Courses page.
 */
router.get('/all', courseController.getAllCourses);

// Registering courses route

/**
 * @route GET /courses/:user_id
 * @description Get courses by user ID - Courses page (Grid view): when clicking on Courses in the Dashboard page.
 */
router.get('/:user_id', courseController.getCoursesByUserId);

/**
 * @route POST /courses/new
 * @description Create course - AddCourse button in the Dashboard page.
 */
router.post('/new', courseController.createCourse);

/**
 * @route DELETE /courses/:course_id
 * @description Delete course with notes - Clicking on the delete icon in the Courses page.
 */
router.delete('/:course_id', courseController.deleteCourseWithNotes);

/**
 * @route POST /courses/:course_id/favorite
 * @description Toggle favorite status for a course.
 */
router.post("/:course_id/favorite", favController.toggleFavoriteCourse);

/**
 * @route GET /courses/users/:user_id/favorite
 * @description Get favorite courses by user ID.
 */
router.get("/users/:user_id/favorite", favController.getFavCourseByUserId);

// Export the router
module.exports = router;