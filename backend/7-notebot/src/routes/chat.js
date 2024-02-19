var express = require("express");
var router = express.Router();
var chatbotController = require("../controllers/chatbotController");

/**
 * @route POST /chat/chatbot
 * @description Perform chat completion using ChatGPT.
 */
router.post("/chatbot", chatbotController.chatCompletion);

// Export the router
module.exports = router;
