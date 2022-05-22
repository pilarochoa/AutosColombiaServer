const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require('../models/user');

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .populate("rol", "-__v")
  .then((dataUser) => {
    if (!dataUser || !req.body.password) {
      return res.status(404).json({ message: "Correo electrónico o contraseña invalida." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      dataUser.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Correo electrónico o contraseña invalida!"
      });
    }
    const token = jwt.sign({ id: dataUser._id }, config.secret, {
      expiresIn: 86400 // 24 hours
      // expiresIn: 60 // 60 segundos
    });

    const decodeToken = jwt.decode(token);

    res.status(200).json({
      id: dataUser._id,
      name: dataUser.name,
      email: dataUser.email,
      rol: dataUser.rol.name.toUpperCase(),
      accessToken: token,
      exp: decodeToken.exp
    });
  })
  .catch((error) => res.status(500).json({
    message: error
  }));
};
