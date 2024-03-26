// const session = require('express-session');
const usersRep = require('../repositories/userRep');
const usersWS = require('../repositories/usersWS')
const jwt = require("jsonwebtoken")
const jsonfile = require('jsonfile');
const NodeCache = require("node-cache");
// const cache = new NodeCache({ stdTTL: 3600 }); // Cache with 1-hour expiration
const cache = new NodeCache({ stdTTL: 300 }); // 300 seconds = 5 minutes


CheckTokenVerify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "secret", (err, data) => {
            if (err) {
                console.log('Error verifying token:', err.message);
                resolve(false);
            } else {
                // console.log('Successfully verified the token!');
                resolve(true);
            }
        });
    });
  };

  
const getAllUsers = (token) => {
    if (CheckTokenVerify(token)) {
        return usersRep.getAllUsers();
    }
    return {
      'access': false,
      "response": 'Error, inValid token!'
    }
  } 


  const checkRemainingActions = async (userId) => {
    // Get the name of the user from the WS
    const { data } = await usersWS.getUserById(+userId);
    // Retrieve the maximum actions count for the user from the cache or MongoDB
    let remainingActions = cache.get(data.name);
    //if this is the first action today
    if (remainingActions === undefined) {
        const userDB = await usersRep.getUserByFullName(data.name);
        remainingActions = userDB.numOfAction;
    } 

    remainingActions--;
    
    cache.set(data.name, remainingActions);
    
    const fullname = data.name;

    // Check if remaining actions count is non-negative
    if (remainingActions < 0) {
        return { allowed: false, message: "You have reached your maximum actions limit for today. Please try again tomorrow." };
    } else {
        return { allowed: true, userId, remainingActions, fullname };
    }
};


const addActionToUserInJson = async (id, remainingActions) => {
    const {data} = await usersWS.getUserById(+id);
    const userDB = await usersRep.getUserByFullName(data.name);
    const maxActions = await userDB.numOfAction;
    const date = new Date().toLocaleDateString();

    const newData = {
        id: +id,
        maxActions: maxActions,
        date: date,
        actionsAllowed: remainingActions
    };
    // Define the path to the JSON file
    const filePath = '../data/actions.json';
    try {
        // Read existing data from the file
        let existingData = [];
        try {
            existingData = await jsonfile.readFile(filePath);
        } catch (error) {
            // If the file doesn't exist or is empty, ignore the error
            // and continue with an empty array
        }
        // Append new data to the existing data
        existingData["actions"].push(newData);
        // Write the updated data back to the file
        await jsonfile.writeFile(filePath, existingData);
        console.log('Data has been added to actions.json successfully.');
    } catch (error) {
        console.error('Error adding data to actions.json:', error);
    }
  };

  module.exports = {getAllUsers ,checkRemainingActions ,addActionToUserInJson };