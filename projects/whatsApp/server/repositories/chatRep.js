const Chat = require('../models/chatModel');

// Get All
const getAllChats = () => {
    return Chat.find();
  };

module.exports = {getAllChats};