const employeesRep = require('../repositories/employeeRep');
const departmentRep = require('../repositories/departmentRep');
const shiftRep = require('../repositories/shiftRep');
const employeeShiftRep = require('../repositories/employeeShiftRep');
const jwt = require("jsonwebtoken")


CheckTokenVerify = (token) => {
  return new Promise((resolve, reject) => {
      jwt.verify(token, "secret", (err, data) => {
          if (err) {
              console.log('Error verifying token:', err.message);
              resolve(false);
          } else {
              // console.log('Successfully verified the token!');
              resolve(true);
          }
      });
  });
};


const getAllEmployees = async (token) => {
  if (CheckTokenVerify(token)) {
    const employees = await employeesRep.getAllEmployees();
    const shiftsPromises = employees.map(async emp => {
        const shifts = await employeeShiftRep.getShiftsById(emp._id);
        const shiftDetailsPromises = shifts.map(shift => shiftRep.getDetailsById(shift));
        const shiftDetails = await Promise.all(shiftDetailsPromises);
        return { employeeId: emp._id, shifts: shiftDetails };
    });
    const departments = await departmentRep.getDepartments();
    const employeesWithShifts = await Promise.all(shiftsPromises);
    return { employees, employeesWithShifts, departments };
  }
  return {
        "access": false,
        "response": "Error, Token not verify!"
    }
};

const getEmployees =(token)=>{
  if (CheckTokenVerify(token)){
      return employeesRep.getAllEmployees();
  }
  return {
      'access': false,
      "response": 'Error, inValid token!'
  }
}


const getEmployeeById = async (id)=>{
    return await employeesRep.getEmployeeById(id);
  }

const getIdByNameDepartment = (name) => {
  return departmentRep.getIdByNameDepartment(name);
}

const filterEmployeesByDepartment = async(departmentID)=>{
  const employees = await employeesRep.getAllEmployees();
  const filter_emloyees = employees.filter(emp => emp.departmentID===departmentID);
  return filter_emloyees;
}
const updateEmployee = async(id, obj) => {
  const departmentID =await getIdByNameDepartment(obj.departmentID);
  obj.departmentID= departmentID;
  const result = await employeesRep.updateEmployee(id,obj);
  return { 'response': 'updated' }
  };

  const deleteEmployee = async(id) => {
    const employee =await getEmployeeById(id);
    const departments = await departmentRep.getDepartments();
    const department = departments.find(dep => dep._id.toString() === employee.departmentID);
    //if this employee manager his department
    if(department.manager===id){
      //change the manager to null
      const man_null = await departmentRep.changeManagerNull(department);
    }
    // delete the shifts of this employee
    const answer = await employeeShiftRep.deleteEmployeeShifts(id); 
    //delete the employee from employees colletion
    const result = await employeesRep.deleteEmployee(id);
    return { 'response': 'deleted' }
  };

  const addEmployee = (obj) => {
    return employeesRep.addEmployee(obj);
  };

  const changeDepartmentOfEmployee = async(employeeID,departmentID)=>{
    return employeesRep.changeDepartmentOfEmployee(employeeID,departmentID);
  }

  module.exports = {getAllEmployees,updateEmployee,getIdByNameDepartment,deleteEmployee,addEmployee,changeDepartmentOfEmployee,getEmployeeById,filterEmployeesByDepartment,getEmployees };