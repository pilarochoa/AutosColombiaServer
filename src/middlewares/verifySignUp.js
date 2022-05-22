const userSchema = require('../models/user');
const roleSchema = require('../models/role');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // name
  userSchema.findOne({
    name: req.body.name
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Error! El nombre del usuario ya esta siendo usado!" });
      return;
    }
    // Email
    userSchema.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Error! El correo electrónico ya esta siendo usado!" });
        return;
      }
      next();
    });
  });
};
checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      const roles = await roleSchema.find();
      console.log(roles);
      // if (!roles.includes(req.body.roles[i])) {
      //   res.status(400).send({
      //     message: `Failed! Role ${req.body.roles[i]} does not exist!`
      //   });
      //   return;
      // }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;
