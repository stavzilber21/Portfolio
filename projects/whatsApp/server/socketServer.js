const { Server } = require("socket.io");
const chatRep = require('./repositories/chatRep');
const dayjs = require('dayjs');


function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("sendMessage", async (msg) => {
        try {
          // create the new message
          const newMessage = {
            messageId: msg.messageId,
            content: msg.content,
            sender: msg.sender,
            timestamp: dayjs().toISOString(),
            readBy: [msg.sender], 
          };
          //Update in the DB
          const updatedChat = await chatRep.addNewMessageToChat(newMessage,msg.chatId);
          
          // Sending the message to all customers
          if (updatedChat) {
             io.emit('receiveMessage', newMessage);
          }

        } catch (error) {
          console.error("Failed to save message:", error);
        }
      });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = {
  initializeSocket,
};
