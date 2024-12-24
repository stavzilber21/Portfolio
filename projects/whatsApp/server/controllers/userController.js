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

router.get("/:id", async (req,res) => {
  try {
     const { id } = req.params;
      const result = await userService.getUserById(id);
      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
})


module.exports = router;