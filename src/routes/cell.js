const express = require('express');
const { authJwt, common } = require("../middlewares");
const cellSchema = require('../models/cell');
const CellStatus = require('../models/cellStatus');

const router = express.Router();

// create cell
router.post('/cell', [authJwt.verifyToken, common.verifyKeyCell], (req, res) => {
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
    .populate("zone", "-__v")
    .populate("cellStatus", "-__v")
    .then((data) => res.json(data))
    .catch((error) => {
      console.log('error == ', error)
      res.json({
        message: error
      })
    });
});

//get all cells avaibles
router.get('/cell/available', [authJwt.verifyToken], (req, res) => {
  cellSchema
    .find()
    .populate("zone", "-__v")
    .populate("cellStatus", "-__v")
    .then((cells) => {
      const data = [];
      if (cells && cells.length > 0) {
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].cellStatus.available === 'S') {
            data.push(cells[i]);
          }
        }
      }
      res.json(data)
    })
    .catch((error) => {
      console.log('error == ', error)
      res.json({
        message: error
      })
    });
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
router.put('/cell/:id', [authJwt.verifyToken, common.verifyKeyCell], (req, res) => {
  const { id } = req.params;
  const { name, zone, cellStatus } = req.body;
  cellSchema
    .updateOne({ _id: id }, { $set: {name, zone, cellStatus} })
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
