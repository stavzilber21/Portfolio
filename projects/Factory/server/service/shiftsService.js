const shiftRep = require('../repositories/shiftRep');
const employeeShiftRep = require('../repositories/employeeShiftRep');
const Shift = require('../models/shiftModel');
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

const getShiftsByEmployeesId = async (id) => {
    const shifts = await employeeShiftRep.getShiftsById(id);
    const allShifts = await shiftRep.getShifts();

    const hisShifts = allShifts.filter(sh => shifts.includes(sh._id));
    const hisNotShifts = allShifts.filter(sh => !shifts.includes(sh._id));
    return {hisShifts,hisNotShifts}
}

//In edit employee page
const addShiftToEmployee = (employeeID, shiftID) =>{
    return employeeShiftRep.addShiftToEmployee(employeeID,shiftID);
}

//when we Added a new employee
const addEmployeeAndShifts = (obj) => {
    return employeeShiftRep.addEmployeeAndShifts(obj);
}

const addShift = (obj) => {
    return shiftRep.addShift(obj);
  };

  const getShifts =(token)=>{
    if (CheckTokenVerify(token)) {
      return shiftRep.getShifts();
    }
    return {
      "access": false,
      "response": "Error, Token not verify!"
    }
  }

  const updateShift = async(id, obj) => {
    const result = await shiftRep.updateShift(id,obj);
    return { 'response': 'updated' }
    };

//get the employees who are not on a specific shift
  const filterEmloyeesNotInShift =async(shiftID)=>{
    const empAndShifts =await employeeShiftRep.getAllEmployeesAndShifts();
    const filter_emp= empAndShifts.filter(emp => !emp.shifts.includes(shiftID));
    return filter_emp;
  }
  


module.exports = { getShiftsByEmployeesId ,addShiftToEmployee,addEmployeeAndShifts,addShift,getShifts,updateShift,filterEmloyeesNotInShift}