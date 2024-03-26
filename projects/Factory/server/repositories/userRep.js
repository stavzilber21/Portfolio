const User = require('../models/userModel');

// Get All
const getAllUsers = () => {
    return User.find();
  };

const getUserByFullName=async(fullname)=>{
  return await User.findOne({"fullname": fullname});
}

  // This function returns the maximum actions count for the user
const getMaxActionsForUser =async (fullname) => {
  return await User.findOne({"fullname": fullname}).numOfAction;
};



  module.exports = {getAllUsers,getUserByFullName,getMaxActionsForUser};