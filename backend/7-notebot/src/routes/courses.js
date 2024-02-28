// Importing necessary modules
const courseController = require("../controllers/courseController");

// Creating a router instance
let courseRouter = require("express").Router();

/**
 * @route GET /courses/test
 * @description Test route to get all courses.
 */
courseRouter.get('/test', courseController.getAllCourses);

/**
 * @route GET /courses/users/:user_id
 * @description Get courses by user ID - Courses page (Grid view): when clicking on Courses in the Dashboard page.
 */
courseRouter.get('/users/:user_id', courseController.getCoursesByUserId);

/**
 * @route POST /courses/new
 * @description Create course - AddCourse button in the Dashboard page.
 */
courseRouter.post('/new', courseController.createCourse);

/**
 * @route DELETE /courses/:course_id
 * @description Delete course with notes - Clicking on the delete icon in the Courses page.
 */
courseRouter.delete('/:course_id', courseController.deleteCourseWithNotes);


// Export router
module.exports = courseRouter;