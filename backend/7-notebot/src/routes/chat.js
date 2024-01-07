var express = require("express");
var chatController = require( "../controllers/chatController");

const router = express.Router();

router.post("/chatgpt", chatController.chatCompletion);

//export the router
module.exports = router;