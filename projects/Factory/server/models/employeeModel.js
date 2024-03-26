const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: String
  },
  { versionKey: false }
);
const Employee = mongoose.model('employee',employeeSchema, 'employees');
module.exports = Employee;