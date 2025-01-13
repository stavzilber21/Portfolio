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

//Get chat by id
router.get("/:id", async (req,res) => {
  try {
     const { id } = req.params;
      const result = await chatService.getChatById(id);
      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
})

//Get the participants by chatId
router.get("/chat/:id", async (req,res) => {
  try {
     const { id } = req.params;
      const result = await chatService.getChatAndParticipants(id);
      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
})


module.exports = router;