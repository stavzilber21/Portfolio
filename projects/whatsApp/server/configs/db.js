const mongoose = require('mongoose');

const connectDB = () => {
  // Connect to MongoDB database
  mongoose
    .connect('mongodb://127.0.0.1:27017/whatsApp')
    .then(() => console.log('Connected to whatsApp'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;