const Chat = require('../models/chatModel');

// Get All
const getAllChats = () => {
    return Chat.find();
  };

  //Get chat by id
const getChatById =async (id)=>{
  return await Chat.findOne({"chatId": id});
}

const addNewMessageToChat = async (msg)=>{
  console.log("stav");
  const chat = await Chat.findOneAndUpdate(
    { chatId: msg.chatId }, 
    {
      $push: { messages: newMessage }, //Add a new message
      $inc: { [`unreadMessages.${msg.recipient}`]: 1 },
    },
    { new: true }
  );
  console.log("addMsg");
  

  if (chat) {
    console.log("Message saved and unread count updated:", newMessage);
    return chat
  } else {
    console.error("Chat not found for chatId:", msg.chatId);
    return null;
  }
}

module.exports = {getAllChats,getChatById,addNewMessageToChat};