// Importing necessary modules
var chatbotController = require("../controllers/chatbotController");

// Creating a router instance
let chatbotRouter = require("express").Router();

/**
 * @route POST /chat/chatbot
 * @description Perform chat completion using ChatGPT.
 */
chatbotRouter.post("/chatbot", chatbotController.chatCompletion);

// Export router
module.exports = chatbotRouter;
