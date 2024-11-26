const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const authController = require('./controllers/authController');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use('/', authController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
})