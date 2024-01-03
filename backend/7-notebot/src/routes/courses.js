var express = require("express");
var courseController = require("../controllers/courseController");
const favController = require("../controllers/favoriteController");



var router = express.Router();

router.get('/all', courseController.getAllCourses); // Show more link in the Courses page

//Registering courses route
// the rest of the path , pointer to the function from courseController
router.get('/:user_id', courseController.getCoursesByUserId); // Courses page (Grid view): when click on Courses in the Dashboard page
router.post('/new', courseController.createCourse); // AddCourse button in the Dashboard page
router.delete('/:course_id', courseController.deleteCourseWithNotes); // Clicking on the delete icon in the Courses page

router.post("/:course_id/favorite", favController.toggetFavoriteCourse);

router.get("/users/:user_id/favorite", favController.getFavCourseByUserId);

//export the router
module.exports = router;