// Importing necessary modules
var chatbotController = require("../controllers/chatbotController");

// Creating a router instance
let chatbotRouter = require("express").Router();

/**
 * @route POST /chat/chatbot
 * @description Handle chat message completions using the OpenAI API.
 */
chatbotRouter.post("/chatbot", chatbotController.chatCompletion);

// Export router
module.exports = chatbotRouter;
