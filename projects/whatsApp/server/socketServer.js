const { Server } = require("socket.io");
const chatRep = require('./repositories/chatRep');

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("sendMessage", async (msg) => {
        console.log("1");
        try {
          // create the new message
          const newMessage = {
            messageId: msg.messageId,
            content: msg.content,
            sender: msg.sender,
            timestamp: new Date().toISOString(),
            readBy: [msg.sender], 
          };
          console.log("2");
          //Update in the DB
          const updatedChat = await chatRep.addNewMessageToChat(newMessage);

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
