const usersRep = require('../repositories/userRep');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
    const user = await usersRep.getUserByEmail(email);
    
    if (!user) return { success: false, message: "The user does not exist in the system." };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { success: false, message: "Invalid email or password" };

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
    
    return { success: true, message: "Login successful", token, user };
};

const register = async (name, email, password, phone) => {
    const existingUser = await usersRep.getUserByPhone(phone);
    if (existingUser) return { success: false, message: "The user already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, phone };
    await usersRep.addUser(newUser);

    return { success: true, message: "Register successful"};
};



module.exports = {login,register};