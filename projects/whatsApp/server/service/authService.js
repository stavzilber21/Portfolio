const usersRep = require('../repositories/userRep');

const jwt = require("jsonwebtoken")

//The login function
  const login = async (email,password) => {
    // find the User in the DB
    const { data: user } = usersRep.getUserByEmailAndPassword(email,password)
    console.log(user);
    console.log(user[0]);

    if (!user) return { success: false, message: "User not found" };

    if (user.email !== email) return { success: false, message: "Wrong email" };
    if (user.password !== password) return { success: false, message: "Wrong password" };

    return { success: true, message: "Login successful"};
};


const register = async (name,email,password,phone) => {
  const { data: user } = usersRep.getUserByPhone(phone)
  if(user){
    return { success: false, message: "The user already exists in the system." };
  }
  const newUser = {
    name: name,
    email: email,
    password: password,
    phone: phone
  }
  usersRep.addUser(newUser);
  const token = jwt.sign({name}, "secret");
  return { success: true, message: "Register successful",token};
};






module.exports = {login,register};