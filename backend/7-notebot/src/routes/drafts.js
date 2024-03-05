// Importing necessary modules
const draftController = require("../controllers/draftController");

// Creating a router instance
let draftRouter = require("express").Router();

/**
 * @route GET /drafts/users/:user_id
 * @description Retrieve draft notes belonging to a user by their user ID. - Grid view of the My Drafts Page.
 */
draftRouter.get("/users/:user_id", draftController.getDraftByUserId);

/**
 * @route PATCH /drafts/users/notes/save
 * @description Add a note to drafts for a user. - Clicking on "Or add to drafts" on the Add note to course pop-up window.
 */
draftRouter.patch("/users/notes/save", draftController.addNoteToDraft);

// Export router
module.exports = draftRouter;
