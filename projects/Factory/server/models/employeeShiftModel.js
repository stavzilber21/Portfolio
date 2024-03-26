const mongoose = require('mongoose');
const employeeShiftSchema = new mongoose.Schema(
  {
    employeeID: String,
    shifts: [String]
  },
  { versionKey: false }
);
const eShift = mongoose.model('eShift',employeeShiftSchema, 'employeeShift');
module.exports = eShift;