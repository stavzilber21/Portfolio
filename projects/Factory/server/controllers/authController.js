const authService = require("../service/authService")
const express = require("express")
const router = express.Router()

// http://localhost:8000/auth/login
router.post('/login', async (req, res) => {
  const { username, email } = req.body; // Assuming username and email are sent in the request body
  const result = await authService.getUserByUsername(username, email);
  res.send(result);
});

module.exports = router