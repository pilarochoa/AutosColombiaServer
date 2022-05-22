const express = require('express');
const { authJwt } = require("../middlewares");
const cellSchema = require('../models/cell');

const router = express.Router();

// create cell
router.post('/cell', [authJwt.verifyToken], (req, res) => {
  const cell = cellSchema(req.body);
  cell
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all cells
router.get('/cell', [authJwt.verifyToken], (req, res) => {
  cellSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one cell
router.get('/cell/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  cellSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one cell
router.put('/cell/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, email, document } = req.body;
  cellSchema
    .updateOne({ _id: id }, { $set: {name, email, document} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one cell
router.delete('/cell/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  cellSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
