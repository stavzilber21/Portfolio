const Chat = require('../models/chatModel');

// Get All
const getAllChats = () => {
    return Chat.find();
  };

  //Get chat by id
const getChatById =async (id)=>{
  return await Chat.findOne({"chatId": id});
}

module.exports = {getAllChats,getChatById};