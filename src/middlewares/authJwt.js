const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/user");
const Role = require("../models/role");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(403).send({ message: "No se proporcionó token!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: `No autorizado! - ${err}` });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findById(req.userId)
  .then((user) => {
    Role.find(
      {
        _id: { $in: user.rol }
      },
      (err, rol) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (rol.name === "administrador") {
          next();
          return;
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  })
  .catch((error) => res.status(500).json({
    message: error
  }));
};
isModerator = (req, res, next) => {
  User.findById(req.userId)
  .then((user) => {
    Role.find(
      {
        _id: { $in: user.rol }
      },
      (err, rol) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (rol.name === "empleado") {
          next();
          return;
        }

        res.status(403).send({ message: "Require Moderado Role!" });
        return;
      }
    );
  })
  .catch((error) => res.status(500).json({
    message: error
  }));
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;