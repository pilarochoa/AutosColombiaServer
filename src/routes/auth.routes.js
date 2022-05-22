const express = require('express');
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  next();
})
router.post("/auth/signin", controller.signin);

module.exports = router;
