const userService = require("../service/userService")
const express = require("express")
const router = express.Router()

router.get("/", async (req,res) => {
    try {
        const numAction = req.numAction;
        const name = req.name;
        const token = req.headers['x-access-token']
        const result = await userService.getAllUsers(token);
        res.send({users: result, numAction: numAction, name: name});
      } catch (error) {
        res.send(error);
      }
})
module.exports = router