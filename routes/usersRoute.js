const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
// const User = require('../models/user')
const {signUp,login,getallusers} = require('../controller/userController')

router.post("/register", signUp);

router.post("/login", login);


router.get("/getallusers",getallusers);

module.exports = router
