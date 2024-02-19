var express = require("express");
var router = express.Router();
const draftController = require("../controllers/draftController");

// Draft routes

/**
 * @route GET /drafts/users/:user_id
 * @description Get drafts by user ID.
 */
router.get("/users/:user_id/", draftController.getDraftByUserId);

/**
 * @route PATCH /drafts/users/notes/save
 * @description Add a note to the draft.
 */
router.patch('/users/notes/save', draftController.addNoteToDraft);

// Export the router
module.exports = router;
