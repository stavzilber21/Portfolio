const chatRep = require('../repositories/chatRep');
const userService = require('../services/userService');

const getAllChats = async() => {
    const chats = await chatRep.getAllChats();
    return chats;
}

const getChatById = async (id)=>{
    return await chatRep.getChatById(id);
  }

const getChatAndParticipants = async(chatId)=>{
    const chat = await getChatById(chatId);
    const participants = chat.participants;
    const users = await userService.getAllUsers();
    const usersFilter = users.filter(user=>participants.includes(user.phone));
    
    return usersFilter;
}


module.exports = {getAllChats,getChatById,getChatAndParticipants};