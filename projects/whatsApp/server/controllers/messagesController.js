const express = require('express');
const messagesService = require('../services/messagesService');

// Entry point: http://localhost:3000/messages

const router = express.Router();

//Get All Messages 
router.get('/', async (req, res) => {
  try {
    const messages = await messagesService.getAllMessages();
    
    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;