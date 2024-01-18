var express = require("express");
var chatbotController = require("../controllers/chatbotController");

const router = express.Router();

/**
 * @route POST /chatbot/chatgpt
 * @description Perform chat completion using the ChatGPT controller.
 */
router.post("/chatgpt", chatbotController.chatCompletion);

// Export the router
module.exports = router;
