const express = require('express');
const { authJwt } = require("../middlewares");
const typeVehicleSchema = require('../models/typeVehicle');

const router = express.Router();

// create typeVehicle
router.post('/typeVehicle', [authJwt.verifyToken], (req, res) => {
  const typeVehicle = typeVehicleSchema(req.body);
  typeVehicle
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all typeVehicles
router.get('/typeVehicle', [authJwt.verifyToken], (req, res) => {
  typeVehicleSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one typeVehicle
router.get('/typeVehicle/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  typeVehicleSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one typeVehicle
router.put('/typeVehicle/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, tafifaMes, tafifaDia } = req.body;
  typeVehicleSchema
    .updateOne({ _id: id }, { $set: {name, tafifaMes, tafifaDia} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one typeVehicle
router.delete('/typeVehicle/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  typeVehicleSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
