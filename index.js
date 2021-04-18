require('dotenv').config();
const userController = require('./controllers/userController');
const characterController = require('./controllers/characterController');

const express = require('express');
const db = require('./db');

db.sync();

const app = express();
app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/users', userController);
app.use('/characters', characterController);

app.listen(process.env.PORT, () => {
  console.log(`spinning on port ${process.env.PORT}`);
})
