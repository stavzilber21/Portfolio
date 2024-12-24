const userRep = require('../repositories/userRep');

const getAllUsers = async() => {
    const users =await userRep.getAllUsers();
    return users;
}

const getUserById = async (id)=>{
    return await userRep.getUserById(id);
  }

module.exports = {getAllUsers,getUserById };