const sectionController = require('../controllers/sectionController');
const express = require('express');
const router = express.Router();

// Registering sections route

/**
 * @route GET /sections/note/:note_id
 * @description Get all sections for a specific note.
 */
router.get('/note/:note_id', sectionController.getSectionsByNoteId);

/**
 * @route POST /sections/new
 * @description Create a new section.
 */
router.post('/new', sectionController.createSection);

/**
 * @route PATCH /sections/push_widgets
 * @description Add widgets to a section.
 */
router.patch('/push_widgets', sectionController.pushWidgetsToSection);

/**
 * @route PATCH /sections/:section_id
 * @description Update a specific section.
 */
router.patch('/:section_id', sectionController.updateSection);

/**
 * @route PATCH /sections/note/:note_id
 * @description Add a section to a specific note.
 */
router.patch('/note/:note_id', sectionController.addSectionToNote);

/**
 * @route PATCH /sections/:section_id/widgets
 * @description Update widgets for a specific section.
 */
router.patch('/:section_id/widgets', sectionController.updateSectionWidgets);

/**
 * @route DELETE /sections/:note_id/:section_id
 * @description Delete a specific section.
 */
router.delete('/:note_id/:section_id', sectionController.deleteSection);

// Test route

/**
 * @route GET /sections/test
 * @description Test route to get all sections.
 */
router.get('/test', sectionController.getSections);

// Export the router
module.exports = router;
