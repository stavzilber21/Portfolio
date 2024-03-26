const employeeService = require("../service/employeeService")
const express = require("express")
const router = express.Router()


router.get("/", async (req,res) => {
    try {
       const token = req.headers['x-access-token']
        const result = await employeeService.getAllEmployees(token);
        return res.send(result);
      } catch (error) {
        return res.send(error);
      }
})

router.get("/nameEmployees", async (req,res) => {
  try {
     const token = req.headers['x-access-token']
      const result = await employeeService.getEmployees(token);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})

router.get("/employee/:id", async (req,res) => {
  try {
     const { id } = req.params;
      const result = await employeeService.getEmployeeById(id);
      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
})


router.get("/filterDep/:departmentID", async (req,res) => {
  try {
    const { departmentID } = req.params;
      const result = await employeeService.filterEmployeesByDepartment(departmentID);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})

router.get("/:department", async (req,res) => {
  try {
    const { department } = req.params;
      const result = await employeeService.getIdByNameDepartment(department);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
})

// Update a employee
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await employeeService.updateEmployee(id,obj);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});

// Update a department of employee
router.put('/:employeeID/changeDepartment', async (req, res) => {
  try {
    const employeeID = req.params.employeeID;
    const { departmentID } = req.body;
    const result = await employeeService.changeDepartmentOfEmployee(employeeID,departmentID);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});


// Delete a employee
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.deleteEmployee(id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await employeeService.addEmployee(obj);
    return res.status(201).send(result);
  } catch (error) {
    return res.send(error);
  }
});


module.exports = router