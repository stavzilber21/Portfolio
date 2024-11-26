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
const getUserByEmailAndPassword=async(email,password)=>{
  return await User.findOne({"email": email,"password": password});
}

  module.exports = {getUserByEmailAndPassword,getAllUsers,getUserByPhone,addUser};