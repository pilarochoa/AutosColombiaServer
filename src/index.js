const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/auth.routes');
const menuRoutes = require('./routes/menuRoutes');
const cellRoutes = require('./routes/cell');
const cellStatusRoutes = require('./routes/cellStatusRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
const customerRoutes = require('./routes/customerRoutes');
const typeVehicleRoutes = require('./routes/typeVehicleRoutes');
const registerRoutes = require('./routes/registerRoutes');

const app = express();

//middleware
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', authRoutes);
app.use('/api', menuRoutes);
app.use('/api', cellRoutes);
app.use('/api', cellStatusRoutes);
app.use('/api', zoneRoutes);
app.use('/api', customerRoutes);
app.use('/api', typeVehicleRoutes);
app.use('/api', registerRoutes);

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