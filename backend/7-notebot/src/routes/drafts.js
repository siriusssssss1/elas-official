var express = require("express");
var router = express.Router();
const draftController = require("../controllers/draftController");

/**
 * @route GET /drafts/users/:user_id
 * @description Get drafts by user ID - Drafts page (Grid view): when clicking on Drafts on the Dashboard page.
 */
router.get("/users/:user_id/", draftController.getDraftByUserId);

/**
 * @route PATCH /drafts/users/notes/save
 * @description Add a note to the Drafts folder.
 */
router.patch('/users/notes/save', draftController.addNoteToDraft);

// Export the router
module.exports = router;
