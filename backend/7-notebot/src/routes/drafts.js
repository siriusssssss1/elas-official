// Importing necessary modules
const draftController = require("../controllers/draftController");

// Creating a router instance
let draftRouter = require("express").Router();

/**
 * @route GET /drafts/users/:user_id
 * @description Get drafts by user ID - Drafts page (Grid view): when clicking on Drafts on the Dashboard page.
 */
draftRouter.get("/users/:user_id", draftController.getDraftByUserId);

/**
 * @route PATCH /drafts/users/notes/save
 * @description Add a note to the Drafts folder.
 */
draftRouter.patch('/users/notes/save', draftController.addNoteToDraft);

// Export router
module.exports = draftRouter;
