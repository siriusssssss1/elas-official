// Importing necessary modules
const widgetController = require("../controllers/widgetController.js");

// Creating a router instance
let widgetRouter = require("express").Router();

/**
 * @route GET /widgets/widget/test
 * @description Test route to get a widget.
 */
widgetRouter.get('/test', widgetController.getWidget);

/**
 * @route GET /widgets/section/:section_id
 * @description Get widgets for a specific section.
 */
widgetRouter.get('/section/:section_id', widgetController.getWidgetsBySectionId);

/**
 * @route PATCH /widgets/section/:section_id
 * @description Add a widget to a specific section.
 */
widgetRouter.patch('/section/:section_id', widgetController.addWidgetToSection);

/**
 * @route PATCH /widgets/:widget_id
 * @description Update a specific widget.
 */
widgetRouter.patch('/:widget_id', widgetController.updateWidget);

/**
 * @route DELETE /widgets/:section_id/:widget_id
 * @description Delete a specific widget from a section.
 */
widgetRouter.delete('/:section_id/:widget_id', widgetController.deleteWidget);

/**
 * @route POST /widgets/new
 * @description Create a new widget.
 */
widgetRouter.post('/new', widgetController.createWidget);

// Export router
module.exports = widgetRouter;
