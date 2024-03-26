const express = require('express')
const shiftsService = require('../service/shiftsService')

const router = express.Router()

router.get("/", async (req,res) => {
  try {
     const token = req.headers['x-access-token']
      const result = await shiftsService.getShifts(token);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})

router.get("/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const result = await shiftsService.getShiftsByEmployeesId(id);
        return res.send(result);
      } catch (error) {
        return res.send(error);
      }
})

// Update a shift
router.put('/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const obj = req.body;
    const result = await shiftsService.updateShift(id,obj);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});

// Add a new shift
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await shiftsService.addShift(obj);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router