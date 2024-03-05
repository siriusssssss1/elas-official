// Importing necessary modules
const noteController = require("../controllers/noteController");

// Creating a router instance
let noteRouter = require("express").Router();

/**
 * @route GET /notes/test
 * @description Test route to get all notes.
 */
noteRouter.get('/test', noteController.getNotes);

/**
 * @route GET /notes/:note_id/widgets
 * @description Retrieve note widgets associated with a given note ID.
 */
noteRouter.get("/:note_id/widgets", noteController.getNoteWidgets);

/**
 * @route GET /notes/users/:user_id
 * @description Retrieve notes belonging to a user by their user ID. - Grid view of the My Notes page.
 */
noteRouter.get("/users/:user_id", noteController.getNoteByUserId);

/**
 * @route POST /notes/new
 * @description Create a new note with associated sections and widgets for a given user ID - Clicking on the Add Note button.
 */
noteRouter.post("/new", noteController.createNote);

/**
 * @route PUT /notes/:note_id
 * @description Update a note along with its sections and widgets. - Clicking on a note in the My Notes page.
 */
noteRouter.put("/:note_id", noteController.updateNote);

/**
 * @route DELETE /notes/:note_id
 * @description Delete a note along with its associated sections and widgets. - Clicking on the trash can button on the note.
 */
noteRouter.delete("/:note_id", noteController.deleteNote);

/**
 * @route GET /notes/users/:user_id/courses/:course_id
 * @description Retrieve notes belonging to a user for a specific course.
 */
noteRouter.get("/users/:user_id/courses/:course_id", noteController.getNotesByUserIdAndCourseId);

/**
 * @route GET /notes/search/:keyword
 * @description Search notes based on a course title or note title search keyword. - Search bar in the Dashboard page.
 */
noteRouter.get("/search/:keyword", noteController.getNotesByCourseAndNoteTitle);

/**
 * @route GET /notes/users/:user_id/savednotes
 * @description Retrieve saved notes belonging to a user by their user ID.
 */
noteRouter.get("/users/:user_id/savednotes", noteController.getSavedNotesByUserId);

/**
 * @route POST /notes/users/:user_id/notes/:note_id/save
 * @description Save a note for a user identified by their user ID.
 */
noteRouter.post("/users/:user_id/notes/:note_id/save", noteController.saveNote);

/**
 * @route PATCH /notes/push_sections
 * @description Add sections to a note identified by its ID.
 */
noteRouter.patch("/push_sections", noteController.pushSectionsToNote);

/**
 * @route GET /notes/note/:note_id
 * @description Retrieve a note by its ID. - Get details of a specific note.
 */
noteRouter.get("/note/:note_id", noteController.getNoteByNoteId);

/**
 * @route POST /notes/update_rating
 * @description Update the rating of a specific note. - Clicking on the stars on a note.
 */
noteRouter.post('/update_rating', noteController.updateRating);

/**
 * @route PATCH /notes/course/:course_id
 * @description Add a note to a course identified by its ID. - Clicking on a course from the courses list in the Add note to course pop-up window.
 */
noteRouter.patch("/course/:course_id", noteController.addNoteToCourse);

// Export router
module.exports = noteRouter;
