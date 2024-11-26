const userRep = require('../repositories/userRep');

const getAllUsers = async() => {
    const users =await userRep.getAllUsers();
    return users;
}

module.exports = {getAllUsers };