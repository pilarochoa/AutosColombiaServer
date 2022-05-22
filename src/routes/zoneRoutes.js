const express = require('express');
const { authJwt } = require("../middlewares");
const zoneSchema = require('../models/zone');

const router = express.Router();

// create zone
router.post('/zone', [authJwt.verifyToken], (req, res) => {
  const zone = zoneSchema(req.body);
  zone
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all zones
router.get('/zone', [authJwt.verifyToken], (req, res) => {
  zoneSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one zone
router.get('/zone/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  zoneSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one zone
router.put('/zone/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, email, document } = req.body;
  zoneSchema
    .updateOne({ _id: id }, { $set: {name, email, document} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one zone
router.delete('/zone/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  zoneSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
