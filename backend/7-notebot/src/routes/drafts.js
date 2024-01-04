var express = require("express");
var router = express.Router();

const draftController = require("../controllers/draftController");

router.get("/users/:user_id/", draftController.getDraftByUserId);

router.patch('/users/notes/save', draftController.addNoteToDraft);

router.patch('/notes/:note_id', draftController.updateDraft);

module.exports = router;

