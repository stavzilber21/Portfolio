const mongoose = require('mongoose');
const shiftSchema = new mongoose.Schema(
  {
    date: Date,
    startingHour: String,
    endingHour: String
  },
  { versionKey: false }
);
const Shift = mongoose.model('shift',shiftSchema, 'shifts');
module.exports = Shift;