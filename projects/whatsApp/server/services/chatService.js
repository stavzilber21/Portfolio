const chatRep = require('../repositories/chatRep');

const getAllChats = async() => {
    const chats = await chatRep.getAllChats();
    return chats;
}

module.exports = {getAllChats};