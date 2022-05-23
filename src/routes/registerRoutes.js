const express = require('express');
const { authJwt } = require("../middlewares");
const registerSchema = require('../models/register');

const router = express.Router();

// create register
router.post('/register', [authJwt.verifyToken], (req, res) => {
  const register = registerSchema(req.body);
  register
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all registers
router.get('/register', [authJwt.verifyToken], (req, res) => {
  registerSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one register
router.get('/register/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  registerSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one register
router.put('/register/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { placa, typeVehicle, userEnter, userRemove, cell, customer, dateInicio, dateEnd } = req.body;
  registerSchema
    .updateOne({ _id: id }, { $set: {placa, typeVehicle, userEnter, userRemove, cell, customer, dateInicio, dateEnd} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one register
router.delete('/register/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  registerSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
