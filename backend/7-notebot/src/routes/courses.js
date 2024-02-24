var express = require("express");
var router = express.Router();
const courseController = require("../controllers/courseController");
const favController = require("../controllers/favoriteController");

/**
 * @route GET /courses/all
 * @description Test route to get all courses.
 */
router.get('/test', courseController.getAllCourses);

/**
 * @route GET /courses/users/:user_id
 * @description Get courses by user ID - Courses page (Grid view): when clicking on Courses in the Dashboard page.
 */
router.get('/users/:user_id', courseController.getCoursesByUserId);

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


// Export the router
module.exports = router;