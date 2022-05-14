const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')

const app = express();

//middleware
app.user(express.json());
app.use('/api', userRoutes);

//mongo db conection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.log('error conected MongoDB Atlas ', error));


//routes
app.get('/', (req, res) => {
  res.send("Welcome to my API!");
})

const port = process.env.PORT || 9000;
app.listen(port, () => console.log('Server listening on port', port));