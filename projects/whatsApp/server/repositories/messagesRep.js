const Message = require('../models/messageModel');

// Get All
const getAllMessages = () => {
    return Message.find();
  };

  module.exports = {getAllMessages}