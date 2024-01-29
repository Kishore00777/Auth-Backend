const express = require("express");
const router = express.Router();
const AuthCotroller = require('../Controller/AuthController')


router.post('/signup',AuthCotroller.signup);
router.post('/login',AuthCotroller.login);
router.post('/logout',AuthCotroller.logout);

module.exports = router;
