const Employee = require('../models/employeeModel');

// Get All
const getAllEmployees = () => {
    return Employee.find();
  };

const getEmployeeById = (id)=>{
   return Employee.findById(id);
}

// Update
const updateEmployee =(id, obj) => {
    return Employee.findByIdAndUpdate(id, obj);
};

// Delete
const deleteEmployee = (id) => {
  return Employee.findByIdAndDelete(id);
};

// Create
const addEmployee = async (obj) => {
  const employee = new Employee(obj);
  await employee.save();
  return {'employeeID' : employee._id}; 
}

const changeDepartmentOfEmployee = (employeeID,departmentID)=>{
  return Employee.findByIdAndUpdate(employeeID, { departmentID });
}


module.exports = {getAllEmployees,updateEmployee,deleteEmployee,addEmployee,changeDepartmentOfEmployee,getEmployeeById};