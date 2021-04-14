const router = require('express').Router();
const db = require('../db');
const validateSession = require('../middleware/validateSession');
const { createUser, signInUser, getUserInfo, updateUser, elevateUserStanding } = require('../services/userService');
const User = db.models.User;

router.post('/sign-up', createUser);

router.post('/sign-in', signInUser);

router.get('/profile/:id', validateSession, getUserInfo);

router.put('/update/:id', validateSession, updateUser);

router.put('/elevate/:id', validateSession, elevateUserStanding);

module.exports = router;
