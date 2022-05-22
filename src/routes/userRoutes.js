const express = require('express');
const { verifySignUp, authJwt } = require("../middlewares");
const bcrypt = require("bcryptjs");
const userSchema = require('../models/user');

const router = express.Router();

// create user
router.post('/users', [authJwt.verifyToken], [
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkRolesExisted
], (req, res) => {
  const user = new userSchema({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({
      message: error
    }));
});

//get all users
router.get('/users', [authJwt.verifyToken], (req, res) => {
  userSchema
    .find()
    .populate("rol", "-__v")
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//get one user
router.get('/users/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//update one user
router.put('/users/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  const { name, typeDocument, document, phone, email, rol } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: {name, typeDocument, document, phone, email, rol} })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

//delete one user
router.delete('/users/:id', [authJwt.verifyToken], (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({
      message: error
    }));
});

module.exports = router;
