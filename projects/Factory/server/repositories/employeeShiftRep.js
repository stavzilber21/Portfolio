const eShift =  require('../models/employeeShiftModel');

// Get All
const getAllEmployeesAndShifts = () => {
  return eShift.find();
};

//get the shifts of specific employee
const getShiftsById = async (employeeID) => {
    const emp = await eShift.findOne({"employeeID": employeeID});
    const shifts = emp.shifts;
    return shifts;
  };

const deleteEmployeeShifts = (employeeID) =>{
  return eShift.findOneAndDelete({"employeeID": employeeID});
}

const addShiftToEmployee = async (employeeID, shiftID) => {
  try {
      // Find the employee document by employeeID
      const emp = await eShift.findOne({ "employeeID": employeeID });
      if (emp) {
          // Add the new shiftID to the shifts array
          emp.shifts.push(shiftID);
          // Save the updated employee document
          await emp.save();
          
          return { 'response': 'added'};
      } else {
          
      }
      
  } catch (error) {
      console.error("Error adding shift to employee:", error);
  }
}

const addEmployeeAndShifts = (obj) => {
  const employee = new eShift(obj);
  return employee.save();
}

module.exports = {getShiftsById,deleteEmployeeShifts,addShiftToEmployee,addEmployeeAndShifts,getAllEmployeesAndShifts};