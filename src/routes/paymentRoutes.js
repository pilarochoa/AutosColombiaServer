const express = require('express');
const { authJwt } = require("../middlewares");
const paymentSchema = require('../models/payment');
const Cell = require('../models/cell');
const CellStatus = require('../models/cellStatus');

const router = express.Router();

// create payment
router.post('/payment', [authJwt.verifyToken], (req, res) => {
  const payment = paymentSchema(req.body);
  payment
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all payments
router.get('/payment', [authJwt.verifyToken], (req, res) => {
  paymentSchema
    .find()
    .populate("typeVehicle", "-__v")
    .populate("userEnter", "-__v")
    .populate("userRemove", "-__v")
    .populate("cell", "-__v")
    .populate("customer", "-__v")
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one payment
router.get('/payment/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  paymentSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one payment
router.put('/payment/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { placa, datePayment, price, autor } = req.body;
  paymentSchema
    .updateOne({ _id: id }, { $set: {placa, datePayment, price, autor} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one payment
router.delete('/payment/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  paymentSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
