const express = require('express');
const { authJwt } = require("../middlewares");
const cellStatusSchema = require('../models/cellStatus');

const router = express.Router();

// create cellStatus
router.post('/cellStatus', [authJwt.verifyToken], (req, res) => {
  const cellStatus = cellStatusSchema(req.body);
  cellStatus
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all cellStatuss
router.get('/cellStatus', [authJwt.verifyToken], (req, res) => {
  cellStatusSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one cellStatus
router.get('/cellStatus/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  cellStatusSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one cellStatus
router.put('/cellStatus/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, email, document } = req.body;
  cellStatusSchema
    .updateOne({ _id: id }, { $set: {name, email, document} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one cellStatus
router.delete('/cellStatus/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, email, document } = req.body;
  cellStatusSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
