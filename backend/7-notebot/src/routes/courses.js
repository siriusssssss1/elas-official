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
 * @description Retrieve courses associated with a user by their user ID. - Grid view of My Courses page, when clicking on Courses in the My Notes page.
 */
courseRouter.get('/users/:user_id', courseController.getCoursesByUserId);

/**
 * @route POST /courses/new
 * @description Create a new course associated with a user. - Clicking on "Or create new course" on the Add note to course pop-up window.
 */
courseRouter.post('/new', courseController.createCourse);

/**
 * @route DELETE /courses/:course_id
 * @description Delete a course along with its associated notes and sections. - Clicking on the trash can on the right side next to the course name.
 */
courseRouter.delete('/:course_id', courseController.deleteCourseWithNotes);

// Export router
module.exports = courseRouter;