const noteController = require("../controllers/noteController");
const favController = require("../controllers/favoriteController");

// Creating a router instance
const router = express.Router();

// Registering notes route

/**
 * @route GET /notes/:note_id/widgets
 * @description Grid view SavedNotes page - Get widgets for a specific note.
 */
router.get("/:note_id/widgets", noteController.getNoteWidgets);

/**
 * @route GET /notes/users/:user_id
 * @description Grid view of the Dashboard page - Get notes for a specific user.
 */
router.get("/users/:user_id", noteController.getNoteByUserId);

/**
 * @route POST /notes/new
 * @description AddNote button in the Dashboard page - Create a new note.
 */
router.post("/new", noteController.createNote);

/**
 * @route PUT /notes/:note_id
 * @description Clicking on a note in the Dashboard page - Update a specific note.
 */
router.put("/:note_id", noteController.updateNote);

/**
 * @route DELETE /notes/:note_id
 * @description Clicking on the delete button in the NoteDetails page - Delete a specific note.
 */
router.delete("/:note_id", noteController.deleteNote);

/**
 * @route GET /notes/users/:user_id/courses/:course_id
 * @description Show more link in the Dashboard page - Get notes by user ID and course ID.
 */
router.get("/users/:user_id/courses/:course_id", noteController.getNotesByUserIdAndCourseId);

/**
 * @route GET /notes/search/:keyword
 * @description Search bar in the Dashboard page - Get notes by course and note title.
 */
router.get("/search/:keyword", noteController.getNotesByCourseAndNoteTitle);

/**
 * @route GET /notes/users/:user_id/savednotes
 * @description Grid view SavedNotes page - Get saved notes for a specific user.
 */
router.get("/users/:user_id/savednotes", noteController.getSavedNotesByUserId);

/**
 * @route POST /notes/users/:user_id/notes/:note_id/save
 * @description Clicking on the save button in the Search page - Save a note for a user.
 */
router.post("/users/:user_id/notes/:note_id/save", noteController.saveNote);

/**
 * @route PATCH /notes/push_sections
 * @description Add sections to a note - Push sections to a note.
 */
router.patch("/push_sections", noteController.pushSectionsToNote);

/**
 * @route GET /notes/note/:note_id
 * @description Get a note by its ID - Get details of a specific note.
 */
router.get("/note/:note_id", noteController.getNoteByNoteID);

/**
 * @route POST /notes/:note_id/favorite
 * @description Toggle favorite status for a note - Toggle the favorite status of a note.
 */
router.post("/:note_id/favorite", favController.toggleFavoriteNote);

/**
 * @route GET /notes/users/:user_id/favorite
 * @description Get favorite notes by user ID - Get favorite notes for a specific user.
 */
router.get("/users/:user_id/favorite", favController.getFavNoteByUserId);

/**
 * @route POST /notes/update_rating
 * @description Update the rating of a note - Update the rating of a specific note.
 */
router.post('/update_rating', noteController.updateRating);

/**
 * @route PATCH /notes/course/:course_id
 * @description Add a note to a course - Add a note to a specific course.
 */
router.patch("/course/:course_id", noteController.addNoteToCourse);

/**
 * @route GET /notes/all
 * @description Test route to get all notes - Get all notes (for testing purposes).
 */
router.get('/all', noteController.getNotes);

// Export the router
module.exports = router;
