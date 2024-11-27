const User = require('../models/userModel');

// Add new User
const addUser = (obj) => {
  const user = new User(obj);
  return user.save();
};

// Get All
const getAllUsers = () => {
    return User.find();
  };

  //For the register
const getUserByPhone=async(phone)=>{
  return await User.findOne({"phone": phone});
}

//For the login
const getUserByEmail=async(email)=>{
  return await User.findOne({"email": email});
}

  module.exports = {getUserByEmail,getAllUsers,getUserByPhone,addUser};