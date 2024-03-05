require("dotenv").config();
const express = require("express");

// Middleware for handling chat message completions using the OpenAI API.
const chatCompletion = async (req, res)=>{
  try {
    const { message } = req.body;
    
    const messages = [
      { role: "user", content: message }, 
      { role: "assistant", content: "" }, 
    ];

    try {
      const { Configuration, OpenAIApi } = require("openai");

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const close = () => {
        res.end();
      };
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Encoding": "none",
      });
      const completion = await openai.createChatCompletion(
        {
          model: "gpt-3.5-turbo",
          messages: messages, 
          temperature: 0.2,
          stream: true,
        },
        {
          responseType: "stream",
        }
      );

      completion.data.on("data", (data) => {
        const lines = data
          .toString()
          .split("\n")
          .filter((line) => line.trim() !== "");

        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
            res.end();
          }
          try {
            const parsed = JSON.parse(message);
            const content = parsed.choices[0].delta.content;

            if (!content) {
              continue;
            }
            res.write(`data: ${content}`);
          } catch (error) {
            return next(error);
          }
        }
      });
      completion.data.on("close", close);

      res.on("close", close);
    } catch (error) {
      return next(error);
    }
  } catch (error) { 
    return next(error);
  }
};

exports.chatCompletion = chatCompletion;