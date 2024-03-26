const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema(
  {
    name: String,
    manager: String
  },
  { versionKey: false }
);
const Department = mongoose.model('department',departmentSchema, 'departments');
module.exports = Department;