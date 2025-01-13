const Chat = require('../models/chatModel');

// Get All
const getAllChats = () => {
    return Chat.find();
  };

  //Get chat by id
const getChatById =async (id)=>{
  return await Chat.findOne({"chatId": id});
}

const addNewMessageToChat = async (msg,id )=>{
  const chat = await Chat.findOneAndUpdate(
    { chatId: id }, 
    {
      $push: { messages: msg }, //Add a new message
      // $inc: !{ [`unreadMessages.${msg.sender}`]: 1 },
    },
    { new: true }
  );

  if (chat) {
    console.log("Message saved and unread count updated:", msg);
    return chat
  } else {
    console.error("Chat not found for chatId:", msg.chatId);
    return null;
  }
}

module.exports = {getAllChats,getChatById,addNewMessageToChat};