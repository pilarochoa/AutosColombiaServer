const express = require('express');
const { authJwt } = require("../middlewares");
const registerSchema = require('../models/register');
const Cell = require('../models/cell');
const CellStatus = require('../models/cellStatus');

const router = express.Router();

// create register
router.post('/register', [authJwt.verifyToken], (req, res) => {
  const register = registerSchema(req.body);
  register
    .save()
    .then((data) => {
      if (data) {
        CellStatus
          .findOne({
            available: 'N'
          })
          .then((cellStatus) => {
            if (cellStatus) {
              Cell
              .updateOne({ _id: data.cell.toString() }, { $set: {cellStatus: cellStatus._id.toString()} })
              .catch((error) => {
                res.json({
                  message: error
                })
              });
            }
            res.json(data);
          })
          .catch((error) => {
            res.json({
              message: error
            })
          });
      }
    })
    .catch((error) => res.json({
      message: error
    }));
});

//get all registers
router.get('/register', [authJwt.verifyToken], (req, res) => {
  registerSchema
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
