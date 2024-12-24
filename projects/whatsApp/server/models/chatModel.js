const mongoose = require('mongoose');

// סכמה של הודעה
const messageSchema = new mongoose.Schema(
  {
    messageId: { type: String, required: true }, // מזהה ייחודי להודעה
    content: { type: String, required: true }, // תוכן ההודעה
    sender: { type: String, required: true }, // מספר טלפון של השולח
    timestamp: { type: Date, default: Date.now }, // מועד שליחת ההודעה
    readBy: { type: [String], default: [] } // רשימת מספרי טלפון של משתמשים שצפו בהודעה
  },
  { _id: false } // ביטול יצירת מזהה ייחודי פנימי עבור כל הודעה
);

// סכמה של צ'אט
const chatSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true, unique: true }, // מזהה ייחודי לצ'אט
    type: { type: String, enum: ['private', 'group'], required: true }, // סוג הצ'אט (פרטי או קבוצתי)
    name: { type: String }, // שם הצ'אט (רק עבור קבוצות)
    participants: { type: [String], required: true }, // רשימת המשתתפים בצ'אט
    unreadMessages: { 
      type: Map, 
      of: Number, 
      default: {} 
    }, // מספר ההודעות שלא נקראו לכל משתתף
    messages: { type: [messageSchema], default: [] } // מערך של הודעות
  },
  { versionKey: false, timestamps: true } // הוספת createdAt ו-updatedAt אוטומטיים
);

// יצירת המודל של צ'אט
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
