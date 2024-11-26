const express = require('express');
const userService = require('../services/userService');

// Entry point: http://localhost:3000/user

const router = express.Router();

//Get All Users 
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;