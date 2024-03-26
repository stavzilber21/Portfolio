const departmentRep = require('../repositories/departmentRep');
const employeeService = require("../service/employeeService");
const employeesRep = require('../repositories/employeeRep');
const jwt = require("jsonwebtoken")


CheckTokenVerify = (token) => {
  return new Promise((resolve, reject) => {
      jwt.verify(token, "secret", (err, data) => {
          if (err) {
              console.log('Error verifying token:', err.message);
              resolve(false);
          } else {
            //   console.log('Successfully verified the token!');
              resolve(true);
          }
      });
  });
};
const getDepartments = (token)=>{
    if (CheckTokenVerify(token)){
        return departmentRep.getDepartments();
    }
    return {
        'access': false,
        "response": 'Error, inValid token!'
    }
   
}
const getdepartmentByName = (token,name) =>{
    if (CheckTokenVerify(token)){
        return departmentRep.getdepartmentByName(name);
    }
    return {
        'access': false,
        "response": 'Error, inValid token!'
    }
    
}
const updateDepartment = async(id, obj) => {
    const result = await departmentRep.updateDepartment(id,obj);
    return { 'response': 'updated' }
    };

const deleteDepartment = async (id)=>{
    const employees = await employeesRep.getAllEmployees(); 
    const employeesToDelete = employees.filter(emp => emp.departmentID === id);
    // Iterate over each employee to delete
    for (const employee of employeesToDelete) {
        await employeeService.deleteEmployee(employee._id);
    }
    // Once all employees are deleted, delete the department
    const result = await departmentRep.deleteDepartment(id);
    return { 'response': 'deleted' };
}

const addDepartment = (obj) => {
    return departmentRep.addDepartment(obj);
  };

//when employee change department -change the manager of the old department is null
const changeManagerNull=async (employeeID,departmentID)=>{
    const departments = await departmentRep.getDepartments();
    const department = departments.find(dep => dep._id.toString() === departmentID);
    if(department.manager===employeeID){
        const man_null = await departmentRep.changeManagerNull(department);
        return { 'response': 'deleted' };
    }
    return { 'response': '--' };
}

    

module.exports = { getDepartments,getdepartmentByName,updateDepartment,deleteDepartment,addDepartment,changeManagerNull}