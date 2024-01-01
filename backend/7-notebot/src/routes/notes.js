var express = require("express");
var router = express.Router();
const noteController = require("../controllers/noteController");
const favController = require("../controllers/favoriteController");
 

//Registering notes route
router.get("/:note_id/widgets", noteController.getNoteWidgets); // Grid view SavedNotes page
// the rest of the path , pointer to the function from noteController
router.get("/users/:user_id", noteController.getNoteByUserId); //Grid view of the Dashboard page
router.post("/new", noteController.createNote); // AddNote button in the Dashboard page
router.put("/:note_id", noteController.updateNote); // Clicking on a note in the Dashboard page

router.delete("/:note_id", noteController.deleteNote); // Clicking on the delete button in the NoteDetails page
router.get("/users/:user_id/courses/:course_id", noteController.getNotesByUserIdAndCourseId); // Show more link in the Dashboard page
router.get("/search/:keyword", noteController.getNotesByCourseTitle); // Search bar in the Dashboard page

router.get("/users/:user_id/savednotes", noteController.getSavedNotesByUserId); // Grid view SavedNotes page

router.post("/users/:user_id/notes/:note_id/save", noteController.saveNote); // Clicking on the save button in the Search page

router.patch("/push_sections", noteController.pushSectionsToNote);

router.get("/note/:note_id", noteController.getNoteByNoteID);

router.post("/:note_id/favorite", favController.toggetFavoriteNote);

router.get("/users/:user_id/favorite", favController.getFavNoteByUserId);

router.post('/update_rating', noteController.updateRating);

router.patch("/course/:course_id", noteController.addNoteToCourse);

// test route
router.get('/all', noteController.getNotes);


//export the router
module.exports = router;
