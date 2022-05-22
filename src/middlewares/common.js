const Menu = require('../models/menu');

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

const common = {
  verifyKeyMenu
};
module.exports = common;