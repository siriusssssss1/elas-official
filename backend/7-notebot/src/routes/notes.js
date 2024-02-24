var express = require("express");
var router = express.Router();
const noteController = require("../controllers/noteController");

/**
 * @route GET /notes/all
 * @description Test route to get all notes.
 */
router.get('/test', noteController.getNotes);

/**
 * @route GET /notes/:note_id/widgets
 * @description Get widgets for a specific note - Grid view SavedNotes page.
 */
router.get("/:note_id/widgets", noteController.getNoteWidgets);

/**
 * @route GET /notes/users/:user_id
 * @description Get notes for a specific user - Grid view of the Dashboard page.
 */
router.get("/users/:user_id", noteController.getNoteByUserId);

/**
 * @route POST /notes/new
 * @description Create a new note - AddNote button in the Dashboard page.
 */
router.post("/new", noteController.createNote);

/**
 * @route PUT /notes/:note_id
 * @description Update a specific note - Clicking on a note in the Dashboard page.
 */
router.put("/:note_id", noteController.updateNote);

/**
 * @route DELETE /notes/:note_id
 * @description Delete a specific note - Clicking on the delete button in the NoteDetails page.
 */
router.delete("/:note_id", noteController.deleteNote);

/**
 * @route GET /notes/users/:user_id/courses/:course_id
 * @description Get notes by user ID and course ID - Show more link in the Dashboard page.
 */
router.get("/users/:user_id/courses/:course_id", noteController.getNotesByUserIdAndCourseId);

/**
 * @route GET /notes/search/:keyword
 * @description Get notes by course and note title - Search bar in the Dashboard page.
 */
router.get("/search/:keyword", noteController.getNotesByCourseAndNoteTitle);

/**
 * @route GET /notes/users/:user_id/savednotes
 * @description Get saved notes for a specific user - Grid view SavedNotes page.
 */
router.get("/users/:user_id/savednotes", noteController.getSavedNotesByUserId);

/**
 * @route POST /notes/users/:user_id/notes/:note_id/save
 * @description Save a note for a user - Clicking on the save button in the Search page.
 */
router.post("/users/:user_id/notes/:note_id/save", noteController.saveNote);

/**
 * @route PATCH /notes/push_sections
 * @description Push sections to a note - Add sections to a note.
 */
router.patch("/push_sections", noteController.pushSectionsToNote);

/**
 * @route GET /notes/note/:note_id
 * @description Get a note by its ID - Get details of a specific note.
 */
router.get("/note/:note_id", noteController.getNoteByNoteId);



/**
 * @route POST /notes/update_rating
 * @description Update the rating of a specific note.
 */
router.post('/update_rating', noteController.updateRating);

/**
 * @route PATCH /notes/course/:course_id
 * @description Add a note to a specific course.
 */
router.patch("/course/:course_id", noteController.addNoteToCourse);

// Export the router
module.exports = router;
