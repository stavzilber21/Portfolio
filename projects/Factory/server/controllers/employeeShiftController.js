const express = require('express')
const shiftsService = require('../service/shiftsService')

const router = express.Router()

//get the employees who are not on a specific shift
router.get("/:shiftID", async (req,res) => {
  try {
      const { shiftID } = req.params;
      const result = await shiftsService.filterEmloyeesNotInShift(shiftID);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})
// Add a new employee to employeeShifts
router.post('/', async (req, res) => {
    try {
      const obj = req.body;
      const result = await shiftsService.addEmployeeAndShifts(obj);
      return res.status(201).send(result);
    } catch (error) {
      return res.send(error);
    }
  });

//Add shift to employee  
router.patch("/", async (req,res) =>{
  try {
    const { employeeID, shiftID } = req.body;
    const result = await shiftsService.addShiftToEmployee(employeeID,shiftID);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
})


module.exports = router