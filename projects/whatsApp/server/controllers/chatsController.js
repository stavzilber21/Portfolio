const express = require('express');
const chatService = require('../services/chatService');

// Entry point: http://localhost:3000/chats

const router = express.Router();

//Get All Messages 
router.get('/', async (req, res) => {
  try {
    const chats = await chatService.getAllChats();
    res.send(chats);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;