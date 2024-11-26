const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    contacts: [String]  
  },
  { versionKey: false }
);
const User = mongoose.model('user',userSchema, 'users');
module.exports = User;