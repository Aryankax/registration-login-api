const express = require('express')
const router = express.Router();
const registration = require('../controllers/userRegistrations');

router.post('/signup', registration.signup);

router.post('/login', registration.login);

router.get('/getUserData', registration.getUserData);

router.post('/login/colleague', registration.colleagueLogin)

router.post('/signup/colleague', registration.colleagueSignup)

module.exports = router;