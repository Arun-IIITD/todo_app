const express = require('express');
//const {handleUserSignup} = require("../controllers/usercontroler")

const {signupValidation, loginValidation} = require("../middleware/authvalidation");
const { signup, login} = require('../controllers/usercontroler');

const router = express.Router();

router.post("/login", loginValidation,login)

router.post("/signup", signupValidation,signup)

module.exports = router;

