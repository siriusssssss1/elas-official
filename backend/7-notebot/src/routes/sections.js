// Importing necessary modules
const sectionController = require('../controllers/sectionController');

// Creating a router instance
let sectionRouter = require("express").Router();

/**
 * @route GET /sections/test
 * @description Test route to get all sections.
 */
sectionRouter.get('/test', sectionController.getSections);

/**
 * @route GET /sections/note/:note_id
 * @description Get all sections for a specific note.
 */
sectionRouter.get('/note/:note_id', sectionController.getSectionsByNoteId);

/**
 * @route POST /sections/new
 * @description Create a new section.
 */
sectionRouter.post('/new', sectionController.createSection);

/**
 * @route PATCH /sections/push_widgets
 * @description Add widgets to a section.
 */
sectionRouter.patch('/push_widgets', sectionController.pushWidgetsToSection);

/**
 * @route PATCH /sections/:section_id
 * @description Update a specific section.
 */
sectionRouter.patch('/:section_id', sectionController.updateSection);

/**
 * @route PATCH /sections/note/:note_id
 * @description Add a section to a specific note.
 */
sectionRouter.patch('/note/:note_id', sectionController.addSectionToNote);

/**
 * @route PATCH /sections/:section_id/widgets
 * @description Update widgets for a specific section.
 */
sectionRouter.patch('/:section_id/widgets', sectionController.updateSectionWidgets);

/**
 * @route DELETE /sections/:note_id/:section_id
 * @description Delete a specific section.
 */
sectionRouter.delete('/:note_id/:section_id', sectionController.deleteSection);

// Export router
module.exports = sectionRouter;
