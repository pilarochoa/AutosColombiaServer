const express = require('express');
const { authJwt, common } = require("../middlewares");
const menuSchema = require('../models/menu');

const router = express.Router();

// create menu
router.post('/menu', [authJwt.verifyToken, common.verifyKeyMenu], (req, res) => {
  const menu = menuSchema(req.body);
  menu
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get all menus
router.get('/menu', [authJwt.verifyToken], (req, res) => {
  menuSchema
    .find()
    .populate("roles", "-__v")
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one menu
router.get('/menu/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  menuSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one menu
router.put('/menu/:id', [authJwt.verifyToken, common.verifyKeyMenu], (req, res) => {
  const { id } = req.params;
  const { name, roles, icon, key } = req.body;
  menuSchema
    .updateOne({ _id: id }, { $set: {name, roles, icon, key} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one menu
router.delete('/menu/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  menuSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
