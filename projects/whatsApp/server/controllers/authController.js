const authService = require("../service/authService")
const express = require("express")
const router = express.Router()

// http://localhost:8000/auth/login
router.post('/login', async (req, res) => {
  const { email,password } = req.body; // Assuming email and password are sent in the request body
  const result = await authService.login(email,password);
  res.send(result);
});

router.post('/register', async (req, res) => {
  const { name,email,password,phone } = req.body;
  const result = await authService.login(name,email,password,phone);
  res.send(result);
});

module.exports = router