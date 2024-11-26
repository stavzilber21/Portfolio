const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema(
  {
    time: Date,
    content: String,
    sender: String,
    receiver: [String]
  },
  { versionKey: false }
);
const Message = mongoose.model('message',messageSchema, 'messages');
module.exports = Message;