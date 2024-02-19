var express = require('express');
var router = express.Router();
const widgetController = require("../controllers/widgetController.js");

// Registering widgets route

/**
 * @route GET /widgets/section/:section_id
 * @description Get widgets by section ID - Get widgets for a specific section.
 */
router.get('/section/:section_id', widgetController.getWidgetsBySectionId);

/**
 * @route PATCH /widgets/section/:section_id
 * @description Add widget to section - Add a widget to a specific section.
 */
router.patch('/section/:section_id', widgetController.addWidgetToSection);

/**
 * @route PATCH /widgets/:widget_id
 * @description Update widget - Update a specific widget.
 */
router.patch('/:widget_id', widgetController.updateWidget);

/**
 * @route DELETE /widgets/:section_id/:widget_id
 * @description Delete widget - Delete a specific widget from a section.
 */
router.delete('/:section_id/:widget_id', widgetController.deleteWidget);

/**
 * @route POST /widgets/new
 * @description Create widget - Create a new widget.
 */
router.post('/new', widgetController.createWidget);

// Test route
/**
 * @route GET /widgets/widget/test
 * @description Test route to get a widget - Get a widget for testing purposes.
 */
router.get('/widget/test', widgetController.getWidget);

// Export the router
module.exports = router;
