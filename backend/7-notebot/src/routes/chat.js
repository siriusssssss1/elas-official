var express = require("express");
var chatbotController = require( "../controllers/chatbotController");

const router = express.Router();

router.post("/chatgpt", chatbotController);

//export the router
module.exports = router;