const Menu = require('../models/menu');
const Cell = require('../models/cell');

verifyKeyMenu = (req, res, next) => {
  const { id } = req.params;
  Menu.find({
    key: req.body.key
  }).exec((err, menus) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (menus) {
      if (id) {
        for (let i = 0; i < menus.length; i++) {
        if (menus[i]._id.toString() === id) {
          next();
          return;
        }
      }
      }
      res.status(400).send({ message: "Error! La llave del menú ya esta siendo usada!" });
      return;
    }
    next();
  });
};

verifyKeyCell = (req, res, next) => {
  const { id } = req.params;
  Cell
  .find( { $and: [ { name: { $eq: req.body.name } }, { zone: { $eq: req.body.zone } } ] } )
  .exec((err, cells) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (cells && cells.length > 0) {
      if (id) {
        for (let i = 0; i < cells.length; i++) {
          if (cells[i]._id.toString() === id) {
            next();
            return;
          }
        }
      }
      res.status(400).send({ message: `Error! Ya existe un nombre '${req.body.name}', para la zona seleccionada !` });
      return;
    }
    next();
  });
};

const common = {
  verifyKeyMenu,
  verifyKeyCell
};
module.exports = common;