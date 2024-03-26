const departmentService = require("../service/departmentService")
const express = require("express")
const router = express.Router()

//subtract action
router.get("/", async (req,res) => {
    try {
        const token = req.headers['x-access-token']
        const result = await departmentService.getDepartments(token);
        return res.send(result);
      } catch (error) {
        return res.send(error);
      }
})

//Don't subtract action
router.get("/notAction", async (req,res) => {
  try {
      const token = req.headers['x-access-token']
      const result = await departmentService.getDepartments(token);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})

//get the department deailts by name
router.get("/:name", async (req,res) => {
  try {
    const { name } = req.params;
      const token = req.headers['x-access-token']
      const result = await departmentService.getdepartmentByName(token,name);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})

// Update a department
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await departmentService.updateDepartment(id,obj);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});

// Delete a department
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await departmentService.deleteDepartment(id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});

// Add a new department
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await departmentService.addDepartment(obj);
    return res.status(201).send(result);
  } catch (error) {
    return res.send(error);
  }
});

//change manager to null - if the employee change department
router.patch("/", async (req,res) =>{
  try {
    const { employeeID, departmentID } = req.body;
    const result = await departmentService.changeManagerNull(employeeID,departmentID);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
})

module.exports = router