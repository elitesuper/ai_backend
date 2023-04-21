
const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const { generatePrompt } = require('../services/caption.service.js');

// const { body, validationResult } = require('express-validator');


function generateError(message, location, param) {
  return {
    location: location || "n/a",
    msg: message,
    param: param || "n/a",
  };
}


router.post('/generate',
  //TODO
  // body("languageInputId").isNumeric().notEmpty().withMessage("Language field cannot be empty."),
  // body("platformInputId").isNumeric().notEmpty().withMessage("Platform cannot be empty."),
  // body("topicInput").notEmpty().withMessage("Topic cannot be empty."),
  // body("variantInputId").isNumeric().notEmpty().withMessage("Variant cannot be empty."),
  // body("toneInputId").isNumeric().notEmpty().withMessage("Tone cannot be empty."),

  async (req, res) => {
    
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({
        errors: [generateError("OpenAI API key not configured")]
      });
      return;
    }

    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const requestForm = req.body;
    console.log(requestForm);

    const templatePrompt = generatePrompt(requestForm);
    console.log(templatePrompt);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: templatePrompt,
        max_tokens: 3000,
        temperature: 0.6,
      });

      console.log(completion.data.choices[0].text);

      res.status(200).json({ result: completion.data.choices[0].text.trim() });
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json({ errors: generateError(error.response.data) });
      } else {

        console.error(`Error with OpenAI API request: ${error.message}`);

        res.status(500).json({
          errors: [generateError('An error occurred during your request.')]
        });
      }
    }

  });




module.exports = router;