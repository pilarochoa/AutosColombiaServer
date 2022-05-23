const express = require('express');
const { authJwt } = require("../middlewares");
const customerSchema = require('../models/customer');

const router = express.Router();

// create customer
router.post('/customer', [authJwt.verifyToken], (req, res) => {
  const customer = customerSchema(req.body);
  customer
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all customers
router.get('/customer', [authJwt.verifyToken], (req, res) => {
  customerSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one customer
router.get('/customer/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  customerSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one customer
router.put('/customer/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, typeDocument, document, phone, email } = req.body;
  customerSchema
    .updateOne({ _id: id }, { $set: {name, typeDocument, document, phone, email} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one customer
router.delete('/customer/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  customerSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
