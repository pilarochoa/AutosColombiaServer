const express = require('express');
const roleSchema = require('../models/role');

const router = express.Router();

// create role
router.post('/role', (req, res) => {
  const role = roleSchema(req.body);
  role
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all roles
router.get('/role', (req, res) => {
  roleSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one role
router.get('/role/:id', (req, res) => {
  const { id } = req.params;
  roleSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one role
router.put('/role/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  roleSchema
    .updateOne({ _id: id }, { $set: {name} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one role
router.delete('/role/:id', (req, res) => {
  const { id } = req.params;
  roleSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
