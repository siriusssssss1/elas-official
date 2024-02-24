// Importing necessary modules
const noteController = require("../controllers/noteController");

// Creating a router instance
let noteRouter = require("express").Router();

/**
 * @route GET /notes/all
 * @description Test route to get all notes.
 */
noteRouter.get('/test', noteController.getNotes);

/**
 * @route GET /notes/:note_id/widgets
 * @description Get widgets for a specific note - Grid view SavedNotes page.
 */
noteRouter.get("/:note_id/widgets", noteController.getNoteWidgets);

/**
 * @route GET /notes/users/:user_id
 * @description Get notes for a specific user - Grid view of the Dashboard page.
 */
noteRouter.get("/users/:user_id", noteController.getNoteByUserId);

/**
 * @route POST /notes/new
 * @description Create a new note - AddNote button in the Dashboard page.
 */
noteRouter.post("/new", noteController.createNote);

/**
 * @route PUT /notes/:note_id
 * @description Update a specific note - Clicking on a note in the Dashboard page.
 */
noteRouter.put("/:note_id", noteController.updateNote);

/**
 * @route DELETE /notes/:note_id
 * @description Delete a specific note - Clicking on the delete button in the NoteDetails page.
 */
noteRouter.delete("/:note_id", noteController.deleteNote);

/**
 * @route GET /notes/users/:user_id/courses/:course_id
 * @description Get notes by user ID and course ID - Show more link in the Dashboard page.
 */
noteRouter.get("/users/:user_id/courses/:course_id", noteController.getNotesByUserIdAndCourseId);

/**
 * @route GET /notes/search/:keyword
 * @description Get notes by course and note title - Search bar in the Dashboard page.
 */
noteRouter.get("/search/:keyword", noteController.getNotesByCourseAndNoteTitle);

/**
 * @route GET /notes/users/:user_id/savednotes
 * @description Get saved notes for a specific user - Grid view SavedNotes page.
 */
noteRouter.get("/users/:user_id/savednotes", noteController.getSavedNotesByUserId);

/**
 * @route POST /notes/users/:user_id/notes/:note_id/save
 * @description Save a note for a user - Clicking on the save button in the Search page.
 */
noteRouter.post("/users/:user_id/notes/:note_id/save", noteController.saveNote);

/**
 * @route PATCH /notes/push_sections
 * @description Push sections to a note - Add sections to a note.
 */
noteRouter.patch("/push_sections", noteController.pushSectionsToNote);

/**
 * @route GET /notes/note/:note_id
 * @description Get a note by its ID - Get details of a specific note.
 */
noteRouter.get("/note/:note_id", noteController.getNoteByNoteId);

/**
 * @route POST /notes/update_rating
 * @description Update the rating of a specific note.
 */
noteRouter.post('/update_rating', noteController.updateRating);

/**
 * @route PATCH /notes/course/:course_id
 * @description Add a note to a specific course.
 */
noteRouter.patch("/course/:course_id", noteController.addNoteToCourse);

// Export router
module.exports = noteRouter;
