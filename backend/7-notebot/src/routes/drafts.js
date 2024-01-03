var express = require("express");
var router = express.Router();

const draftController = require("../controllers/draftController");

router.get("/users/:user_id/all", draftController.getDraftByUserId);

router.patch('/users/:user_id/notes/:note_id/save', draftController.addNoteToDraft);

router.patch('/notes/:note_id', draftController.updateDraft);

module.exports = router;

