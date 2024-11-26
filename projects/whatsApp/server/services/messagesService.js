const messagesRep = require('../repositories/messagesRep');

const getAllMessages = async() => {
    const messages =await messagesRep.getAllMessages();

    return messages;
}

module.exports = {getAllMessages };